# Hi there! Welcome to My Digital Garden 🌱

Welcome to the source code of my personal portfolio. More than just a resume, this website is designed to be a digital reflection of who I am—blending my professional work as a developer with my deep appreciation for nature, exploration, and minimalist design.

## ⛰️ The Concept & Design Philosophy

The internet can often feel loud, cluttered, and overwhelming. I wanted my corner of the web to feel different. Inspired by the quiet beauty of mountains and oceans, this portfolio is built around a few core principles:

- **Calm & Natural**: Utilizing an earthy color palette (warm off-whites, sage greens, and slate blues) to create a relaxed reading experience.
- **Fluid & Breathing**: Implementing buttery-smooth scroll mechanics and gentle reveal animations so the interface feels alive, not rigid.
- **Editorial Elegance**: Pairing classic serif fonts (*Playfair Display*) with clean sans-serifs (*Lato*) for a premium, magazine-like aesthetic.

## 🛠️ Under the Hood

While the design is focused on aesthetics, the codebase is engineered for performance and modern web standards. Here’s what powers the experience:

- **Ultra-Fast Delivery**: Built with **Vite**, stripping away unnecessary bloat. All heavy image assets (like my high-res mountaineering gallery) have been heavily compressed into **WebP** formats, reducing payload sizes by up to 80% without sacrificing quality.
- **Cinematic Animations**: Powered by **GSAP** (GreenSock). Instead of harsh static jumps, elements gracefully slide, fade, and stagger into view as you scroll.
- **Smooth Scrolling**: Integrated **Lenis** to override the browser's clunky default scroll, replacing it with a fluid, momentum-based scrolling experience.
- **Interactive Galleries**: The *Hobbies* section utilizes **Fancybox** for a seamless, zoomable masonry-style gallery.
- **Serverless Contact Form**: The "Thoughts & Suggestions" section uses **Web3Forms** to securely handle messages without needing a backend database.

## 🗂️ Exploring the Code

Feel free to poke around the repository! If you're a developer looking for inspiration, here are a few interesting areas you might want to check out:
- `js/main.js`: Where all the GSAP ScrollTriggers and Lenis smooth scrolling logic are orchestrated.
- `css/hobbies.css`: The styling behind the interactive, tab-based gallery layout for my personal interests.
- `index.html` & `hobbies.html`: The semantic HTML structure connecting it all together.

---

*Thanks for stopping by! Whether you're a recruiter, a fellow developer, or just someone who stumbled across this repo, I hope you enjoy the experience.*
