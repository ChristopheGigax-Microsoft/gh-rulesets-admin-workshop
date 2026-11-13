import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { checkLinks, checkMetadata, checkMoaw, exampleBlock, parseDocument } from "../scripts/check-moaw.mjs";

const workshop = readFileSync(new URL("../moaw/workshop.md", import.meta.url), "utf8");
const route = "workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&step=2&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$";

test("MOAW edition preserves examples and resolves steps/pages locally and after relocation", () => {
  checkMoaw();
});

test("draft metadata cannot be published with an unmeasured duration", () => {
  const { meta } = parseDocument(workshop);
  assert.equal(checkMetadata({ ...meta, published: false, duration_minutes: null }), false);
  assert.throws(() => checkMetadata({ ...meta, published: false, duration_minutes: null }, { publication: true }), /positive duration/u);
  assert.throws(() => checkMetadata({ ...meta, published: true, duration_minutes: null }), /positive duration/u);
  assert.throws(() => checkMetadata({ ...meta, duration_minutes: 0 }), /positive duration/u);
  assert.equal(checkMetadata({ ...meta, published: true, duration_minutes: 1 }), true);
});

test("workshop metadata permits no byline but validates attribution when provided", () => {
  const { meta } = parseDocument(workshop);
  const { authors, contacts, ...anonymous } = meta;
  assert.doesNotThrow(() => checkMetadata(anonymous));
  assert.throws(() => checkMetadata({ ...anonymous, authors: ["Author"] }), /Missing contacts/u);
  assert.throws(() => checkMetadata({ ...anonymous, contacts: ["https://example.com"] }), /Missing authors/u);
  assert.throws(() => checkMetadata({ ...anonymous, authors: ["Author"], contacts: [] }), /mismatch/u);
  assert.throws(() => checkMetadata({ ...anonymous, authors: [""], contacts: ["https://example.com"] }), /Empty author/u);
});

test("link checks reject missing steps, anchors, assets and raw Markdown navigation", () => {
  const { documents } = checkMoaw();
  for (const [link, message] of [
    [route.replace("step=2", "step=999"), /Missing step/u],
    [`${route}#missing-anchor`, /Missing anchor/u],
    ["assets/rulesets/missing.json", /Missing asset/u],
    ["assets/../../README.md", /Asset escapes folder/u],
    ["instructor.md", /portable MOAW route/u],
    [route.replace("&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$", ""), /Lost source override/u],
  ]) {
    const document = structuredClone(documents.get("workshop.md"));
    document.sections[0].links = [link];
    const changed = new Map(documents).set("workshop.md", document);
    assert.throws(() => checkLinks(changed), message);
  }
});

test("marked examples must be uniquely identified fenced code", () => {
  assert.throws(() => exampleBlock("<!-- example: missing -->\n\nNot code.", "example: missing"), /Expected fenced code/u);
  assert.throws(() => exampleBlock("", "example: missing"), /Expected one/u);
  const block = "<!-- example: test -->\n```json\n{}\n```\n\n";
  assert.throws(() => exampleBlock(block + block, "example: test"), /Expected one/u);
});
