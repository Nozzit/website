# OpenAEC Subdomain Deploy Workflow

This runbook describes the workflow used to publish OpenAEC tool sites on
`*.open-aec.com`.

It was tested in practice while publishing:

- `open-geotechniek-studio.open-aec.com`
- `open-calculations-studio.open-aec.com`
- `open-books.open-aec.com`

## Scope

Use this for static tool sites and web builds that should deploy to a
subdomain such as:

```text
tool-name.open-aec.com
```

The preferred path is the shared GitHub Actions workflow:

```yaml
uses: OpenAEC-Foundation/github/.github/workflows/deploy-site.yml@main
```

Do not add a repo-specific server deploy unless the shared workflow cannot
support the site.

## Before Changing Anything

Gather facts first. Do not guess.

Check the target repository:

```bash
gh repo view OpenAEC-Foundation/<repo> --json name,defaultBranchRef,url,isArchived,pushedAt
gh api repos/OpenAEC-Foundation/<repo>/contents/.github/workflows --jq '.[].path'
```

Check whether an existing live workflow already uses the shared deploy:

```bash
gh api repos/OpenAEC-Foundation/<repo>/contents/.github/workflows/<workflow>.yml \
  --jq '.content' | base64 -d
```

Check the server state:

```bash
ssh <deploy-host> 'test -e /etc/nginx/sites-available/<host> && sed -n "1,120p" /etc/nginx/sites-available/<host> || true'
ssh <deploy-host> 'test -e /var/www/<host> && find /var/www/<host> -maxdepth 2 -type f | head || true'
```

Check DNS:

```bash
dig +short <host> A
```

## Repository Workflow

Add or update the repository live workflow so it calls the shared deploy
workflow.

Minimal static site:

```yaml
name: Deploy site

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: deploy-site
  cancel-in-progress: true

jobs:
  deploy:
    uses: OpenAEC-Foundation/github/.github/workflows/deploy-site.yml@main
    with:
      deploy_host: ${{ vars.DEPLOY_HOST }}
      deploy_port: ${{ vars.DEPLOY_PORT }}
      deploy_user: ${{ vars.DEPLOY_USER }}
      deploy_path: /var/www/<host>
    secrets:
      deploy_ssh_key: ${{ secrets.DEPLOY_SSH_KEY }}
```

For built web apps, add the build inputs:

```yaml
      node_version: "22"
      install_command: npm ci
      build_command: npm run build
      deploy_source: dist
```

For monorepos, set `deploy_source` to the actual build output, for example:

```yaml
      deploy_source: packages/web/dist
```

For huge repositories, avoid a full checkout. Use `checkout_sparse` and make
the app load large assets from a stable external source if appropriate:

```yaml
      checkout_sparse: |
        index.html
```

This was needed for `open-books`, because deploying all scanned page images
would require moving many gigabytes on each deploy.

## DNS

Add an `A` record for the subdomain pointing at the OpenAEC web server:

```text
<subdomain> 3600 A 167.235.54.105
```

DNS credentials are managed outside the website repository. Do not copy keys
or tokens into a repository or into this runbook.

After changing DNS, verify both public resolution and the authoritative update
path:

```bash
dig +short <host> A
dig +short <host> A @1.1.1.1
dig +short <host> A @8.8.8.8
```

## Shared Deploy Behavior

The shared workflow does three important things:

1. It stages the selected source directory.
2. It syncs the staged files to `deploy_path` with `rsync --delete`.
3. When `deploy_path` is `/var/www/<host>` and `deploy_user` is `root`, it
   creates or updates a managed nginx site for `<host>`.

Managed nginx configs contain this marker:

```text
# Managed by OpenAEC shared deploy workflow
```

If a config exists without that marker, the workflow leaves it unchanged. In
that case, inspect it manually before deciding whether to migrate, replace, or
redirect it.

## Verification Checklist

After pushing the workflow change, watch the Actions run:

```bash
gh run list --repo OpenAEC-Foundation/<repo> --limit 5
gh run view <run-id> --repo OpenAEC-Foundation/<repo> --json status,conclusion,jobs
```

Verify the server:

```bash
ssh <deploy-host> 'nginx -t'
ssh <deploy-host> 'sed -n "1,120p" /etc/nginx/sites-available/<host>'
ssh <deploy-host> 'find /var/www/<host> -maxdepth 2 -type f | head'
```

Verify HTTP behavior:

```bash
curl -sS -o /dev/null -w 'http %{http_code} %{redirect_url}\n' http://<host>/
curl -sS -o /dev/null -w 'https %{http_code} %{content_type} %{size_download}\n' https://<host>/
```

For apps with external assets, verify at least one representative asset:

```bash
curl -sS -o /dev/null -w '%{http_code} %{content_type} %{size_download}\n' <asset-url>
```

Only call the deploy complete after the GitHub Actions run succeeded and the
live HTTP checks return the expected status.

## Legacy Host Redirects

If an old host already exists, do not assume changing the new workflow removes
it. Old nginx sites and old DNS records can keep serving stale content.

A permanent redirect is an HTTP behavior, not a DNS behavior. Keep the old DNS
record pointed at the server so nginx can receive the request and return a
`301`.

Replace the old nginx site with a redirect:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name old-host.open-aec.com;
    return 301 https://new-host.open-aec.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name old-host.open-aec.com;

    ssl_certificate /etc/letsencrypt/live/open-aec.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/open-aec.com/privkey.pem;

    return 301 https://new-host.open-aec.com$request_uri;
}
```

Then verify:

```bash
curl -sS -o /dev/null -w '%{http_code} %{redirect_url}\n' http://old-host.open-aec.com/
curl -sS -o /dev/null -w '%{http_code} %{redirect_url}\n' https://old-host.open-aec.com/
curl -sS -L -o /dev/null -w '%{http_code} %{url_effective}\n' https://old-host.open-aec.com/
```

If the old webroot is stale and no longer used, remove it only after the
redirect config is active and verified.

## Workflow Audit

To find repos that still bypass the centralized deploy workflow, scan workflow
files for deploy-like behavior and absence of:

```text
OpenAEC-Foundation/github/.github/workflows/deploy-site
```

Useful signals:

- `DEPLOY_HOST`
- `/var/www`
- `rsync`
- `scp`
- `ssh`
- `appleboy/ssh-action`
- `appleboy/scp-action`
- `actions/deploy-pages`
- `mkdocs gh-deploy`

Repos that deploy public tool pages should normally be migrated to the shared
workflow unless they have a clear reason not to.

