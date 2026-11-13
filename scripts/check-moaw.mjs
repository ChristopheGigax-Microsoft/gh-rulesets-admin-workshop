import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import GithubSlugger from "github-slugger";
import { marked } from "marked";
import { parse } from "yaml";

const root = fileURLToPath(new URL("../", import.meta.url));
const workshopDirectory = path.join(root, "moaw");
const sourceDefault = "gh:ChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/";
const sourceVariable = `$$source:${sourceDefault.replace("gh:", "gh%3A")}$$`;
const normalize = (text) => text.replace(/\r\n/gu, "\n").trim();
const read = (file) => readFileSync(file, "utf8");
const decode = (text) => text.replace(/&(lt|gt|amp|quot|#39);/gu, (_, entity) => ({
  lt: "<", gt: ">", amp: "&", quot: '"', "#39": "'",
})[entity]);

export function parseDocument(text) {
  const match = text.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/u);
  assert.ok(match, "Missing YAML front matter");
  const meta = parse(match[1]);
  assert.ok(meta && typeof meta === "object", "Metadata must be a mapping");
  assert.ok(["workshop", "page"].includes(meta.type), "Unsupported MOAW document type");
  assert.ok(typeof meta.title === "string" && meta.title.trim(), "Missing title");
  const sections = match[2].split(/(?:\n\n|\r\n\r\n)---(?:\n\n|\r\n\r\n)/u).map((markdown) => {
    const tokens = marked.lexer(markdown);
    const slugger = new GithubSlugger();
    const headings = tokens.filter((token) => token.type === "heading");
    const anchors = new Set(headings.map((token) => slugger.slug(token.text)));
    const links = [];
    marked.walkTokens(tokens, (token) => {
      if (token.type === "link" || token.type === "image") links.push(token.href);
    });
    assert.equal(headings.filter((token) => token.depth === 1).length, 1, "One title per section required");
    return { markdown, anchors, links, tokens };
  });
  if (meta.type === "page") assert.equal(sections.length, 1, "Annex pages must not split into steps");
  return { meta, sections };
}

export function exampleBlock(markdown, label) {
  const tokens = marked.lexer(markdown);
  const matches = [];
  for (let index = 0; index < tokens.length; index++) {
    if (tokens[index].type !== "html" || tokens[index].text.trim() !== `<!-- ${label} -->`) continue;
    const code = tokens.slice(index + 1).find((token) => token.type !== "space");
    assert.equal(code?.type, "code", `Expected fenced code after ${label}`);
    assert.ok(code.lang, `Missing code language: ${label}`);
    matches.push(code.text);
  }
  assert.equal(matches.length, 1, `Expected one marked example: ${label}`);
  return matches[0];
}

