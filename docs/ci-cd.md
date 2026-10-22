# Continuous integration and deployment

## GitHub Actions CI

The `.github/workflows/ci.yml` workflow runs on pull requests targeting `master` and pushes to `master`. It installs the committed npm lockfile, runs ESLint, and creates a production build.

Keep the workflow green before merging changes. If required status checks are available in repository settings, mark the CI job as required for `master`.

## Vercel deployment

This project is already deployed on Vercel. Prefer Vercel's native Git integration rather than adding a second deployment mechanism in GitHub Actions:

- Pull requests get Vercel Preview Deployments.
- Pushes/merges to the configured production branch (`master`, if that is the branch selected in Vercel) create production deployments.
- Vercel manages deployment build logs and domains.

Confirm in Vercel Project Settings → Git that this repository is connected and `master` is the Production Branch. Do not configure a second Vercel CLI deployment workflow unless native Git deployments are intentionally disabled.

## Required environment variables

Configure server-only contact mail settings in Vercel Project Settings → Environment Variables for the appropriate Preview and Production environments:

- `EMAIL`
- `EMAIL_PASS`
- `CONTACT_RECIPIENT`
- `SMTP_HOST` (optional; defaults to `mail.metabrs.com`)
- `SMTP_PORT` (optional; defaults to `465`)

Never put real credentials in GitHub workflow YAML or commit an actual `.env` file. Rotate any credential that was previously committed.

## Notes

The contact endpoint currently has best-effort in-memory rate limiting. Serverless deployments can run multiple independent instances, so production abuse protection should use a shared rate-limit store or a provider-level protection service.
