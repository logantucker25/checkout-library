# Checkout Demo Library

A web framework for hosting AI-generated checkout page simulations.

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

That's it! The system automatically detects, validates, and hosts all demos.