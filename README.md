# GDG on Campus VinUniversity — website

Landing site for Google Developer Group on Campus at VinUniversity. Built with Next.js (App Router) and Tailwind CSS. All content lives in this repository as JSON and Markdown; there is no CMS or database.

## Run it

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # static production build in out/
```

## Deploy to Cloudflare Pages

Use these build settings in the Cloudflare Pages project:

- Framework preset: **Next.js (Static HTML Export)**
- Build command: `bun run build`
- Build output directory: `out`
- Root directory: the repository root

`next.config.ts` enables `output: "export"`, so the build generates HTML, CSS,
JavaScript, and images in `out/`. Upload this directory to Pages. The build does
not require a Next.js server or Pages Functions. `next start` does not serve a
static export; use `bun dev` for local development.

All article and event URLs are generated from repository content at build time;
adding or changing content requires a new deployment. Images are served directly
from `public/` without the Next.js image optimization endpoint.

## Routes

| Route | Source |
| --- | --- |
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/events`, `/events/[slug]` | `content/events/*.md` |
| `/articles`, `/articles/[slug]` | `content/articles/*.md` |
| `/team` | `content/team/gen-*.json` |
| `/join` | `content/departments.json`, `content/site.json` |

## Editing content

```
content/
  site.json          name, tagline, stats, socials, photo wall, recruitment status
  departments.json   the four stations shown on / and /join
  timeline.json      milestones shown on / and /about
  team/gen-N.json    one file per generation
  events/*.md        one file per event
  articles/*.md      one file per article
public/images/
  events/<slug>/     photos for an event
  articles/<slug>/   images for an article
  team/gen-N/        portraits
```

### Add an event

1. Create `content/events/my-event.md`. The file name becomes the URL (`/events/my-event`).
2. Put photos in `public/images/events/my-event/`. Every image in that folder appears in the gallery, sorted by file name.

```md
---
title: "Workshop: Something New"
date: 2027-01-15
type: workshop            # workshop | hackathon | community | talk
location: "VinUniversity, Hanoi"
summary: "One or two sentences shown on cards."
cover: "03.jpg"           # optional; defaults to the first image in the folder
dateLabel: "January 2027" # optional; overrides the formatted date
role: "Host"              # optional badge
featured: true            # optional; shows on the home page
speakers:                 # optional
  - name: "Speaker Name"
    role: "Title, Company"
---

Markdown body goes here.
```

### Add an article

Create `content/articles/my-article.md`:

```md
---
title: "Article title"
date: 2027-01-20
summary: "Shown on cards and under the title."
tags: ["Recap"]
cover: "01.jpg"   # a file in public/images/articles/my-article/, or a full /images/... path
---

Markdown body. Images: ![alt text](/images/articles/my-article/02.jpg)
```

### Update the team

Edit `content/team/gen-N.json`. Remove `"placeholder": true` once a generation has people in it. Each person takes `name`, `role` and an optional `photo` path under `/images/...`; without a photo the card shows initials.

### Open or close recruitment

In `content/site.json`, set `recruitment.open` to `true`, and fill in `period`, `applyUrl` and `jobDescriptionUrl`.

## Notes

- `site.url` in `content/site.json` is a placeholder; set it to the real domain.
- The bracket logo in `components/logo.tsx` is a hand-drawn stand-in for the official GDG logo.
