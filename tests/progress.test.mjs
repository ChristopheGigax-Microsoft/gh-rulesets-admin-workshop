import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../site/assets/workshop.js", import.meta.url), "utf8");

function page({ stored = null, failWrite = false } = {}) {
  const attributes = new Map();
  const button = {
    hidden: true, disabled: false,
    setAttribute: (name, value) => attributes.set(name, value),
    addEventListener: (_, listener) => { button.click = listener; },
  };
  const status = {};
  const warnings = [];
  vm.runInNewContext(source, {
    document: {
      body: { dataset: { lab: "04" } },
      getElementById: (id) => id === "complete" ? button : status,
      querySelectorAll: () => [],
    },
    navigator: {},
    console: { warn: (...args) => warnings.push(args) },
    localStorage: {
      getItem: () => stored,
      setItem: (_, value) => {
        if (failWrite) throw new Error("Storage blocked");
        stored = value;
      },
    },
  });
  return { button, status, attributes, warnings, saved: () => stored };
}

test("progress toggles this lab without dropping previously saved evidence", () => {
  const state = page({ stored: '["01"]' });
  state.button.click();
  assert.deepEqual(JSON.parse(state.saved()), ["01", "04"]);
  assert.equal(state.attributes.get("aria-pressed"), "true");
  state.button.click();
  assert.deepEqual(JSON.parse(state.saved()), ["01"]);
  assert.equal(state.attributes.get("aria-pressed"), "false");
});

test("malformed progress is visibly disabled rather than treated as success", () => {
  for (const stored of ["not json", "{}", '[["01"]]', '["99"]']) {
    const state = page({ stored });
    assert.equal(state.button.disabled, true);
    assert.match(state.status.textContent, /Progress unavailable/u);
    assert.equal(state.warnings.length, 1);
    assert.equal(state.saved(), stored);
  }
});

test("a failed storage write does not mark evidence as saved", () => {
  const state = page({ failWrite: true });
  state.button.click();
  assert.equal(state.button.disabled, true);
  assert.equal(state.saved(), null);
  assert.equal(state.attributes.get("aria-pressed"), "false");
  assert.match(state.status.textContent, /could not be saved/u);
});
