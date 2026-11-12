import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

test("portable policies are disabled, scoped, and free from automatic bypass", () => {
  const directory = new URL("../examples/rulesets/", import.meta.url);
  for (const name of readdirSync(directory)) {
    const policy = JSON.parse(readFileSync(new URL(name, directory), "utf8"));
    assert.equal(policy.enforcement, "disabled", name);
    assert.deepEqual(policy.bypass_actors, [], name);
    assert.equal("id" in policy, false, name);
    for (const ref of policy.conditions.ref_name.include) {
      assert.match(ref, /^refs\/(?:heads\/workshop\/|tags\/workshop-v)/u, name);
    }
  }
  const tags = JSON.parse(readFileSync(new URL("04-tags.json", directory), "utf8"));
  assert.equal(tags.rules.some((rule) => rule.type === "creation"), false);
  assert.deepEqual(tags.rules.map((rule) => rule.type), ["update", "deletion"]);
});
