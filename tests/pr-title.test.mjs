import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { after, test } from "node:test";

const lab = readFileSync(new URL("../site/labs/04-required-ci.html", import.meta.url), "utf8");
function example(name) {
  const match = lab.match(new RegExp(`<code data-example="${name}">([\\s\\S]*?)<\\/code>`, "u"));
  assert.ok(match, `Missing Lab 4 example: ${name}`);
  return match[1].replace(/&(lt|gt|amp|quot|#39);/gu, (_, entity) => ({
    lt: "<", gt: ">", amp: "&", quot: '"', "#39": "'",
  })[entity]);
}

const directory = mkdtempSync(path.join(tmpdir(), "workshop-pr-title-"));
after(() => rmSync(directory, { recursive: true }));
const script = path.join(directory, "validate-pr-title.mjs");
writeFileSync(script, example("pr-title-validator"));
const { isConventionalTitle } = await import(pathToFileURL(script).href);

test("Lab 4 workflow revalidates edits and pushes with untrusted title confined to env", () => {
  const workflow = example("pr-title-workflow");
  assert.match(workflow, /types: \[opened, edited, synchronize, reopened, ready_for_review\]/u);
  assert.match(workflow, /name: PR title convention/u);
  assert.match(workflow, /PR_TITLE: \$\{\{ github.event.pull_request.title \}\}/u);
  assert.match(workflow, /run: node scripts\/validate-pr-title.mjs/u);
  assert.doesNotMatch(workflow, /pull_request_target|continue-on-error|secrets\.|paths:|branches:|concurrency:/u);
  assert.equal((workflow.match(/\$\{\{/gu) || []).length, 1);
});

test("accepts headers with scope, breaking marker, alternate types and casing", () => {
  for (const title of [
    "docs: update workshop guide", "feat(rules): protect tags",
    "fix(ci)!: change check contract", "feat!: replace API",
    "Maintenance: refresh examples", "DOCS: update guide", "docs: explain caf\u00e9",
  ]) assert.equal(isConventionalTitle(title), true, title);
});

test("rejects malformed or empty headers", () => {
  for (const title of [
    undefined, "", "Update documentation", "docs:update guide", "docs: ",
    "docs: \t", "docs(): guide", "docs( ): guide", "docs(scope: guide",
    "docs: guide\n", "docs: guide\rnext", " docs: guide", "docs:  guide",
  ]) assert.equal(isConventionalTitle(title), false, String(title));
});

test("CLI fails meaningfully for an invalid or missing event title", () => {
  for (const title of ["Update documentation", undefined]) {
    const env = { ...process.env };
    if (title === undefined) delete env.PR_TITLE;
    else env.PR_TITLE = title;
    const result = spawnSync(process.execPath, [script], { env, encoding: "utf8" });
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /Expected <type>/u);
  }
});

test("CLI treats shell expressions and workflow command text as ordinary data", () => {
  const result = spawnSync(process.execPath, [script], {
    env: { ...process.env, PR_TITLE: 'docs: $(exit 37) `exit 42` "; ::error::not a command' },
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  assert.doesNotMatch(result.stdout, /::error::/u);
});
