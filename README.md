# Aadhaar-Pulse

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=flat&logo=next.js)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Status](https://img.shields.io/badge/status-production-brightgreen.svg)]()
[![Build](https://img.shields.io/github/actions/workflow/status/Vinaycoder153/Aadhaar-Pulse/ci.yml?branch=main)]()
[![Coverage](https://img.shields.io/badge/coverage-—%25-lightgrey.svg)]()

<!-- Hero -->
<p align="center">
  <img src="./public/assets/hero.png" alt="Aadhaar-Pulse — hero" width="100%" style="max-width:900px;border-radius:12px;box-shadow:0 8px 24px rgba(16,24,40,.12)"/>
</p>

Aadhaar-Pulse — secure Aadhaar-linked authentication & real-time monitoring dashboards built with Next.js (App Router) and TypeScript.

Live demo: <https://your-deployment-url.example> · Docs: docs/

Why this README focuses on attractive visuals
- Visuals accelerate understanding for maintainers and stakeholders.
- A compelling hero, animated demo, and clean gallery improve conversion for demos and PRs.
- This README includes examples and guidance so you can add polished images/GIFs quickly.

Quick visual highlights
- Animated demo: ./public/assets/demo.gif
- Screenshots: ./docs/screenshots/*.png
- Architecture diagram: ./docs/architecture/architecture.png

Animated demo (inline)
<p align="center">
  <img src="./public/assets/demo.gif" alt="Aadhaar-Pulse demo" style="max-width:720px;border-radius:8px;box-shadow:0 8px 32px rgba(2,6,23,0.08)"/>
</p>

Visual gallery
<p align="center">
  <img src="./docs/screenshots/homepage.png" alt="Homepage" width="320" style="margin:6px;border-radius:8px; box-shadow: 0 6px 18px rgba(2,6,23,0.06)"/>
  <img src="./docs/screenshots/dashboard.png" alt="Dashboard" width="320" style="margin:6px;border-radius:8px; box-shadow: 0 6px 18px rgba(2,6,23,0.06)"/>
  <img src="./docs/screenshots/mobile.png" alt="Mobile view" width="160" style="margin:6px;border-radius:8px; box-shadow: 0 6px 18px rgba(2,6,23,0.06)"/>
</p>

Architecture snapshot
<p align="center">
  <img src="./docs/architecture/architecture.png" alt="Architecture diagram" width="820" style="max-width:100%;border-radius:8px;box-shadow:0 8px 28px rgba(2,6,23,.08)"/>
</p>

How visuals are organized (recommended)
- public/assets/hero.png — high-res hero banner (900×360 px)
- public/assets/demo.gif — short animated demo (6–12s, optimized)
- docs/screenshots/ — high-quality PNG screenshots (up to 1280×720)
- docs/architecture/architecture.png — diagram exported from Figma/diagrams.net
- README links reference these relative paths so GitHub renders them automatically

Tips to create polished visuals
- Hero image
  - Use a simple gradient, device mockup and one-line tagline.
  - Recommended size: 1600×640 (export at 2x, then reduce to 900×360 for README).
- GIF demo
  - Keep it short (6–12s), 10–15 FPS, and crop to the content.
  - Prefer looping, muted, and annotated with a small caption overlay.
- Screenshots
  - Use consistent device mockups and spacing.
  - Include one mobile and one desktop screenshot.
- Architecture diagram
  - Keep it simple and readable at small sizes — use larger fonts and colors with high contrast.

Optimization commands (examples)
- Resize/optimize hero PNG with ImageMagick:
  ```bash
  magick input.png -resize 900x360 -strip -quality 85 public/assets/hero.png
  ```
- Create an optimized GIF from a video (ffmpeg + gifsicle):
  ```bash
  # Create palette
  ffmpeg -y -i demo.mp4 -vf "fps=12,scale=720:-1:flags=lanczos,palettegen" palette.png
  # Create GIF using palette
  ffmpeg -i demo.mp4 -i palette.png -filter_complex "fps=12,scale=720:-1:flags=lanczos[x];[x][1:v]paletteuse" demo.gif
  # Further optimize
  gifsicle -O3 --colors 128 demo.gif -o public/assets/demo.gif
  ```
- Convert PNG to WebP for smaller builds (optionally keep PNG for GitHub compatibility):
  ```bash
  cwebp -q 80 docs/screenshots/homepage.png -o docs/screenshots/homepage.webp
  ```

Embedding an MP4 video (for GitHub Releases or site)
```html
<video controls muted loop playsinline style="max-width:100%;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.08)">
  <source src="/public/assets/demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

Accessibility & performance
- Always add descriptive alt text.
- Prefer PNG/WebP for screenshots; GIF only for short demos.
- Provide a text summary below each visual for screen readers and SEO.
- Keep README image sizes < 300 KB where possible to speed load.

Design sources and tools
- Figma / Sketch / Adobe XD — for high-fidelity screens and export
- diagrams.net / Lucidchart — architecture diagrams
- ImageMagick, ffmpeg, gifsicle, cwebp — optimization pipeline
- Device mockups: use simple rounded rectangles or free mockup PNGs

What I changed here and what's next
- I added a visual-first README layout with hero, GIF demo, screenshot gallery, and architecture diagram placeholders, and included concrete file paths and optimization commands.
- Next, add the actual assets into the repository at:
  - public/assets/hero.png
  - public/assets/demo.gif (and/or demo.mp4)
  - docs/screenshots/*.png
  - docs/architecture/architecture.png
- If you want, I can:
  - create an optimized demo GIF from a video you upload, or
  - generate hero and screenshot mockups (tell me preferred colors, tagline, and key screens).

Contributing, license, and other standard sections
- See full README in repository for setup, env vars, testing, CI, and contribution guidelines.

License
- MIT — see LICENSE

Maintainer
- Vinaycoder153 · https://github.com/Vinaycoder153
