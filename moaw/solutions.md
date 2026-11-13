---
type: page
title: Solutions and evidence
---

# Evidence, not green checkboxes

[Workshop](workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$) / [Troubleshooting](page/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$troubleshooting.md&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$) / [Facilitator and cleanup](page/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$instructor.md&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$#cleanup-and-durable-handoff).

Use these checkpoints to recover and explain. They are not permission to skip experiments or broaden bypass access.

## Core evidence and recovery map

| Lab | Successful evidence | Not equivalent |
| --- | --- | --- |
| 1. Targeting | Correct pattern predictions; final exact integration target; disabled rule; known inherited policy. | Assuming all globs match nested refs or calling Disabled an evaluation mode. |
| 2. Branches | PR-required direct-push rejection, compliant merge, isolated deletion and actual history-rewrite rejections. | Network denial, stale lease, or a force-flagged push that was actually fast-forward. |
| 3. Reviews | Solo: missing-approval blocker, declared change to zero approvals in the workshop rule, unresolved/resolved own thread, compliant merge; counted/stale approvals not exercised. Paired: also counted approval, diff-changing push dismisses review, renewed approval permits merge. | Calling self-inspection an independent approval, or calling a reduced approval count proof that approval was satisfied. |
| 4. CI | Named check/source, baseline green, meaningful red blocks merge, corrected green permits merge. PR-title route: fresh title-edit runs on the same head and a push-triggered revalidation. | Missing check, skipped job, removed requirement, manually fabricated status, or rerun of an old title event. |
| 5. Layering | Two-parent merge rejected; same update accepted with only overlay disabled; baseline deletion remains blocked; new linear commit allowed after restoration. | Treating the last-created ruleset as overriding all others. |
| 6. Tags | Initial creation succeeds; real retarget/delete attempts rejected; object ID unchanged; next tag succeeds. | Git refusing a non-force tag update before the server rules evaluate it. |
| 7. Exceptions | Admin blocked without bypass; PR-only exception recorded; direct push still blocked; exception removed; review blocker restored. Solo stops with restored block/export; optional eligible reviewer proves normal approved merging. | Leaving Always allow on, changing inherited policy, or claiming unsupported bypass mode or unexercised approvals succeeded. |
| 8. Your policy | Scenario rationale, at least three controls including CI, isolated allow/deny evidence, self-executed or optional partner challenges, merged PR, matching export. Record actual actor roles. | A large JSON file with no actual operations or explanation, or claiming untested independent-review/write-only-actor behavior. |

## Copyable evidence ledger

Keep this in your approved repository notes or issue. Do not store tokens, customer source, or private logs outside approved systems.

```text
Lab / status: complete | blocked | skipped
Route: solo | paired
Approval cases not exercised / reason:
Repository / agreed workshop refs:
Ruleset name / source:
Target branch or tag:
Actor role / bypass state:
Prediction:
Attempted operation:
Actual rejection or blocker:
PR / run / commit evidence:
Correction:
Successful compliant result:
Remaining limitations:
Final export / restoration:
```

## Reference final integration policy

After labs 3 and 4, both routes require a PR, resolved review threads, the selected CI check, no force pushes, and no deletion, with empty bypass. The paired route adds one approval and dismissed stale reviews. The solo route uses zero approvals in its workshop-created rule and does not claim counted/stale-approval evidence. [Reviewed-CI JSON](workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&step=10&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$#2-reviewed-changes-and-required-ci) shows the paired shape; adapt it as documented for solo work, select the actual reporting source, and preserve existing/inherited requirements.

The separate destructive, layering, bypass, and tag rules deliberately target different refs. They are not a recommendation to multiply overlapping production rules without a reason.

## Final questions

1. What failed, and how do you know which rule caused it?
2. Which identities can edit the rule versus bypass it?
3. Can a repository admin weaken an inherited organization rule?
4. What does your required check validate, and what can it not guarantee?
5. How would you recover without deleting every protection?

A blocked checkpoint is an honest result, not a passed exercise.
