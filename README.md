# Checkout Demo Library

A web framework for hosting checkout page simulations.

**🌐** : https://logantucker25.github.io/checkout-library/

## Quick Start

1. **Add demos**: Create folders in `/demos/` with an `index.html` file
2. **Build**: Run `npm run build` to generate the index page
3. **Deploy**: Push to GitHub for automatic hosting via Pages

## Commands

```bash
npm run build    # Generate index page
npm run dev      # Build and serve locally
```

## Demo Structure

```
demos/
├── my-demo/
│   ├── index.html    # Required entry point
│   ├── styles.css    # Optional assets
│   └── script.js     # Optional assets
```

## AI Generation Prompt pair

Add this text to any AI prompt to ensure generated checkout pages work with this library:

```
Create a complete checkout page demo as a folder structure. Requirements:
- Create a folder named after the demo (use kebab-case like "modern-checkout" or "simple-payment")
- Include an index.html file as the main entry point with complete HTML structure
- All CSS should be inline in <style> tags or in separate .css files
- All JavaScript should be inline in <script> tags or in separate .js files  
- Use relative paths for any assets (images, fonts, etc.)
- Make it a complete, self-contained demo that works when opened directly
- Include proper DOCTYPE, html, head, and body tags
- No external CDN dependencies - keep everything local
- The demo should be functional as a static HTML page
```