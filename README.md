# Checkout Demo Library

A web-based hosting framework for checkout page simulations.

## Features

- **Automatic Demo Hosting**: Any folder placed in `/demos/` is automatically hosted
- **Dynamic Index Generation**: Auto-generated homepage listing all current demos
- **Broken Demo Handling**: System continues to function when individual demos are broken
- **Zero Configuration**: No manual setup required when adding/removing demos
- **GitHub Pages Deployment**: Automatic deployment via GitHub Actions

Your demos will be automatically deployed to `https://logantucker25.github.io/checkout-library/`

## Adding New Demos

1. Create a new folder in `/demos/` (e.g., `/demos/my-new-demo/`)
2. Add an `index.html` file as the entry point
3. Add any additional HTML files, CSS, JavaScript, or assets
4. Commit and push to the main branch
5. The demo will automatically appear in the library index

### Demo Structure Example

```
demos/
└── my-demo/
    ├── index.html       # Required: Entry point
    ├── page2.html       # Optional: Additional pages
    ├── styles.css       # Optional: Styling
    ├── script.js        # Optional: JavaScript
    └── assets/          # Optional: Images, fonts, etc.
        └── logo.png
```

## URL Structure

- **Library Index**: `https://logantucker25.github.io/checkout-library/`
- **Individual Demo**: `https://logantucker25.github.io/checkout-library/demos/[demo-name]/`

## Build System

The build system (`build.js`) automatically:
- Scans the `/demos/` directory for all folders
- Validates each demo (checks for `index.html`)
- Generates an index page with links to all demos
- Marks broken demos with ❌ and working demos with ✅

## Local Development

To test the build system locally:

```bash
node build.js
```

### Best Practices
- Use relative links for navigation within your demo
- Keep all assets within your demo folder
- Test your demo locally before pushing
- Use semantic HTML for better accessibility

## Troubleshooting

### Demo Marked as Broken
- Verify your `index.html` contains basic HTML structure
- Check for syntax errors in your HTML
- Ensure the file is named exactly `index.html` (case-sensitive)

## Technical Details

- **Platform**: GitHub Pages
- **Build Tool**: Node.js
- **CI/CD**: GitHub Actions
- **Requirements**: Static HTML/CSS/JS only (no server-side code)