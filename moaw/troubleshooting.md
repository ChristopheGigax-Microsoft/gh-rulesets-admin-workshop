---
type: page
title: Troubleshooting
---

# Diagnose before changing policy

[Workshop](workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$) / [Evidence checklist](page/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$solutions.md&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$) / [Facilitator](page/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$instructor.md&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$).

First identify repository, ref, actor, effective rules, and exact operation. Change one variable at a time; never disable parent policy to manufacture success.

## A push succeeds when it should fail

Check active versus disabled state, exact target, include/exclude patterns, branch versus tag ruleset, and actor bypass permissions. Full admin access is not automatic bypass, but an explicit admin grant can invalidate the test. Verify you pushed to the intended remote/ref, not only your feature branch.

## A compliant PR is still blocked

Read every blocker in the merge box. Inspect applicable rules and legacy branch protection; policies aggregate and the most restrictive duplicate applies. A bypass in one rule does not bypass another. Do not enable Restrict updates on the integration rule unless you intentionally want all ordinary actors unable to update it.

## A review does not count

The author cannot approve their own PR; self-inspection and resolving your own thread are not independent approvals. An optional reviewer needs accepted write access. Work alone using [Lab 3's solo route](workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&step=4&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$#solo-route-inspect-the-gates-yourself) and mark counted/stale approvals not exercised. Only that route's own workshop-created rule returns to zero approvals; preserve existing/inherited requirements and record a blocker if they still need another reviewer. Diff-changing pushes can dismiss counted approvals; required latest-push approval is a separate setting. Check unresolved review threads, code owners, unexpected additional approvals, and human versus unattributed bot PR behavior.

## Required check stays "Expected"

Run it once before selecting it. Compare the exact job name and expected source, not only the workflow name. Inspect workflow location, Actions/action permissions, available runner, filters, and event types. Required workflows skipped by path/branch filters may leave an expected result indefinitely. Restore the real trigger; do not post fake passing statuses.

## Title changed but check did not

The workflow must include the `edited` pull-request activity and be present on the workshop base/PR branches. Use the [Lab 4 setup sequence](workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&step=5&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$#path-b-optional-pr-title-ci-code-example) if installing the example. Open the newest run and verify the corresponding event. Manual reruns reuse original event data and do not necessarily read the latest title. Avoid rapid changes while old runs are queued. Wait for the fresh run, not an earlier green.

## Title is valid but it still fails

Check colon + space, nonblank description, matched scope parentheses, and the optional `!` position. The supplied validator deliberately checks a practical single-line header subset. It does not impose a type allowlist or lowercase-only requirement. Keep customer-specific stricter policy separate from the Conventional Commits specification.

## Linear history behaves unexpectedly

Enable squash or rebase merging before requiring linear history. A fast-forward ref update can introduce a merge commit; inspect the commit's two parents. Conversely, specifying `--force` on an ordinary fast-forward update does not create a history-rewrite test. Previously accepted merge commits are not removed retroactively.

## The force-push test says "stale info"

That is the force-with-lease concurrency check, not ruleset evidence. Fetch, inspect the remote commit, and understand who changed it. Retry only on the named disposable branch with the intended previous-commit update. Never blindly switch to an unrestricted force push on a shared ref.

## The tag test fails before it reaches GitHub rules

Verify the existing remote tag and the distinct proposed target commit. Git itself refuses many ordinary tag overwrites. Lab 6 uses an explicit force update on a disposable workshop tag to reach server-side policy. Restrict creations must stay off if initial creation is supposed to succeed.

## I cannot edit an inherited rule

Repository administration does not grant organization/enterprise policy ownership. Record the parent source and mark the incompatible experiment blocked or use a scoped authorized demonstration. A separate disposable repository is optional if the customer agrees, not a required replacement for their repository. Do not request broad organization-owner privileges for every participant.

## Push restriction still rejects after I delete the file

An optional push rule can inspect content in commits being introduced. A later deletion commit does not erase the restricted content in earlier unpushed commits. Use a fresh disposable branch from the accepted remote state and recreate only allowed changes, or carefully amend the rejected local commit if it contains no unrelated work. Do not rewrite shared history or bypass a real secret.

## Imported JSON is rejected

Confirm current REST request fields, rule eligibility, target type, and actor IDs. UI exports may contain response-only metadata; foreign IDs are not portable. The supplied bodies start disabled. Read the API error, fix the specific field, and inspect the created draft before activation.

## Copy controls or progress expectations

Use MOAW's native copy controls, or select and copy text manually if the clipboard is unavailable. This edition does not load the standalone site's JavaScript or local-progress key. There is no custom "mark evidence" button here. Navigation or copy success does not verify enforcement or report attendance; keep the actual evidence ledger.

Never turn an unrelated failure into claimed proof of the intended control.
