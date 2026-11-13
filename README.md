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

## MOAW edition

`moaw` is a separate, manually maintained Markdown edition for [MOAW](https://aka.ms/moaw). The original `site` is unchanged and remains usable independently. Both editions are in English.

The workshop intentionally omits author/contact metadata so no attribution subtitle appears. A separate MOAW catalog submission still requires its own authors and contacts.

The MOAW folder contains `workshop.md` (welcome, preflight, eight labs, complete examples, optional extensions), three annex pages (`instructor.md`, `solutions.md`, `troubleshooting.md`), and the four downloadable policies under `assets/rulesets`. It does not depend on the HTML site or its CSS/JavaScript. Progress buttons are not ported: retain the evidence ledger, not navigation state, as proof. MOAW's privacy and tracking behavior are separate from the standalone site's.

### Preview locally

With Node.js 22+ and npm, use the official CLI:

```powershell
npm exec --yes --package=@moaw/cli@1.6.1 -- moaw serve moaw/workshop.md --host localhost --port 4467
```

Use an unused port; stop this preview with Ctrl+C. Open:

```text
http://localhost:4467/workshop/?src=workshop.md&vars=source:./
```

The `source` variable keeps internal step/page links on the local files and propagates through annex pages. Links are relative to MOAW's HTML base, not the current source path. Their default `gh%3A` prefix is URL-encoded because MOAW's default-value substitution splits on colons; the URL query decodes it back to `gh:`. Do not simplify these links to `?step=...`, raw `.md` links, or unencoded colon-containing defaults.

The CLI at this version serves the `/workshop/` SPA route but not `/page/`: direct annex navigation can return a local 404. This is a preview-server limitation, not a missing Markdown file. To review annexes in that local viewer, open the browser developer console from a loaded workshop and run the following, changing `instructor.md` to `solutions.md` or `troubleshooting.md` as needed. This uses MOAW's client-side router without a server reload; the published MOAW host serves the page route normally.

```javascript
history.pushState({}, "", "/page/?src=instructor.md&vars=source:./");
dispatchEvent(new PopStateEvent("popstate"));
```

Return through the page's Workshop link. Do not replace the published page links with this local-only workaround.

### Maintain both editions

Report pedagogical changes in both `site` and `moaw`; there is no conversion generator. Automated checks compare all copied commands, the Lab 4 workflow/validator, and the four embedded/downloadable policies with the originals. They also check metadata, sections, resources and portable links/anchors. They do not prove full prose equivalence, browser rendering, or GitHub enforcement. Re-review the affected sections in both editions and repeat the authorized live rehearsal before delivery.

Correspondence:

| Original | MOAW destination |
| --- | --- |
| `site/index.html`, `site/prerequisites.html` | Welcome and Preflight (steps 0 and 1) |
| `site/labs/*.html` | Eight lab sections (steps 2 through 9) |
| `site/ruleset-examples.html`, `site/extensions.html` | Complete examples and Optional extensions (steps 10 and 11) |
| `site/instructor.html`, `site/solutions.html`, `site/troubleshooting.html` | The three same-purpose annex pages |
| `examples/rulesets/*.json` | Embedded examples plus `moaw/assets/rulesets/*.json` |

### Publication checklist

MOAW's direct GitHub loading requires publicly accessible source. The workshop declares `published: true`; this does not change repository visibility or publish unpushed changes. The flag controls catalog visibility, **not confidentiality**.

Before making **this same repository** public:

1. Rehearse the workshop on authorized refs, confirm the estimated `duration_minutes: 180` in `moaw/workshop.md`, and confirm rights to distribute the material. Supply author/contact metadata separately if submitting a catalog entry.
2. Review all material that would become public: current files, complete Git history, other branches/tags, and GitHub issues, discussions, releases and attachments. A clean working tree alone does not make historical or hosted content safe to expose. Any credential or private/customer content found blocks publication; do not rewrite history automatically.
3. Keep `site.zip` as a local-only archive. It is ignored specifically, not deleted; it is not an input for MOAW. Ensure no temporary files, local dependencies or archives are staged.
4. Run all checks below and `node scripts/check-moaw.mjs --publication`. The latter requires a positive duration, even with `published: false`; it checks document readiness, not permission to publish or absence of sensitive data.
5. Review the diff, then commit/push and change repository visibility **only on explicit request**, after reviewing GitHub's visibility-change warnings. Confirm `git status --short` is empty after the approved commit; do not reset, stash or delete work to force a clean status.
6. Once public and pushed to `main`, verify anonymous loading, all steps, annexes and assets from the remote source. GitHub content caching can delay updates.

The intended link, **not usable until the source is public and pushed**, is:

```text
https://aka.ms/ws?src=gh:ChristopheGigax-Microsoft/gh-rulesets-admin-workshop/main/moaw/
```

Use the `aka.ms` link rather than hard-coding `moaw.dev`; MOAW announces that domain's retirement in 2027. No copy or new repository is required for the chosen publication route. If you later decide to keep this repository private, copy only the self-contained `moaw` folder yourself to an approved public source, then update the default `source` values in the Markdown and the link checker, or share links with a `vars=source:...` override. Recheck all links at the new location.

Catalog listing is optional and separate from direct-link access: `published: true` is set in the workshop metadata; propose an entry in MOAW's `packages/database/external.yml` to request listing. There is no course-site deployment workflow to add.

Format reference: [official MOAW authoring guide](https://github.com/microsoft/moaw/blob/main/workshops/create-workshop/workshop.md).

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

Run local checks with Node.js 22+. The original site checks need no packages; the additional MOAW checks use the locked Markdown/YAML validation dependencies:

```powershell
npm ci --ignore-scripts --no-fund --no-audit
node --test
node scripts/check-site.mjs
node scripts/check-moaw.mjs
```

These check the embedded Lab 4 validator and workflow, example policies, local site links, MOAW links/metadata, and embedded-source consistency. They do **not** prove GitHub enforcement. An authorized live rehearsal on agreed workshop refs is required before delivery; use the [rehearsal checklist](site/instructor.html#rehearsal). No live repositories or settings are provisioned by these commands.
