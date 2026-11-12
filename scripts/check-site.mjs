import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("../", import.meta.url)));
const site = path.join(root, "site");
const decode = (text) => text.replace(/&(lt|gt|amp|quot|#39);/gu, (_, entity) => ({
  lt: "<", gt: ">", amp: "&", quot: '"', "#39": "'",
})[entity]);

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const name = path.join(directory, entry.name);
    return entry.isDirectory() ? files(name) : [name];
  });
}

const pages = files(site).filter((file) => file.endsWith(".html"));
const anchors = new Map();
const contents = new Map();
for (const page of pages) {
  const html = readFileSync(page, "utf8").replace(/\r\n/gu, "\n");
  contents.set(page, html);
  const ids = [...html.matchAll(/\bid="([^"]+)"/gu)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate id in ${page}`);
  anchors.set(page, new Set(ids));
  assert.match(html, /<html lang="en">/u, page);
  assert.match(html, /name="viewport"/u, page);
  assert.match(html, /<a class="skip" href="#main">/u, page);
  assert.match(html, /<main id="main">/u, page);
  assert.equal((html.match(/<h1>/gu) || []).length, 1, `One h1 required: ${page}`);
  assert.doesNotMatch(html, /(?:src|href)="(?:https?:)?\/\/[^"]+\.(?:js|css)"/u);
  const stack = [];
  const voids = new Set(["meta", "link", "br", "hr", "img", "input", "source", "wbr"]);
  for (const tag of html.matchAll(/<(\/?)([a-z][a-z0-9]*)\b[^>]*>/giu)) {
    const name = tag[2].toLowerCase();
    if (voids.has(name)) continue;
    if (tag[1]) assert.equal(stack.pop(), name, `Mismatched ${tag[0]} in ${page}`);
    else stack.push(name);
  }
  assert.equal(stack.length, 0, `Unclosed tags in ${page}: ${stack.join(", ")}`);
}

let sources = 0;
for (const [page, html] of contents) {
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/gu)) {
    const reference = decode(match[1]);
    if (/^(?:https?:|mailto:)/u.test(reference)) continue;
    const [relative, fragment] = reference.split("#");
    const target = relative ? path.resolve(path.dirname(page), relative) : page;
    assert.ok(target.startsWith(`${site}${path.sep}`), `Link leaves site: ${page} ${reference}`);
    assert.ok(existsSync(target), `Missing target: ${page} ${reference}`);
    if (fragment) assert.ok(anchors.get(target)?.has(fragment), `Missing anchor: ${page} ${reference}`);
  }
  for (const match of html.matchAll(/<code data-source="([^"]+)">([\s\S]*?)<\/code>/gu)) {
    const source = path.resolve(root, match[1]);
    assert.ok(source.startsWith(`${root}${path.sep}`), "Embedded source must stay in the repository");
    const actual = readFileSync(source, "utf8").replace(/\r\n/gu, "\n").trim();
    assert.equal(decode(match[2]).trim(), actual, `Embedded source drift: ${match[1]}`);
    sources++;
  }
}
assert.equal(sources, 4, "All four policy examples must be embedded");
const ciLab = contents.get(path.join(site, "labs", "04-required-ci.html"));
for (const name of ["pr-title-workflow", "pr-title-validator"]) {
  assert.equal(
    [...ciLab.matchAll(new RegExp(`<code data-example="${name}">([\\s\\S]+?)<\\/code>`, "gu"))].length,
    1,
    `Lab 4 must contain one complete ${name} example`,
  );
}
const labs = pages.filter((page) => page.includes(`${path.sep}labs${path.sep}`));
assert.equal(labs.length, 8);
for (const lab of labs) {
  const html = contents.get(lab);
  for (const checkpoint of ["Purpose", "Starting checkpoint", "Done when"]) {
    assert.ok(html.includes(checkpoint), `Missing ${checkpoint}: ${lab}`);
  }
  assert.match(html, /id="status"[^>]+role="status"/u);
}
console.log(`Checked ${pages.length} pages, local links/anchors, HTML structure, eight lab contracts, ${sources} embedded policies, and two inline Lab 4 CI examples.`);
