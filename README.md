# 🏔️ How to Build a Nature-Inspired Personal Portfolio Website

> A comprehensive, step-by-step guide to building a warm, calm, and elegant personal portfolio website inspired by the quiet beauty of mountains, oceans, and glaciers.

---

## 📸 Reference Layouts

| Nature Entrance | Hero Section |
|:---:|:---:|
| ![Nature Entrance](docs/screenshots/01_nature_entrance.png) | ![Hero Section](docs/screenshots/02_hero_section.png) |

| About Me Section | Works Showcase |
|:---:|:---:|
| ![About Me](docs/screenshots/03_about_me.png) | ![Works Showcase](docs/screenshots/04_works_showcase.png) |

| Contact Section | Mobile Navigation |
|:---:|:---:|
| ![Contact Section](docs/screenshots/05_contact.png) | ![Mobile Navigation](docs/screenshots/06_mobile_nav.png) |

---

## 📋 Table of Contents

- [Overview](#overview)
- [Design System & Theme](#-design-system--theme)
- [Project Structure](#-project-structure)
- [Step-by-Step Build Guide](#-step-by-step-build-guide)
  - [Phase 1: Project Setup](#phase-1-project-setup)
  - [Phase 2: Color Palette & Typography](#phase-2-color-palette--typography)
  - [Phase 3: Nature Entrance Experience](#phase-3-nature-entrance-experience)
  - [Phase 4: Serene Hero Section](#phase-4-serene-hero-section)
  - [Phase 5: Smooth Scrolling & Parallax Setup](#phase-5-smooth-scrolling--parallax-setup)
  - [Phase 6: About Me (Editorial Layout)](#phase-6-about-me-editorial-layout)
  - [Phase 7: Works Showcase (Masonry Grid)](#phase-7-works-showcase-masonry-grid)
  - [Phase 8: Contact Section](#phase-8-contact-section)
  - [Phase 9: Header & Responsive Navigation](#phase-9-header--responsive-navigation)
  - [Phase 10: Performance & Personal SEO](#phase-10-performance--personal-seo)
- [Key Libraries & Alternatives](#-key-libraries--alternatives)
- [Asset Recommendations](#-asset-recommendations)
- [Deployment](#-deployment)
- [Design Checklist](#-design-checklist)

---

## Overview

This guide details how to build a **Personal Non-Formal Portfolio** designed to feel authentic, calm, minimalist, and premium. By shifting away from industrial, futuristic, or dark sci-fi aesthetics, this layout prioritizes natural warmth and clean editorial design.

### Core Vibe
* **Natural**: Drawing beauty from organic forms and quiet landscapes.
* **Calm**: Gentle transitions, spacious padding, and slow scroll animations.
* **Elegant**: Classic editorial typography paired with a warm, off-white background.
* **Explorative**: Interactive elements that reward gentle curiosity (e.g., hover zooms, parallax depth).

---

## 🎨 Design System & Theme

The website is styled around three natural themes: **Pegunungan (Mountains)**, **Lautan (Oceans)**, and **Es/Glacier (Ice)**.

### Color Palette

| Color | Hex | Role | Vibe |
|-------|-----|------|------|
| **Warm Off-White** | `#F5F3EE` | Primary Background | Clean, organic, warm, and easy on the eyes |
| **Text Primary** | `#2E2E2E` | Body & Headings | Charcoal-black, softer than pure black |
| **Muted Text** | `#6F6F6F` | Secondary Text / Dates | Soft grey for readability and hierarchy |
| **Forest Accent** | `#5D6B57` | Sage / Mountain Accent | Natural green for mountain/forest highlights |
| **Ocean Accent** | `#6B8CA3` | Slate Blue / Water Accent | Deep, calm blue for marine sections |
| **Ice Accent** | `#DCE7EE` | Glacier Blue / Sky Accent | Cool, bright highlight color |

### Typography

* **Headings (`h1`, `h2`, `h3`, Navigation)**: **Playfair Display**
  * *Vibe*: Elegant, literary, editorial, and high-contrast.
* **Body Text (`p`, Buttons, Contacts, Captions)**: **Lato**
  * *Vibe*: Clean, highly readable, friendly, and contemporary.

---

## 📁 Project Structure

```
personal-portfolio/
├── index.html                    # Single-page home entry point
├── css/
│   ├── style.css                 # Color tokens, typography, layout
│   ├── plugins.css               # Lightbox & scrolling vendor styles
│   ├── lenis.css                 # Smooth scrolling wrapper styles
│   └── media.css                 # Clean responsive media queries
├── js/
│   ├── scripts.js                # Core scroll triggers, entrance animations
│   ├── gsap.min.js               # GSAP Core
│   ├── ScrollTrigger.min.js      # GSAP scroll animations
│   ├── SplitText.min.js          # GSAP text line splitter
│   ├── lenis.min.js              # Smooth scrolling utility
│   ├── simpleParallax.min.js     # Natural parallax movements
│   └── fancybox.js               # Interactive lightbox popup
├── fonts/
│   ├── PlayfairDisplay-Regular.woff2
│   ├── PlayfairDisplay-Italic.woff2
│   └── Lato-Regular.woff2
├── img/
│   ├── portrait.jpg              # Professional yet non-formal profile photo
│   ├── mist-overlay.png          # Texturized misty element for entrance
│   ├── mountain-silhouette.svg   # Multi-layered vector mountain shapes
│   ├── items/                    # Grid gallery images
│   │   ├── project-01.jpg
│   │   ├── project-02.jpg
│   │   └── ...
│   └── icons/
│       └── social/
└── video/
    ├── ambient-clouds.mp4        # Slow moving clouds for hero background
    └── ocean-wave.mp4            # Gentle tide video for works background
```

---

## 🚀 Step-by-Step Build Guide

### Phase 1: Project Setup

#### 1.1 Create the HTML Boilerplate
Prepare your main entry file, pointing directly to the required layout sheets and local web fonts.

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Nama Anda — Personal Portfolio</title>
    
    <!-- Preload fonts to avoid layout shift -->
    <link rel="preload" href="fonts/PlayfairDisplay-Regular.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="fonts/Lato-Regular.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- CSS Dependencies -->
    <link rel="stylesheet" href="css/plugins.css">
    <link rel="stylesheet" href="css/lenis.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/media.css">
</head>
<body>
    <!-- Interactive elements will render here -->

    <!-- Core Scripts -->
    <script src="js/gsap.min.js"></script>
    <script src="js/ScrollTrigger.min.js"></script>
    <script src="js/SplitText.min.js"></script>
    <script src="js/lenis.min.js"></script>
    <script src="js/simpleParallax.min.js"></script>
    <script src="js/fancybox.js"></script>
    <script src="js/scripts.js"></script>
</body>
</html>
```

---

### Phase 2: Color Palette & Typography

Define color variables, font faces, and base typographic rules in `css/style.css`.

```css
/* ==========================================================================
   css/style.css — Design System Tokens
   ========================================================================== */

/* --- Custom Font Declarations --- */
@font-face {
    font-family: 'Playfair Display';
    src: url('../fonts/PlayfairDisplay-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Playfair Display';
    src: url('../fonts/PlayfairDisplay-Italic.woff2') format('woff2');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Lato';
    src: url('../fonts/Lato-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

/* --- Global Theme Variables --- */
:root {
    /* Nature-Inspired Color Scheme */
