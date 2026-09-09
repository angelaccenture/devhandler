# DevHandler Homepage — Migration Evaluation (Emma)

> Demo / tech-talk artifact. Emma's page-level migration read of `devhandler.com` homepage,
> captured so it can be recalled and shown live to an audience. Verified against the live page +
> this repo + the DA.live instance.

## The headline (the line to land on stage)

**This is a genuinely small effort — because the blocks, the repo, and the DA content source were
all already in place.** There's no net-new block development for this page. It's a *content import*,
not a build. That's the whole point of an author-kit-based EDS project: the platform work is done,
so migrating a page is measured in **hours, not weeks.**

## Why it's small — the three readiness checks

| Ready? | What | Evidence |
|:--:|------|----------|
| ✅ | **Repo scaffolded** (author-kit) | EDS project structure complete — scripts, styles, head.html, query config, 11 blocks |
| ✅ | **Content source live** | DA.live instance at `angelaccenture/devhandler` (DA-backed, no fstab) |
| ✅ | **Blocks already built** | `header, footer, hero, card, columns, advanced-tabs, fragment, schedule, table, youtube, section-metadata` |

When all three are green, migration = author the content + move the images + publish. No platform work.

## How the page breaks down (the audience-facing decomposition)

The live homepage is a standard marketing page. Emma reads it top-to-bottom and maps each visual
section to an existing block:

```
┌─────────────────────────────────────────────────────────┐
│  HEADER            logo · nav · CTA           → header    │
├─────────────────────────────────────────────────────────┤
│  HERO              "The Adobe Consulting Company"         │
│                    pretitle + headline + CTA  → hero      │
├─────────────────────────────────────────────────────────┤
│  STAT TILES        10+ Years · 20+ Experts ·              │
│                    7 Industries · Clear Costs → cards /   │
│                                                  columns  │
├─────────────────────────────────────────────────────────┤
│  "Why DevHandler?"  feature / text+media      → columns   │
├─────────────────────────────────────────────────────────┤
│  "Excellence isn't a goal…"  value section    → columns   │
├─────────────────────────────────────────────────────────┤
│  FOOTER            links · legal              → footer    │
└─────────────────────────────────────────────────────────┘
```

### Section → block mapping table

| # | Page section | Content | EDS block | Exists? |
|---|-------------|---------|-----------|:--:|
| 1 | Header | logo, nav, CTA | `header` | ✅ |
| 2 | Hero | pretitle + "The Adobe Consulting Company" + CTA | `hero` | ✅ |
| 3 | Stat tiles | 10+ Years · 20+ Experts · 7 Industries · Clear Costs | `card` / `columns` | ✅ |
| 4 | Why DevHandler | feature copy + supporting media | `columns` (text+media) | ✅ |
| 5 | Excellence / value | headline + body | `columns` / default content | ✅ |
| 6 | Footer | link columns, legal | `footer` | ✅ |

**~5–6 blocks, 100% already in the library.** Everything else is default content (rich text/images).

## The page facts (from live inspection)

- **Platform:** Next.js, server-rendered · 200 · ~48KB · ~8.6KB visible text
- **Media:** 26 PNGs (served via `next/image`)
- **Interactivity:** no forms, no video, no auth on this page — purely presentational
- **Nav:** shallow (`/about`, etc.) — small marketing site

## Effort read

**~1–2 dev-days for the homepage** — and most of that is authoring content into DA + moving images,
not engineering. Compare to a from-scratch build (stand up repo, build blocks, wire CI) which is
weeks: the readiness is the multiplier.

## How the migration actually runs (the EDS-correct path)

1. **Scrape** the homepage (content + images + metadata).
2. **Generate the import** via the project's import script — produces DA-ready HTML with the block
   tables. *(Never hand-author the markup — use the tooling.)*
3. **Import into DA.live**, migrate the 26 images.
4. **Preview → publish**; wire header/footer nav + CTAs.

## Polish flags (not blockers)
- Value-prop icons are **PNG** → consider **SVG** in EDS for crispness/perf.
- Confirm CTA destinations (contact form likely lives elsewhere on the site, not this page).

## Demo talking points (for the tech talk)
- "Watch how I read a live page and decompose it into blocks in seconds."
- "Notice I *didn't* build anything — the library already had every block. That's author-kit."
- "The honest answer is: this is small. A good agent tells you when something is easy, not just when it's hard."
- "The real work isn't code — it's authoring content into DA and moving images."