export function checkLinks(documents, directory = workshopDirectory) {
  for (const [file, document] of documents) {
    for (const section of document.sections) {
      assert.doesNotMatch(section.markdown, /<(?:script|style|link|button)\b/iu, `${file}: legacy UI`);
      for (const reference of section.links) {
        if (reference.startsWith("assets/")) {
          const target = path.resolve(directory, decodeURIComponent(reference));
          assert.ok(target.startsWith(`${path.resolve(directory, "assets")}${path.sep}`), `Asset escapes folder: ${reference}`);
          assert.ok(existsSync(target), `Missing asset: ${reference}`);
          continue;
        }
        if (/^https:\/\//u.test(reference)) continue;
        if (reference.startsWith("#")) {
          assert.ok(section.anchors.has(decodeURIComponent(reference.slice(1))), `Missing anchor: ${reference}`);
          continue;
        }
        assert.ok(reference.includes(sourceVariable), `Use a portable MOAW route, not a raw file link: ${reference}`);
        for (const [basePath, source] of [
          ["/", "./"],
          ["/", sourceDefault],
          ["/moaw/", "gh:another-owner/another-repo/main/course/"],
        ]) {
          const href = reference.replaceAll(sourceVariable, source);
          assert.ok(!href.includes("$$"), `Unknown MOAW variable: ${reference}`);
          const current = new URL(`https://preview.invalid${basePath}`);
          const target = new URL(href, current);
          assert.equal(target.origin, current.origin, `Route leaves MOAW: ${reference}`);
          assert.equal(target.searchParams.get("vars"), `source:${source}`, `Lost source override: ${reference}`);
          const src = target.searchParams.get("src");
          assert.ok(src?.startsWith(source), `Lost source: ${reference}`);
          const destination = documents.get(src.slice(source.length));
          assert.ok(destination, `Unknown destination: ${reference}`);
          assert.equal(target.pathname, `${basePath}${destination.meta.type}/`, `Wrong page/workshop route: ${reference}`);
          const step = target.searchParams.get("step") ?? "0";
          assert.match(step, /^(?:0|[1-9]\d*)$/u, `Invalid step: ${reference}`);
          assert.ok(Number(step) < destination.sections.length, `Missing step: ${reference}`);
          if (target.hash) {
            assert.ok(destination.sections[Number(step)].anchors.has(decodeURIComponent(target.hash.slice(1))), `Missing anchor: ${reference}`);
          }
        }
      }
    }
  }
}

export function checkMetadata(meta, { publication = false } = {}) {
  for (const key of ["description", "level", "tags"]) {
    assert.ok(typeof meta[key] === "string" && meta[key].trim(), `Missing metadata: ${key}`);
  }
  assert.ok(["beginner", "intermediate", "advanced"].includes(meta.level), "Invalid level");
  assert.equal(typeof meta.published, "boolean", "published must be a boolean");
  if (meta.authors !== undefined || meta.contacts !== undefined) {
    assert.ok(Array.isArray(meta.authors) && meta.authors.length > 0, "Missing authors");
    assert.ok(Array.isArray(meta.contacts), "Missing contacts");
    assert.equal(meta.authors.length, meta.contacts.length, "Authors/contacts mismatch");
    for (const value of [...meta.authors, ...meta.contacts]) assert.ok(typeof value === "string" && value.trim(), "Empty author/contact");
  }
  const durationReady = Number.isInteger(meta.duration_minutes) && meta.duration_minutes > 0;
  assert.ok(durationReady || (meta.duration_minutes === null && !meta.published && !publication), "Set a positive duration before publication");
  return durationReady;
}

export function checkMoaw(options) {
  const documents = new Map(readdirSync(workshopDirectory).filter((file) => file.endsWith(".md"))
    .map((file) => [file, parseDocument(read(path.join(workshopDirectory, file)))]));
  assert.deepEqual([...documents.keys()].sort(), ["instructor.md", "solutions.md", "troubleshooting.md", "workshop.md"]);
  const { meta, sections } = documents.get("workshop.md");
  const durationReady = checkMetadata(meta, options);
  assert.equal(sections.length, 12, "Welcome, preflight, eight labs, examples, extensions");
  assert.equal(meta.sections_title?.length, sections.length, "Section menu mismatch");
  for (let index = 1; index <= 8; index++) {
    const section = sections[index + 1];
    assert.ok(section.markdown.trimStart().startsWith(`# Lab ${index}:`), `Lab order: ${index}`);
    for (const heading of ["purpose", "starting-checkpoint", "done-when"]) {
      assert.ok(section.anchors.has(heading), `Lab ${index}: missing ${heading}`);
    }
  }
  checkLinks(documents);
  const workshop = read(path.join(workshopDirectory, "workshop.md"));
  const ciLab = read(path.join(root, "site", "labs", "04-required-ci.html"));
  for (const label of ["pr-title-workflow", "pr-title-validator"]) {
    const original = ciLab.match(new RegExp(`<code data-example="${label}">([\\s\\S]*?)<\\/code>`, "u"));
    assert.ok(original, `Missing original example: ${label}`);
    assert.equal(normalize(exampleBlock(workshop, `example: ${label}`)), normalize(decode(original[1])), `CI example drift: ${label}`);
  }
  const policies = readdirSync(path.join(root, "examples", "rulesets"));
  assert.equal(policies.length, 4);
  assert.deepEqual(readdirSync(path.join(workshopDirectory, "assets", "rulesets")).sort(), [...policies].sort());
  for (const file of policies) {
    const original = normalize(read(path.join(root, "examples", "rulesets", file)));
    assert.equal(normalize(read(path.join(workshopDirectory, "assets", "rulesets", file))), original, `Asset drift: ${file}`);
    assert.equal(normalize(exampleBlock(workshop, `policy: ${file}`)), original, `Embedded policy drift: ${file}`);
  }
  const originals = [
    ["prerequisites.html", sections[1]],
    ...readdirSync(path.join(root, "site", "labs")).sort().map((file, index) => [path.join("labs", file), sections[index + 2]]),
    ["ruleset-examples.html", sections[10]],
    ["solutions.html", documents.get("solutions.md").sections[0]],
  ];
  for (const [file, section] of originals) {
    const codes = section.tokens.filter((token) => token.type === "code").map((token) => normalize(token.text));
    const html = read(path.join(root, "site", file));
    const originalCodes = [...html.matchAll(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/gu)].map((match) => normalize(decode(match[1])));
    assert.deepEqual(codes, originalCodes, `Copied command/example drift: ${file}`);
  }
  return { documents, durationReady };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  assert.ok(process.argv.slice(2).every((argument) => argument === "--publication"), "Unknown argument");
  const { durationReady } = checkMoaw({ publication: process.argv.includes("--publication") });
  console.log("Checked MOAW metadata, 12 sections, eight labs, three annexes, portable links/anchors, assets and original code-example parity.");
  if (!durationReady) console.warn("Publication not ready: duration_minutes is unset; measure it during authorized rehearsal.");
}
