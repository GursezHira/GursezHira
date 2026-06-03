# Graph Report - .  (2026-06-02)

## Corpus Check
- Corpus is ~40,120 words - fits in a single context window. You may not need a graph.

## Summary
- 69 nodes · 27 edges · 47 communities (5 shown, 42 thin omitted)
- Extraction: 70% EXTRACTED · 30% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.82)
- Token cost: 8,500 input · 2,800 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Baby Gursez Stories|Baby Gursez Stories]]
- [[_COMMUNITY_Typography & Font Licensing|Typography & Font Licensing]]
- [[_COMMUNITY_CICD Deployment|CI/CD Deployment]]
- [[_COMMUNITY_Graphify Agent Tools|Graphify Agent Tools]]
- [[_COMMUNITY_Family Tree Layout|Family Tree Layout]]
- [[_COMMUNITY_Branch Spotlight|Branch Spotlight]]
- [[_COMMUNITY_Family Grid Search|Family Grid Search]]
- [[_COMMUNITY_Family Grid Rendering|Family Grid Rendering]]
- [[_COMMUNITY_Hover Card Hide|Hover Card Hide]]
- [[_COMMUNITY_Hover Card Show|Hover Card Show]]
- [[_COMMUNITY_Hover Card Position|Hover Card Position]]
- [[_COMMUNITY_Tree Connectors|Tree Connectors]]
- [[_COMMUNITY_Tree Transform|Tree Transform]]
- [[_COMMUNITY_Fullscreen Listener|Fullscreen Listener]]
- [[_COMMUNITY_Tree Drag|Tree Drag]]
- [[_COMMUNITY_Toggle All Members|Toggle All Members]]
- [[_COMMUNITY_Toggle Fullscreen|Toggle Fullscreen]]
- [[_COMMUNITY_Toggle Tree Side|Toggle Tree Side]]
- [[_COMMUNITY_Tree Reset|Tree Reset]]
- [[_COMMUNITY_Tree Zoom|Tree Zoom]]
- [[_COMMUNITY_Build Layout|Build Layout]]
- [[_COMMUNITY_Node Connector Top|Node Connector Top]]
- [[_COMMUNITY_Row Layout|Row Layout]]
- [[_COMMUNITY_Tree Unit|Tree Unit]]
- [[_COMMUNITY_Unit Connector Bottom|Unit Connector Bottom]]
- [[_COMMUNITY_Unit Position|Unit Position]]
- [[_COMMUNITY_Render Nodes|Render Nodes]]
- [[_COMMUNITY_Active Hover Node|Active Hover Node]]
- [[_COMMUNITY_Active Spotlight|Active Spotlight]]
- [[_COMMUNITY_Touch Device|Touch Device]]
- [[_COMMUNITY_Tree State|Tree State]]
- [[_COMMUNITY_OG Image Route|OG Image Route]]
- [[_COMMUNITY_OG Static Paths|OG Static Paths]]
- [[_COMMUNITY_RSS Feed|RSS Feed]]
- [[_COMMUNITY_Milestones Page|Milestones Page]]
- [[_COMMUNITY_Family Branch Type|Family Branch Type]]
- [[_COMMUNITY_Branch Theme Type|Branch Theme Type]]
- [[_COMMUNITY_Family Tree Data Type|Family Tree Data Type]]
- [[_COMMUNITY_Milestone Type|Milestone Type]]
- [[_COMMUNITY_Milestone Category Type|Milestone Category Type]]
- [[_COMMUNITY_Sort Order Type|Sort Order Type]]
- [[_COMMUNITY_Format Milestone Date|Format Milestone Date]]
- [[_COMMUNITY_Get Milestone Age|Get Milestone Age]]
- [[_COMMUNITY_Emoji URL|Emoji URL]]
- [[_COMMUNITY_Reveal Observer|Reveal Observer]]
- [[_COMMUNITY_Slugify|Slugify]]

## God Nodes (most connected - your core abstractions)
1. `SIL Open Font License` - 6 edges
2. `The Name We Searched the World For` - 5 edges
3. `.github/workflows/deploy.yml` - 4 edges
4. `The Night You Came` - 4 edges
5. `Gursez` - 4 edges
6. `public/fonts/Cormorant_Garamond/README.txt` - 2 edges
7. `public/fonts/DM_Sans/README.txt` - 2 edges
8. `public/fonts/Pinyon_Script/OFL.txt` - 2 edges
9. `Graphify` - 2 edges
10. `Astro` - 2 edges

## Surprising Connections (you probably didn't know these)
- `public/image.png` --conceptually_related_to--> `Gursez`  [INFERRED]
  public/image.png → src/content/blog/the-name-we-searched-the-world-for.md
- `public/image.webp` --conceptually_related_to--> `Gursez`  [INFERRED]
  public/image.webp → src/content/blog/the-name-we-searched-the-world-for.md
- `The Name We Searched the World For` --semantically_similar_to--> `The Night You Came`  [INFERRED] [semantically similar]
  src/content/blog/the-name-we-searched-the-world-for.md → src/content/blog/the-night-you-came.md
- `Cormorant Garamond` --conceptually_related_to--> `SIL Open Font License`  [INFERRED]
  public/fonts/Cormorant_Garamond/README.txt → public/fonts/Cormorant_Garamond/OFL.txt
- `DM Sans` --conceptually_related_to--> `SIL Open Font License`  [INFERRED]
  public/fonts/DM_Sans/README.txt → public/fonts/Cormorant_Garamond/OFL.txt

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **CI/CD Deployment Pipeline** — deploy_yml, astro, github_pages, bun, github_actions [INFERRED 0.85]

## Communities (47 total, 42 thin omitted)

### Community 0 - "Baby Gursez Stories"
Cohesion: 0.22
Nodes (10): The Name We Searched the World For, The Night You Came, Fateme Moloodi, Gursez, Guru Granth Sahib, Hukamnama, public/image.png, public/image.webp (+2 more)

### Community 1 - "Typography & Font Licensing"
Cohesion: 0.43
Nodes (7): Cormorant Garamond, public/fonts/Cormorant_Garamond/README.txt, DM Sans, public/fonts/DM_Sans/README.txt, Pinyon Script, public/fonts/Pinyon_Script/OFL.txt, SIL Open Font License

### Community 2 - "CI/CD Deployment"
Cohesion: 0.50
Nodes (5): Astro, Bun, .github/workflows/deploy.yml, GitHub Actions, GitHub Pages

### Community 3 - "Graphify Agent Tools"
Cohesion: 0.67
Nodes (3): .agents/rules/graphify.md, .agents/workflows/graphify.md, Graphify

## Knowledge Gaps
- **54 isolated node(s):** `getStaticPaths`, `GET`, `GET`, `toggleBranchSpotlight`, `renderFamilyGrid` (+49 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 3 inferred relationships involving `SIL Open Font License` (e.g. with `Cormorant Garamond` and `DM Sans`) actually correct?**
  _`SIL Open Font License` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Gursez` (e.g. with `public/image.png` and `public/image.webp`) actually correct?**
  _`Gursez` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `getStaticPaths`, `GET`, `GET` to the rest of the system?**
  _54 weakly-connected nodes found - possible documentation gaps or missing edges._