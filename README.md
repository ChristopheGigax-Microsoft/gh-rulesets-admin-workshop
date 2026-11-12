# From Settings to Safeguards

A hands-on GitHub repository rulesets administration workshop. Participants use a customer-approved repository, including an existing real repository, and push harmless changes on agreed workshop refs. Work solo or with an optional partner. A disposable repository is an option, not a requirement.

**Configure -> violate -> inspect -> comply -> prove.** Saved settings alone are not completion.

## Read the workshop

Open [site/index.html](site/index.html), starting with [preflight](site/prerequisites.html). The site uses local assets and relative links; no frontend build, backend, telemetry, or external fonts are required. Upload the contents of `site` to your approved static host, preserving paths. Browser-local progress is optional.

To preview over HTTP from this checkout:

```powershell
python -m http.server 8000 --directory site --bind 127.0.0.1
```

Visit `http://127.0.0.1:8000`. Stop the server with Ctrl+C.

## Learning journey

1. Target branches and understand enforcement.
2. Require PRs and protect disposable branches.
3. Enforce approvals and conversation resolution.
4. Require customer-selected CI, or the supplied Conventional Commits-style PR-title check.
5. Diagnose additive rulesets.
6. Prevent release-tag mutation.
7. Test a controlled bypass and restore enforcement.
8. Design your own policy and challenge it yourself or with an optional partner.

Advanced features are independent extensions, gated by the actual plan, repository visibility, and permissions. No participant needs organization-owner access.

## Choose the exercise repository

Use an existing customer repository or an optional disposable repository. Confirm repository-admin access, inherited policy, and safe branch/tag names with its owner. If using a partner, confirm their write access. In a shared repository, assign non-overlapping refs and exact ruleset targets to each participant or pair, adapting the example names throughout. Do not change production/default-branch protections or weaken inherited policy for an experiment.

Solo participants perform configuration, PRs, CI experiments, and policy challenges themselves. GitHub does not let a PR author approve their own PR: Lab 3 provides a solo path for the missing-approval blocker and conversation resolution, with counted/stale approvals explicitly left unverified. Later solo labs use zero required approvals only in the participant's own workshop rules; existing and inherited requirements remain intact.

No starter folder or template is required. Create an agreed harmless practice file on the workshop integration branch. Keep existing application files and workflows intact, and inspect downstream triggers before creating workshop refs.

[Lab 4](site/labs/04-required-ci.html) accepts existing customer CI and contains a complete optional PR-title workflow and validator as copyable code examples. The latter validates PR titles, not commit history, and triggers on title edits as well as code pushes. It needs Node.js 22+ on the runner; the example uses `ubuntu-24.04`. No application or embedded toolchain is required.

Use the [facilitator guide](site/instructor.html) for repository approval, solo/optional paired participation, evidence, and cleanup. The site includes the CI code in Lab 4 and disabled JSON policies on the examples page, so participants do not need access to this course repository.

## Examples and checks

`examples/rulesets` contains disabled, repository-level REST request bodies. They are starting points, not already-enforced policies. Inspect target refs and run CI before activating them. No account-specific bypass actor IDs are embedded.

Run local checks with Node.js 22+; no package installation is needed:

```powershell
node --test
node scripts/check-site.mjs
```

These check the embedded Lab 4 validator and workflow, example policies, local site links, and embedded-source consistency. They do **not** prove GitHub enforcement. An authorized live rehearsal on agreed workshop refs is required before delivery; use the [rehearsal checklist](site/instructor.html#rehearsal). No live repositories or settings are provisioned by these commands.
