---
published: true
type: workshop
title: From Settings to Safeguards
short_title: GitHub rulesets administration
description: Configure, challenge, inspect, and prove repository rulesets in an approved repository, solo or with an optional partner.
level: intermediate
# Estimated delivery duration; confirm during rehearsal.
duration_minutes: 180
tags: github, administration, rulesets, pull requests, ci
navigation_levels: 2
navigation_numbering: false
sections_title:
  - Welcome
  - Preflight
  - "01: Targeting"
  - "02: Branches"
  - "03: Reviews"
  - "04: Required CI"
  - "05: Layering"
  - "06: Tags"
  - "07: Bypass"
  - "08: Your policy"
  - Complete examples
  - Optional extensions
---

# From Settings to Safeguards

## Your repository. Your policy. Prove it works.

Build safeguards you can explain. Configure your own rules, deliberately challenge them, read the rejection, and complete the same change through the approved path.

Your approved repository. Solo or optional partner. UI-first. No application required.

[Prepare your repository](workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&step=1&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$).

<div class="warning" data-title="Real repository, isolated experiments">

> Use an existing customer-approved repository or, optionally, a disposable one. Agree unique workshop refs and exact policy targets before starting. Keep production/default-branch protections, existing workflows, and inherited policy intact; never run destructive experiments on production refs.

</div>

## The experiment behind every lab

Work through the actions yourself; a partner is optional. Only counted approvals and stale-approval dismissal need another eligible reviewer, because GitHub prevents authors approving their own PRs. [Lab 3's solo route](workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&step=4&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$#solo-route-inspect-the-gates-yourself) explains what you can prove alone and how to continue without claiming those approval cases passed.

**Predict -> configure -> violate -> inspect -> comply -> prove.** A saved setting is not evidence. Keep the rejected operation and successful recovery on your agreed workshop refs. No secrets, real deployment, firmware toolchain, or organization-owner role is needed.

## The learning journey

| Lab | Experiment |
| --- | --- |
| 01 / Scope | Know what your policy targets: ruleset types, enforcement, patterns, exclusions, and inherited protections. |
| 02 / Branches | Close the direct-push path: require PRs and reject deletion and real history rewrites. |
| 03 / Reviews | Make review meaningful: solo blockers and conversations; optional counted and stale-approval experiments with a reviewer. |
| 04 / CI | Turn a check into a gate: bring your CI or validate a Conventional Commits-style PR title. |
| 05 / Diagnosis | Trace overlapping rules: demonstrate additive policies, not imaginary priorities. |
| 06 / Tags | Keep release references stable: create a tag, reject mutation, then create the next version. |
| 07 / Exceptions | Bypass with intent, restore control: separate configuration access, exceptional merge rights, and recovery. |
| 08 / Assessment | Design a policy of your own: implement a scenario and challenge your assumptions yourself or with an optional partner. |

Use the MOAW section menu or next/previous navigation to follow this order.

## Choose the CI, not a new toolchain

Lab 4 accepts a customer-selected check with a safe reproducible failure. Its optional self-contained code example checks PR titles: `Update documentation` fails; `docs: update workshop guide` passes. Both routes must demonstrate blocked and allowed merging.

## Keep the useful references nearby

- [Lab 4 CI code example](workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&step=5&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$#path-b-optional-pr-title-ci-code-example)
- [JSON policies](workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&step=10&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$)
- [Solutions and evidence ledger](page/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$solutions.md&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$)
- [Troubleshooting](page/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$troubleshooting.md&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$)
- [Facilitator and live rehearsal checklist](page/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$instructor.md&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$#required-live-rehearsal-before-delivery)

Core labs use repository-level rules. Enterprise Evaluate, organization inheritance, push restrictions, and merge queues are separately capability-gated. Unsupported features are recorded as skipped, never passed.

This edition uses MOAW's native navigation and copy controls, not the original site's browser-local progress buttons. Keep actual evidence in the approved repository or approved notes. MOAW is an external platform; its privacy and tracking behavior are separate from the original standalone site.

---

# Preflight

## Use a repository you are authorized to administer

You administer your own repository and can work through the workshop alone. A partner is optional. No organization-wide policy change is required.

## Access and capability check

1. Choose a customer-approved repository: an existing real repository is welcome; a disposable repository is optional. Confirm owner/name, visibility, and authorized exercise scope. If participants share a repository, assign each participant or pair unique workshop refs and ruleset names, and adapt all examples accordingly.
2. Confirm repository admin access and the ability to open **Settings -> Rules -> Rulesets** (labels may vary). If unavailable, check your role, plan, visibility, and inherited restrictions.
3. If working with an optional partner, confirm they have approved **write** access to the repository; they need no admin access. Solo participants perform the actions themselves. A PR author cannot approve their own PR, so follow Lab 3's solo route for review-specific limitations.
4. If using CI, verify its access and runner availability. The optional Lab 4 PR-title example uses Actions, pinned checkout, `ubuntu-24.04`, and Node.js 22+. Check action policy or adapt to an approved runner when choosing that route.
5. Use an approved Git client and GitHub authentication. Verify you can push and fetch. Never put tokens in commands, source, screenshots, or the evidence ledger.
6. Inspect the repository's `/rules` page, inherited rulesets, and legacy branch protection. Ask the facilitator about restrictions that prevent these labs; do not disable parent policy.
7. Check that no branch/tag/deployment workflows can publish or deploy from `workshop/` or `workshop-v*`. The supplied workflow performs no deployment.

## Feature boundaries

Verify entitlement in the actual workshop organization before delivery.

| Track | Requirement / fallback |
| --- | --- |
| Core branch/tag rules, PRs and checks | Repository-admin rights, eligible repository/plan (Team or Enterprise for private organization repositories), working Actions or selected CI. Another eligible writer is needed only for counted-approval experiments, not for solo participation. |
| Disabled and active enforcement | Core uses these two states; disabled is not evaluation or evidence collection. |
| Evaluate and Rule Insights | Enterprise-only extension; confirm availability. Use actual active rejection evidence for the core. |
| Organization-level policies | Enterprise extension and authorized organization administrator; participant admin rights cannot override inherited rules. |
| Push rulesets | Optional; confirm entitlement and private/internal visibility support. They cover pushes across the repository/fork network, not one branch. |
| Merge queue / signatures / code owners | Independent extensions with their own eligibility and setup. None is needed for the core CI lab. |

See [GitHub ruleset documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) and your organization's actual feature controls. If a capability is missing, record the blocker rather than treating an unavailable setting as configured.

## Prepare the workshop refs, not a new project

1. Agree a harmless practice-file path. The examples use `practice.md`; if it already exists, choose another path and adapt commands throughout. Preserve existing source and workflows. No template or starter files are required.
2. Create `workshop/integration` from an approved baseline using the branch menu. Check inherited policy and downstream triggers first. Do not modify the default branch or its protections for workshop setup.
3. Use your existing checkout with a clean working tree, or clone the approved repository. Inspect its remote, fetch the branch, and create a feature branch. Commands below show a fresh clone and use PowerShell syntax; replace `OWNER/REPOSITORY`, the local directory, and any ref/file names with your approved choices.

```powershell
git clone https://github.com/OWNER/REPOSITORY.git
Set-Location REPOSITORY
git remote -v
git fetch origin
git switch --create workshop/integration --track origin/workshop/integration
git switch --create practice/baseline
Add-Content practice.md 'Baseline workshop observation.'
git add practice.md
git commit -m "docs: record baseline"
git push -u origin practice/baseline
```

Open a human-authored PR with **base** `workshop/integration` and title `docs: record baseline`. Inspect it yourself, satisfy existing repository checks and reviews, and merge normally before lab 1. A partner review is optional unless existing policy requires an eligible independent approval. In that case obtain it or record the merge as blocked; do not weaken that policy. Choose and prove the workshop CI gate in Lab 4; its optional code example need not be installed during preflight.

<div class="warning" data-title="Read before every command">

> Destructive experiments use only explicitly approved disposable refs, even in a real repository. Never target production/shared refs, alter existing protections, or enable deployment as a side effect. If your clone has local work, do not overwrite or reset it; inspect its state and use a separate clone if needed. If policy prevents an experiment, record it as blocked or use an authorized demonstration.

</div>

## Prepare your evidence ledger

Keep this inside the approved repository or customer-approved notes, not a third-party service. Record lab, ruleset name/source, target ref, actor/bypass state, attempted operation, expected result, actual rejection or check/PR link, correction, and successful result. Capture only non-sensitive information.

<div class="task" data-title="Ready when">

> You can administer rules, push a harmless commit, and complete a PR under existing requirements, or have recorded a specific policy blocker. You know the inherited restrictions, agreed disposable ref names, and whether you are working solo or with a partner. Lab 4 will establish the selected CI gate's baseline.

</div>

Configuration access is not an automatic bypass grant.

---

# Lab 1: Know what your policy targets

## Purpose

Distinguish branch, tag, and push rulesets; choose a precise target; separate an inactive draft from an enforced policy.

## Starting checkpoint

Complete preflight. The approved `workshop/integration` branch exists. Record existing active rules and legacy protections before adding your own.

## Configure and predict

1. Open your selected repository's Rulesets settings. Create a **branch ruleset** named `workshop-integration`, with enforcement **Disabled** and an empty bypass list.
2. Explore the include pattern `workshop/*` and exclusion `workshop/scratch`. In the UI, names omit the `refs/heads/` prefix; REST JSON uses full refs. Do not assume shell-glob behavior.
3. Predict the results for the table below, then compare with GitHub's target preview where available. `*` does not cross `/`; `**/*` supports nested paths.
4. Finish by replacing the exploratory patterns with one exact include, `workshop/integration`, and no exclusions. Select Require a pull request before merging, zero approvals, Restrict deletions, and Block force pushes. Leave other optional rules off.
5. Save disabled. Make a harmless ordinary update on a disposable workshop branch. Your draft must not be the cause of any rejection; inspect other active policies if one occurs.

## Which branches would the rule influence?

**A pattern selects branches; it does not itself block an operation.** When this ruleset is Active, its selected protections apply only to included branches that are not excluded. While it is Disabled, even an included branch is unaffected by this draft.

Exploratory patterns: intended behavior if the selected protections were active.

| Branch | `workshop/*`, excluding scratch | `workshop/**/*`, excluding scratch | Practical consequence |
| --- | --- | --- | --- |
| `workshop/integration` | Included | Included | Either pattern would require PRs and block deletion and history rewrites here. |
| `workshop/scratch` | Excluded | Excluded | This ruleset would not restrict direct updates, deletion, or history rewrites here. The exact exclusion wins over either include pattern. |
| `workshop/team/experiment` | Not included | Included | The first pattern would impose no restriction here; the nested pattern would require PRs and block deletion and history rewrites. |
| `practice/baseline` | Not included | Not included | Neither pattern would restrict this feature branch. You can push work here and propose it through a PR into a protected target. |

These are consequences of **this ruleset only**, not permission to bypass other controls. Existing repository permissions, other rulesets, inherited policy, and legacy branch protection still apply. Keep these exploratory patterns Disabled; save only the exact target `workshop/integration` for the next lab.

## What will be allowed or blocked on the final target?

The final draft selects **Require a pull request** with zero required approvals, **Restrict deletions**, and **Block force pushes**, with no bypass actors. Read the following as predictions for an authorized writer, assuming no additional policy blocks the operation. **Lab 1 ends Disabled; Lab 2 activates the rule.** Do not execute deletion or history-rewrite tests on integration; Lab 2 uses a separate approved disposable branch to isolate those controls.

| Attempt | Disabled: end of Lab 1 | Active: from Lab 2 | Reason |
| --- | --- | --- | --- |
| Push an ordinary new commit directly to `workshop/integration`, including a web-editor direct commit. | Not blocked by this draft. | Blocked. | The change must arrive through a pull request, not a direct update. |
| Push the same change to `practice/baseline` or another non-targeted feature branch. | Not blocked by this draft. | Not blocked by this ruleset. | The destination branch is outside the exact target. Pushing a feature branch does not update integration. |
| Open a PR from a feature branch into `workshop/integration`. | Not blocked by this draft. | Allowed; opening is not merging. | The PR is the required contribution path. It does not change the target until merged. |
| Merge a conflict-free PR into `workshop/integration` with all other requirements satisfied. | Not blocked by this draft. | Allowed, including your own PR; this ruleset requires no independent approval. | Zero required approvals still requires a PR. Lab 3 explores approval requirements with solo and optional paired routes; Lab 4 adds the selected CI gate. |
| Delete `workshop/integration`. | Not blocked by this draft. | Blocked. | Restrict deletions preserves the target branch, even after its work has merged. |
| Replace integration history with a non-fast-forward push that removes an accepted commit. | Not blocked by this draft. | Blocked. | Block force pushes protects accepted history. The PR requirement also prevents direct updates; Lab 2 isolates the history rule separately. Merely adding `--force` to a fast-forward push is not a history rewrite. |
| Update an unrelated branch such as `main`, or create a tag. | Not blocked by this draft. | Not blocked by this ruleset. | The final rule targets only the integration branch, not every branch or any tag. Existing protections remain; do not experiment on production refs. |

<div class="warning" data-title="Admin does not mean automatic bypass">

> An administrator can edit this repository-level rule, but with an empty bypass list their operations are still subject to it while Active. Editing or disabling the rule is a configuration change, not a compliant way to complete the blocked operation.

</div>

<div class="task" data-title="Explain the boundary">

> Branch rules govern matching branch refs. Tag rules govern matching tag refs. Push restrictions, when available, apply to pushes across the repository and its fork network. Disabled rules enforce nothing; Enterprise Evaluate is a separate capability.

</div>

<details>
<summary>Solution and recovery</summary>

The saved core rule targets only `workshop/integration`, not every participant branch. Compare with [the disabled integration JSON](workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&step=10&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$#1-integration-branch). If you activated a broad rule accidentally, disable only your new workshop rule, narrow its target, and save again. Never edit inherited rules to hide a mismatch.

</details>

## Done when

Your ledger contains the pattern predictions, effective inherited policies, empty bypass list, and a disabled exact-target ruleset. Explain why a direct integration push will be blocked after activation, why a feature-branch push and compliant PR merge remain possible, and why deletion and history rewrites will be blocked. Distinguish those predictions from live evidence: a disabled draft cannot prove a blocked operation.

Target narrowly. Test deliberately.

---

# Lab 2: Close the direct-push path

## Purpose

Reject a normal direct update, then complete a PR. Separately prove that deletion and a genuinely non-fast-forward push are blocked.

## Starting checkpoint

The exact-target ruleset from lab 1 is disabled. Your baseline PR merged with existing requirements satisfied; the optional workshop CI is introduced in Lab 4. Your clone is clean; verify `git status` and `git remote -v`. If inherited policy prevents the isolated direct-update tests below, record them as blocked rather than weakening it.

## Configure, violate, comply

1. Activate `workshop-integration`. Keep Require a pull request, zero approvals, Restrict deletions, and Block force pushes selected. Do not enable Restrict updates: that would also block ordinary compliant PR merging for actors without bypass.
2. Start a new feature branch from the latest remote integration branch. Commit a harmless note, then explicitly attempt to push that commit directly to integration.

```powershell
git fetch origin
git switch --create practice/pr-path origin/workshop/integration
Add-Content practice.md 'A change that must take the PR path.'
git add practice.md
git commit -m "docs: practice protected integration"
git push origin HEAD:refs/heads/workshop/integration
```

Expect a server rejection citing the PR requirement. Keep the output. A permissions error, network failure, or non-fast-forward Git error is not this evidence.

Push the same local commit to its feature branch, open a PR into `workshop/integration`, and merge normally with title `docs: practice protected integration`.

```powershell
git push -u origin practice/pr-path
```

## Isolate deletion and force-push rules

Create `workshop/destructive` from integration in the branch menu. Create a separate active branch ruleset `workshop-destructive` targeting that exact branch with **only** Restrict deletions and Block force pushes. No PR requirement and no bypass: otherwise the experiment could fail for the wrong reason.

```powershell
git fetch origin
git switch --create practice/history-test origin/workshop/destructive
Add-Content practice.md 'Temporary history test.'
git add practice.md
git commit -m "docs: create disposable history"
git push origin HEAD:refs/heads/workshop/destructive
git push origin --delete workshop/destructive
git push --force-with-lease origin HEAD~1:refs/heads/workshop/destructive
```

The first update is ordinary and succeeds; deletion is rejected; pushing the previous commit would remove the newly added commit and must be rejected as a non-fast-forward update. A `stale info` lease rejection is client-side concurrency protection, not ruleset evidence: fetch and inspect the remote before retrying.

<div class="warning" data-title="Disposable branch only">

> Never substitute the default branch or a shared branch in these commands. Do not use reset or force pushes to remove the rejected PR-path commit; it remains safely on its feature branch.

</div>

<details>
<summary>Solution and recovery</summary>

Integration allows ordinary PR merges while direct pushes fail. The destructive test branch permits ordinary updates but rejects deletion and history rewrites. If the first direct push succeeds, inspect target and bypass settings before proceeding. Disable only the destructive-test ruleset when later cleaning up that branch.

</details>

## Done when

Show a PR-required rejection and successful PR merge, plus independent deletion and actual history-rewrite rejections on the disposable branch.

Prove the rule that caused the rejection, not just that something failed.

---

# Lab 3: Make review meaningful

## Purpose

Understand missing-approval and conversation blockers. With an optional reviewer, also demonstrate that approval covers a particular change, not any future content on a branch.

## Starting checkpoint

Lab 2's PR path works. Open a new human-authored PR with a real change to `practice.md`, base `workshop/integration`, and a valid title. Work solo using the route below, or use the paired route if an eligible reviewer has accepted write access.

## Solo route: inspect the gates yourself

1. Export your current workshop ruleset. In your own exact-target `workshop-integration` rule, require **one approval** and **Require conversation resolution before merging**, with no bypass. Inspect your unapproved PR and record the missing-review blocker. GitHub will not count an approval from the PR author; admin rights do not change this.
2. After capturing that blocker, set required approvals back to **zero** and leave stale-approval dismissal off in this workshop-created rule only, leaving the PR and conversation requirements active. This is a declared change of exercise configuration, not successful approval evidence. Do not change pre-existing or inherited requirements; if they still require another reviewer, record the affected steps as blocked.
3. Add your own inline comment on a changed line in the PR's Files changed view and submit it as a comment, not an approval. Leave the thread unresolved. With other requirements satisfied, inspect the merge box and record the conversation-resolution blocker.
4. Reply to or address the comment, resolve the thread, and confirm the conversation blocker disappears. Merge normally if all effective requirements are satisfied.
5. Record counted approval and dismissal of a stale approval as **not exercised: another eligible reviewer required**. Leave your workshop rule at zero required approvals for the solo CI lab. Keep conversation resolution enabled and bypass empty.

You can inspect your own diff, comment, resolve conversations, and test the missing-approval gate yourself. These actions are not an independent approving review. No second account, shared credentials, or bypass is needed for the solo route.

## Optional paired route: counted and stale approvals

1. Edit `workshop-integration`. Require **one approval**, enable **Dismiss stale pull request approvals when new commits are pushed** and **Require conversation resolution before merging**. Leave code-owner and last-push-approval requirements off for this isolated experiment.
2. Inspect the merge box before your partner approves. Record the missing-review blocker. The PR author cannot satisfy their own review requirement.
3. Your partner adds an inline review comment on a changed line and submits an approving review. Confirm the approval counts but the unresolved conversation blocks merging.
4. Reply to the comment and resolve the thread. Check that the blocker disappears. Do not merge yet.
5. Push a new commit that changes the diff in `practice.md`. A title edit or empty commit is not the stale-review experiment. Observe the prior approval dismissed and merge blocked again.
6. Request a fresh partner approval on the latest change, verify all conversations are resolved, and merge through the normal PR path.
7. Optionally swap author/reviewer roles on the partner's agreed workshop refs so each participant practices configuring and reviewing.

<div class="task" data-title="Explain the choices">

> Why is dismissing stale approval different from requiring approval of the most recent reviewable push? Which trade-off would your team choose? Neither requires two reviewers for this core lab.

</div>

<details>
<summary>Solution and recovery</summary>

The paired sequence is missing approval -> counted approval with unresolved thread -> resolved thread -> diff-changing push dismisses approval -> fresh approval permits merge. The solo sequence is missing approval -> declared workshop-only change to zero approvals -> own unresolved thread blocks merging -> resolved thread permits merging, subject to all other requirements. Compare with [the reviewed-CI policy and its solo adaptation](workshop/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$workshop.md&step=10&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$#2-reviewed-changes-and-required-ci), but add the CI requirement only after lab 4's baseline run.

If an optional reviewer's approval does not count, verify write access and PR authorship. If the UI requires unexpected additional approvals, inspect all inherited policies and any unattributed automation-PR requirements. Use human-authored PRs for the core, not a bot workaround.

</details>

## Done when

Solo: record the missing-approval blocker, declared return to zero approvals, unresolved/resolved conversation evidence, and compliant merge (or an existing-policy blocker). Mark counted/stale approvals not exercised. Paired: show each distinct blocker, a stale dismissed approval after a real diff change, and a merged PR with a fresh counted review and no unresolved threads. Record the route explicitly.

Solo participation is supported; self-inspection is not an independent approval.

---

# Lab 4: Turn a check into a gate

## Purpose

Require a genuine CI result in your ruleset, demonstrate blocked merging, then correct the input without weakening the policy. Choose either route below.

## Starting checkpoint

Complete your chosen Lab 3 route on `workshop/integration`. Solo participants keep zero required approvals in their own workshop rule and satisfy conversation requirements themselves; paired participants obtain the required review. Preserve all existing/inherited requirements and record a blocker if an unavailable reviewer is still required. Choose a CI route below and establish an executed passing baseline before requiring its check. On the experiment PR, satisfy all effective requirements and record the selected job/check name and reporting source, not just the workflow name.

## Path A: bring your own customer CI

1. Choose an existing build, test, linter, or policy validator that runs against this workshop PR. Record its trigger, exact check name, expected reporting integration, safe failure input, and restoration procedure. Observe an executed passing baseline before requiring it.
2. Confirm the experiment cannot deploy or affect production. If no safe reproducible failure is available, use Path B instead.
3. Add the exact check under **Require status checks to pass** in `workshop-integration`. Select the expected integration if offered; leave up-to-date-branch enforcement off for this focused exercise.
4. Introduce the agreed failing input. Confirm the check executes and fails for the intended reason and the merge box blocks merging.
5. Restore correct content, push, obtain a renewed review if the diff changed, and verify an executed passing check and successful normal merge.

Do not remove existing customer checks. A build error is legitimate for a chosen build check; an unrelated runner/network outage does not prove your intended validation.

## Path B: optional PR-title CI code example

If you do not use existing customer CI, create the two files below at the indicated paths in your selected repository. No starter folder or new project is needed. Use an approved PR into `workshop/integration` to install them, preserving existing workflows and satisfying current reviews/checks. If either path already exists, agree distinct filenames and update the workflow command instead of overwriting it. The `pull_request` trigger runs for all PR bases unless you scope it to your agreed workshop branches; confirm that scope with the repository owner before installation.

Merge the setup PR, then open a new practice PR from the updated integration branch so the workflow and validator are present on both base and head. Do not select the check as required until it has actually passed. These examples validate a Conventional Commits-style PR-title header, not application code:

```text
<type>[optional scope][optional !]: <description>
```

### `.github/workflows/pr-title.yml`

<!-- example: pr-title-workflow -->
```yaml
name: Workshop PR policy

on:
  pull_request:
    types: [opened, edited, synchronize, reopened, ready_for_review]

permissions:
  contents: read

jobs:
  pr-title:
    name: PR title convention
    runs-on: ubuntu-24.04
    steps:
      - name: Check out repository
        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
        with:
          persist-credentials: false
      - name: Validate PR title as data
        env:
          PR_TITLE: ${{ github.event.pull_request.title }}
        run: node scripts/validate-pr-title.mjs
```

The hosted runner supplies Node.js. For an approved alternative runner, ensure Node.js 22+ is available. The only external action is pinned checkout; verify your organization's action policy permits it.

### `scripts/validate-pr-title.mjs`

<!-- example: pr-title-validator -->
```javascript
import { pathToFileURL } from "node:url";

export function isConventionalTitle(title) {
  if (typeof title !== "string" || /[\r\n]/u.test(title)) return false;
  const header = /^(?<type>[\p{L}][\p{L}\p{N}-]*)(?:\((?<scope>[^()\r\n]+)\))?!?: (?<description>\S[^\r\n]*)$/u.exec(title);
  return Boolean(header && (header.groups.scope === undefined || header.groups.scope.trim()));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (isConventionalTitle(process.env.PR_TITLE)) {
    console.log("PR title matches the workshop header convention.");
  } else {
    console.error("Invalid PR title. Expected <type>[optional scope][optional !]: <description>.");
    console.error("Example: docs: update workshop guide");
    process.exitCode = 1;
  }
}
```

This practical header validator accepts letter-led types, letters/digits/hyphens, optional nonblank scope without parentheses, optional `!`, colon + space, and a nonblank single-line description. It supports other types/casing, but is not a full Conventional Commits parser or a semantic validator.

### Local diagnostic, not live enforcement

```powershell
$env:PR_TITLE = 'Update documentation'
node scripts/validate-pr-title.mjs
$env:PR_TITLE = 'docs: update workshop guide'
node scripts/validate-pr-title.mjs
```

First run exits 1 with a format error; second exits 0. For the live lab, rename the actual PR and wait for fresh runs. Do not paste PR text into shell source. The workflow passes the title through an environment variable and never prints untrusted title text as a workflow command.

### Prove the required check

| PR title | Expected |
| --- | --- |
| `docs: update workshop guide` | Pass |
| `feat(rules): add tag protection` | Pass, with scope |
| `fix(ci)!: change check contract` | Pass, with breaking marker |
| `Maintenance: refresh examples` | Pass; no fixed type allowlist or lowercase-only policy |
| `Update documentation` | Fail: missing prefix |
| `docs:update guide` / `docs: ` | Fail: missing separator space / empty description |

1. With title `docs: update workshop guide`, observe a passing **PR title convention** job on the new practice PR. The workflow and validator must exist on its base and head branches.
2. Add that exact check to `workshop-integration`'s required status checks. Select GitHub Actions as the expected source if available. Keep all other review requirements satisfied.
3. Edit only the PR title to `Update documentation`. Wait for the **new edited-event run**, open its logs, and find the meaningful format error. Confirm merge is blocked by that check.
4. Edit the title to `docs: update workshop guide`. Wait for a new passing run on the same head commit. Confirm the merge box is clear, then merge normally.
5. On another practice PR, push a harmless diff-changing commit and confirm `synchronize` revalidates the current title. Renew approval as required. This tests that title validation also follows code changes.

<div class="important" data-title="Be precise about what was proved">

> [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) defines commit messages. We adopt its header convention for PR titles; we do not validate commit history, bodies, footers, semantic meaning, or full specification compliance. The validator's documented practical syntax permits letter-led types, optional nonblank scopes and breaking markers, and a nonblank single-line description. Type allowlists and lowercase-only rules are additional team policies.

</div>

## Understand the CI boundary

The workflow listens for `opened`, `edited`, `synchronize`, `reopened`, and `ready_for_review`. Title-only edits must run again; rerunning an old event can reuse the old title. Avoid rapid edits while runs are queued, and match the newest completed run to its event. This is a simple workshop check, not an atomic production guarantee that title metadata cannot change between a run and a merge.

The title enters the script through an environment variable, never executable interpolation. The workflow uses read-only repository permissions and no secrets. A required check is not tamper-proof if contributors can change its workflow or validator: production policy also needs workflow governance. A passing PR title does not guarantee the final squash-commit subject; configure and review that separately.

<details>
<summary>Solution and recovery</summary>

Keep the requirement selected throughout red-to-green. A missing check or skipped validator is not an executed failure. If title edits do not create a run, inspect `edited` in the workflow event list. If the merge box uses the wrong context, compare the actual job name with the selected required check. If older green is still shown, wait for the newest event and capture both the run and merge-box evidence; do not claim enforcement was proved.

</details>

## Done when

Record the chosen route, exact check/source, baseline green, meaningful red, blocked merge, corrected green, and compliant merge. The PR-title route must show fresh runs for title-only edits on the same head commit and for a subsequent code push.

Do not manufacture green by skipping checks, hiding failures, or dropping requirements.

---

# Lab 5: Trace overlapping rules

## Purpose

Prove that rulesets aggregate. Disabling one rule does not remove another rule or override inherited policy.

## Starting checkpoint

Create `workshop/layering` from integration in the branch menu. Confirm squash or rebase merging is enabled before requiring linear history; change repository-wide merge settings only with owner approval. Record inherited rules; this isolated direct-update experiment requires a disposable branch where no parent PR-only rule applies.

## Configure two independent policies

1. Create `workshop-layer-baseline`, active, exact target `workshop/layering`, no bypass. Select only Restrict deletions and Block force pushes. Ordinary direct updates intentionally remain allowed on this isolated branch.
2. Create `workshop-linear-overlay`, same exact target, active, empty bypass, and **only Require linear history**. Compare the disabled JSON example in Complete examples before activation.
3. View applicable rules for that branch. Predict why an ordinary linear commit would pass, a merge commit would fail, and deletion would fail regardless of the overlay.

## Challenge the overlay with an actual merge commit

From a clean clone state, create a side commit and a local no-fast-forward merge. These names are new disposable local branches.

```powershell
git fetch origin
git switch --create practice/layer-side origin/workshop/layering
Add-Content practice.md 'Side change for layering.'
git add practice.md
git commit -m "docs: prepare layering side change"
git switch --create practice/layer-base origin/workshop/layering
git merge --no-ff practice/layer-side -m "docs: create disposable merge commit"
git log -1 --format="%h %p %s"
git push origin HEAD:refs/heads/workshop/layering
```

The log must show two parents. Expect rejection for linear history, not PR approval, check failure, or insufficient access.

## Change one variable

1. Disable only `workshop-linear-overlay`. Push the same local merge commit again. It should succeed because it is a fast-forward update of the remote ref, even though its history includes a merge.
2. With the overlay still disabled, attempt the branch deletion below. It must still be rejected by the baseline ruleset.
3. Re-enable the overlay. Add one ordinary note commit on your current local branch and push it to layering. This new linear commit should succeed. Existing previously accepted merge commits are not retroactively removed.

```powershell
git push origin HEAD:refs/heads/workshop/layering
git push origin --delete workshop/layering
```

After re-enabling the overlay:

```powershell
Add-Content practice.md 'Linear update after restoring the overlay.'
git add practice.md
git commit -m "docs: restore linear development"
git push origin HEAD:refs/heads/workshop/layering
```

<details>
<summary>Solution and recovery</summary>

There is no priority ordering: the effective policy is the union, with the most restrictive version of duplicate constraints applying. The same ref can also have inherited rules and branch protection. If PR-only inheritance prevents this isolation, record the experiment as blocked or use an authorized demonstration; do not remove parent policy or require the customer to move repositories. Do not introduce approval requirements into this isolated direct-update experiment; it works solo.

</details>

## Done when

Show a genuine merge-commit rejection, success of that same update after disabling only the overlay, persistent baseline deletion protection, and an allowed linear update after restoration.

A ruleset cannot loosen another applicable ruleset.

---

# Lab 6: A new version, not a moving tag

## Purpose

Allow first creation of a workshop tag while rejecting later updates and deletion. Distinguish Git ref stability from release artifacts or device deployment.

## Starting checkpoint

Review all tag-triggered workflows and downstream hooks. The namespace `workshop-v*` must have no production side effects. Confirm `workshop-v1` and `workshop-v2` do not already exist. Never overwrite another participant's tags.

## Configure

Create an active **tag ruleset**, `workshop-release-tags`, include `workshop-v*`, no exclusions or bypass. Select **Restrict updates** and **Restrict deletions**. Leave **Restrict creations** off: otherwise the first tag would also be blocked.

## Create, challenge, version

On a clean worktree, create the first lightweight tag at the approved remote integration commit.

```powershell
git fetch origin
git tag workshop-v1 origin/workshop/integration
git push origin refs/tags/workshop-v1
git ls-remote --tags origin "workshop-v*"
```

Record the accepted remote object ID. Create a different local commit on a disposable feature branch, then attempt an explicit update and deletion:

```powershell
git switch --create practice/tag-update origin/workshop/integration
Add-Content practice.md 'Next synthetic release observation.'
git add practice.md
git commit -m "docs: prepare next workshop version"
git push --force origin HEAD:refs/tags/workshop-v1
git push origin --delete workshop-v1
git ls-remote --tags origin "workshop-v*"
```

Both operations must be rejected by the tag ruleset and the original remote tag object ID must remain unchanged. The explicit force option gets past Git's normal tag-update refusal; a local Git refusal alone would not demonstrate server-side policy.

Instead of changing the old tag, create the next version at the new local commit:

```powershell
git tag workshop-v2 HEAD
git push origin refs/tags/workshop-v2
git ls-remote --tags origin "workshop-v*"
```

<div class="warning" data-title="Synthetic tag identity only">

> The new tag's commit is not a validated production release. Branch rules do not automatically validate tag creation; CI evidence and release publication need separate controls. No release or deployment is part of this lab.

</div>

<details>
<summary>Solution and recovery</summary>

Compare the tag policy in Complete examples: update and deletion are restricted; creation is not. If initial creation fails, check inherited rules and Restrict creations. If no mutation is attempted because HEAD equals the tag target, make a distinct harmless commit first. Preserve remote output before disabling the workshop tag rule for final cleanup.

</details>

## Done when

Show successful initial creation, update/deletion server rejections, an unchanged original tag object ID, and a successfully created next-version tag.

Tag protection does not certify the tagged code or the release bytes.

---

# Lab 7: Bypass with intent. Restore control.

## Purpose

Demonstrate that configuration rights and bypass permissions are different, then practice restoring a narrowly scoped exception.

## Starting checkpoint

Export your selected repository's rulesets using the UI export option, or the read-only API commands in Complete examples. Create a disposable `workshop/bypass` branch from integration. Confirm no inherited restriction prevents this exercise and the owner approves the temporary admin-role grant below. Otherwise record the exercise as blocked or use an authorized demonstration.

## Establish the blocked baseline

1. Create an active `workshop-bypass` branch ruleset targeting only `workshop/bypass`, with Require a pull request, one required approval, and no bypass actors.
2. Open a human-authored PR into that branch with a harmless change and valid title. Do not request approval yet. Observe that even as repository admin, you cannot normally merge without the required review.
3. Attempt a direct push of its feature commit to the target branch. Record the PR-required rejection. Keep the commit on the feature branch; do not rewrite history.

## Add one explicit exception

1. Edit only this disposable rule. Add the Repository administrators role to bypass, choosing **For pull requests only** rather than Always allow. If PR-only bypass is unavailable, record the feature gap and use a facilitator demonstration; do not silently substitute a broad always-bypass permission.
2. Retry the direct push: it must still be blocked because the exception is PR-only. Inspect the merge box and use the explicit bypass merge action on the unapproved PR. Confirm the exception succeeds and keep the PR record and available bypass reason/evidence.
3. Immediately remove the admin bypass actor and save. Create a second unapproved PR with a different harmless change. Verify normal merging is blocked again.
4. Solo: keep this second PR unmerged to preserve evidence that approval enforcement is restored; export the final rule with one required approval and no bypass, then close the PR without merging when ready to clean up. With an optional eligible partner: obtain their approval and merge normally, then re-export. Do not approve your own PR or add bypass back to manufacture a normal merge.

<div class="warning" data-title="A laboratory role grant, not least-privilege production advice">

> The admin role covers every admin of this repository; the exercise ruleset must target only the agreed disposable ref and the grant must be removed immediately. Never add this exception to an existing production rule. Production exceptions should use appropriately scoped approved actors, ownership, justification, and review. A bypass in one ruleset does not bypass all other applicable rulesets.

</div>

## Practice configuration recovery

Imagine a required check was misspelled. As repository administrator, inspect your workshop rule, compare the export and actual check name, and correct that specific setting. Editing your own policy is configuration recovery, not proof that developers can comply with it. Never disable inherited rules or leave all safeguards disabled as a shortcut.

<details>
<summary>Solution and recovery</summary>

The expected sequence is admin blocked -> explicit PR-only bypass merge -> grant removed -> admin blocked again. You can perform that sequence yourself. An optional eligible reviewer can then prove the normal approved-merge path; alone, mark that final approval case not exercised and leave the restored policy intact. If the first operation succeeds without a bypass actor, inspect another matching rule, a privileged identity, or a target mismatch. If an overlay still blocks the bypass merge, identify it rather than broadening permissions. Preserve a blocked/unavailable checkpoint if preflight cannot support the feature.

</details>

## Done when

Show before/after exports, the exceptional PR record, a direct push still rejected during PR-only bypass, and enforcement restored after removing the grant. Solo: record the second PR's restored review blocker and normal approved merging as not exercised. Paired: also show a normal approved merge. If bypass mode is unavailable, record the limitation rather than checking off a successful bypass.

Exceptions need a scope, an owner, evidence, and removal.

---

# Lab 8: Your rules. Your explanation.

## Purpose

Choose and defend a policy rather than reproduce a reference configuration. Test it yourself or invite an optional partner to challenge whether what you intended is what GitHub actually enforces.

## Starting checkpoint

The core lab evidence is collected or explicitly marked blocked. Temporary bypass grants are removed. Export your baseline. Choose a new exact-target workshop branch `workshop/capstone`; do not accidentally overlap the earlier experiment refs.

## Choose a scenario

### Small product team

Fast feature delivery, one meaningful review, an enforced CI check, and stable integration history. Explain when strict up-to-date checks would help or slow the team.

### Firmware maintenance team

Review-controlled maintenance changes and stable version tags. No firmware compilation required; explain what branch and tag protections do not prove about an actual release.

### Documentation team

Simple contribution flow with clear PR titles, resolved conversations, and no unnecessary toolchain. Explain your review burden and emergency-change procedure.

## Build your own test matrix

1. Write a short policy statement: intended users, target refs, required PR/review/CI behavior, allowed operations, and any justified exceptions. Choose at least three controls including a real required check. Solo examples: require PRs, require CI, and prevent branch deletion, with zero approvals in your own workshop rule; conversation resolution is another testable choice. With an eligible partner, include a required approval. Preserve existing/inherited policy either way.
2. For each selected control, write one allowed and one denied operation. Ensure the denied case isolates that control rather than failing first for a different rule.
3. Create the ruleset disabled, inspect targets and inheritance, then activate it. Do not import a finished answer without understanding each setting.
4. Execute the challenge cases yourself with no bypass grants. Optionally have a partner repeat them using their own write-level identity, never your credentials. Record the actor and role: your admin-actor results alone do not prove behavior for a separate write-only actor.
5. Diagnose unexpected outcomes by reading effective rules, bypass state, check identity, and review requirements. Correct your design and repeat the affected cases.
6. Complete a compliant PR merge. Export the final rulesets and record the actual check source, target refs, exceptions, policy rationale, and both outcomes for every control.
7. Keep the proven policy on the agreed workshop target. Propose any production/default-branch rollout separately through the customer's change process; do not apply it there as part of this workshop.

## Defend the policy

Explain what the repository admin can reconfigure, what developers can bypass, which inherited rules remain, what CI actually validates, and how to recover without erasing safeguards. Explain one trade-off you deliberately did not turn into a rule.

<details>
<summary>Assessment guide, not a single answer</summary>

A good answer is small, testable, and consistent with the scenario. Three sensible controls with real evidence beat many untested toggles. A policy that cannot be satisfied by the available participants is not complete. Use the [evidence ledger](page/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$solutions.md&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$#copyable-evidence-ledger) and retain failed/blocked checkpoints honestly.

</details>

## Done when

You can explain your final policy, each selected control has allowed/denied evidence, a compliant PR merged, exports match the settings, and no unintended bypass remains. Record solo or paired participation and the tested actor roles. An optional partner can independently challenge the result; do not claim independent-review or write-only-actor evidence you did not collect.

[Finish with safe cleanup](page/?src=$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$instructor.md&vars=source:$$source:gh%3AChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/$$#cleanup-and-durable-handoff).

Optional advanced modules are not substitutes for core enforcement evidence.

---

# Complete examples

All reference policy bodies are embedded below. The optional CI workflow and validator are directly in Lab 4. No separate course repository access is required.

<div class="warning" data-title="Inspect before applying">

> JSON examples start disabled and have no bypass actors. They are repository-level REST create request bodies, not live policies. The UI can create the same settings; use its import option only if available and compatible. Inspect the result, exact targets, and current API requirements before activation.

</div>

## 1. Integration branch

Lab 2's starting policy: require a PR but no approval yet. UI targets use branch names; JSON uses full refs.

[Download the integration policy](assets/rulesets/01-integration.json).

<!-- policy: 01-integration.json -->
```json
{
  "name": "workshop-integration",
  "target": "branch",
  "enforcement": "disabled",
  "bypass_actors": [],
  "conditions": {
    "ref_name": {
      "include": ["refs/heads/workshop/integration"],
      "exclude": []
    }
  },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    {
      "type": "pull_request",
      "parameters": {
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_approving_review_count": 0,
        "required_review_thread_resolution": false
      }
    }
  ]
}
```

## 2. Reviewed changes and required CI

Reference final shape after the **optional paired route** in labs 3 and 4. For solo work, change `required_approving_review_count` to `0` and `dismiss_stale_reviews_on_push` to `false` in this workshop example; keep PRs, conversation resolution, CI, and branch protections. Do not weaken existing or inherited requirements. **Edit the existing integration ruleset** rather than creating duplicate rulesets unintentionally. Run CI first. Substitute the actual check context for the customer-CI route. This portable body omits an account-specific integration ID; select the expected source in the UI when available.

[Download the reviewed-CI policy](assets/rulesets/02-reviewed-ci.json).

<!-- policy: 02-reviewed-ci.json -->
```json
{
  "name": "workshop-reviewed-ci",
  "target": "branch",
  "enforcement": "disabled",
  "bypass_actors": [],
  "conditions": {
    "ref_name": {
      "include": ["refs/heads/workshop/integration"],
      "exclude": []
    }
  },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    {
      "type": "pull_request",
      "parameters": {
        "dismiss_stale_reviews_on_push": true,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_approving_review_count": 1,
        "required_review_thread_resolution": true
      }
    },
    {
      "type": "required_status_checks",
      "parameters": {
        "required_status_checks": [{ "context": "PR title convention" }],
        "strict_required_status_checks_policy": false
      }
    }
  ]
}
```

## 3. Linear-history overlay

Apply only with the separate baseline described in lab 5. Enable a compatible squash/rebase merge method before activation.

[Download the linear-history policy](assets/rulesets/03-linear-history.json).

<!-- policy: 03-linear-history.json -->
```json
{
  "name": "workshop-linear-overlay",
  "target": "branch",
  "enforcement": "disabled",
  "bypass_actors": [],
  "conditions": {
    "ref_name": {
      "include": ["refs/heads/workshop/layering"],
      "exclude": []
    }
  },
  "rules": [{ "type": "required_linear_history" }]
}
```

## 4. Stable workshop tags

Creation is deliberately not restricted. Update and deletion are. Review all downstream tag triggers before activating.

[Download the tag policy](assets/rulesets/04-tags.json).

<!-- policy: 04-tags.json -->
```json
{
  "name": "workshop-release-tags",
  "target": "tag",
  "enforcement": "disabled",
  "bypass_actors": [],
  "conditions": {
    "ref_name": {
      "include": ["refs/tags/workshop-v*"],
      "exclude": []
    }
  },
  "rules": [
    {
      "type": "update",
      "parameters": { "update_allows_fetch_and_merge": false }
    },
    { "type": "deletion" }
  ]
}
```

## Optional CLI/API: inspect, export, compare, import

The core is UI-first. The following PowerShell commands require authenticated `gh` with authorized access to **your selected repository**. They only read until the explicitly marked POST. Replace the identity and ID; do not copy server-generated IDs, source metadata, or foreign bypass actor IDs into a create request.

```powershell
$repo = 'OWNER/REPOSITORY'
gh auth status
gh api --paginate "repos/$repo/rulesets?includes_parents=true&per_page=100"
$id = 123
gh api "repos/$repo/rulesets/$id" | Set-Content -Encoding utf8 ruleset-before.json
gh api "repos/$repo/rules/branches/workshop%2Fintegration"
```

Parent-sourced rulesets may require reading their owning organization's endpoint or using the UI; a local repository export alone is not a backup of all inherited controls. Inspect `gh`'s exit status before treating an export file as a usable backup.

Save a chosen embedded JSON example as `policy.json`. Inspect its exact workshop targets and disabled enforcement. In the explicitly approved repository only, creating a new draft is:

```powershell
gh api --method POST "repos/$repo/rulesets" --input policy.json
```

Record the returned ID. Open the resulting draft in settings, compare it with your intent, and activate only after preflight. Existing exports are not guaranteed portable create bodies: retain documented request fields and resolve local actors/check sources. To compare two exports without ignoring meaningful policy differences:

```powershell
gh api "repos/$repo/rulesets/$id" | Set-Content -Encoding utf8 ruleset-after.json
git diff --no-index -- ruleset-before.json ruleset-after.json
```

A diff exit code of 1 means differences were found. Compare target, enforcement, bypass, and rule parameters; server timestamps and IDs are not policy changes. Do not POST an export blindly or overwrite an existing rule as an accidental duplicate.

## Authoritative references

[GitHub REST rulesets](https://docs.github.com/en/rest/repos/rules) / [Available rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets) / [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

Examples are learning aids, not proof of live configuration or enforcement.

---

# Optional extensions

## Extend only what you can verify

Finish core evidence first. Check actual entitlement, visibility, actor rights, and runner capability for each extension. Mark unavailable modules skipped, not completed.

## CODEOWNERS and path-specific review

**Prerequisites:** eligible repository, optional independent reviewer or team with explicit write access, valid CODEOWNERS entries on the PR base branch. Counted code-owner approval needs an eligible owner other than the author; solo participants can inspect configuration and blockers but must mark the successful independent-approval case not exercised.

Create `.github/CODEOWNERS` with an actual eligible owner for a synthetic directory only when authorized. Enable required code-owner reviews. Change a file in that path and observe the owner-review blocker. With an eligible independent owner available, obtain a counted approval and merge; alone, keep or close the blocked PR without claiming a successful approval. Compare an unowned path. Confirm the file is on the base branch and avoid accidentally requiring an unavailable owner. A multi-owner entry can be satisfied by one of its owners; it is not automatically an approval from every owner.

## Verified commit signatures

**Prerequisites:** approved signing setup and an account-linked verification identity.

Use a separate disposable target with required signatures and no bypass. Introduce a genuinely unsigned new commit and observe rejection, then recreate the change with a verified signature and observe success. Inspect GitHub's verification result. A signed final squash commit alone does not necessarily make unsigned head commits acceptable. Keep the experiment isolated; never rewrite a shared branch to repair signing.

## CLI/API administration

**Prerequisites:** authenticated approved GitHub CLI access to the selected repository.

Follow the inspect/export/import example in Complete examples. Compare before/after request-relevant fields, resolve actors in the destination, create a disabled draft, inspect it, and deliberately activate. Re-run an allowed and denied operation; successful JSON parsing is not proof of enforcement.

## Enterprise Evaluate and Rule Insights

**Prerequisites:** Enterprise capability and the appropriate Insights access.

On a disposable ref, configure a prospective rule in Evaluate. Perform an operation that would violate it; confirm the operation succeeds while Insights records the would-be violation. Activate the rule and repeat a genuinely new violating operation: it should now be rejected. Restore the agreed state. Disabled mode is not a substitute for evaluation.

## Organization policy inheritance

**Prerequisites:** Enterprise organization policy support and an authorized facilitator with organization-administration rights.

Inspect existing inherited policy without changing it. If authorized to add a temporary exercise policy, the facilitator targets an explicit allowlist of customer-approved repositories and agreed workshop refs, never every repository by default. Apply a small parent constraint and have participants identify its source. Demonstrate that changing a child rule does not weaken the parent requirement. Perform a compliant operation, then have the facilitator remove only the temporary parent exercise policy. Participants do not receive organization-owner access.

## Push rulesets

**Prerequisites:** actual plan entitlement and supported private/internal repository visibility, plus a separate approved disposable repository if needed.

Restrict a synthetic path such as `restricted/**/*`, a harmless extension, or a deliberately small file-size limit. Commit a synthetic violation on a new branch and observe a server rejection. Recreate an allowed-only change from the accepted baseline and push successfully. Inspect the fork-network implications and explain why these rules do not have branch targeting. Do not use real credentials, large data, or sensitive files as test content. A deletion in a later commit may not remove the earlier rejected content; see the troubleshooting page for recovery guidance.

## Merge queue

**Prerequisites:** supported plan/visibility, enabled queue, approved runners, and a check that meaningfully validates the merge group.

Use a separate example rather than adding a failing trigger to the optional title-only workflow. Queue CI must handle `merge_group`, whose payload does not contain a single PR title. Keep title validation as a separate PR gate; design the required queue check with a stable identity and meaningful combined-code validation. Queue a compliant change, observe merge-group CI, and inspect a failed group blocking merge before correcting it. Never feed an absent PR title to the example validator or return a dummy pass.

## Reference documentation

[Rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) / [Code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) / [Signatures](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification) / [Workflow triggers](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows).

Optional capabilities do not change the core completion requirements.
