# Checkout Demo Library

A web-based hosting framework for AI-generated checkout page simulations. This system automatically hosts all demos placed in the project structure and provides a dynamic index page with links to each demo.

## Features

- **Automatic Demo Hosting**: Any folder placed in `/demos/` is automatically hosted
- **Dynamic Index Generation**: Auto-generated homepage listing all current demos
- **Broken Demo Handling**: System continues to function when individual demos are broken
- **Zero Configuration**: No manual setup required when adding/removing demos
- **GitHub Pages Deployment**: Automatic deployment via GitHub Actions

## Quick Start

1. Fork or clone this repository
2. Enable GitHub Pages in your repository settings (use GitHub Actions as source)
3. Add your demos to the `/demos/` directory
4. Push to the main branch
5. Your demos will be automatically deployed to `https://[username].github.io/checkout-library/`

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

- **Library Index**: `https://[username].github.io/checkout-library/`
- **Individual Demo**: `https://[username].github.io/checkout-library/demos/[demo-name]/`

## Build System

The build system (`build.js`) automatically:
- Scans the `/demos/` directory for all folders
- Validates each demo (checks for `index.html`)
- Generates an index page with links to all demos
- Marks broken demos with ❌ and working demos with ✅
- Continues functioning even if some demos are broken

## Local Development

To test the build system locally:

```bash
cd checkout-library
node build.js
```

This will generate the `index.html` file locally.

## Demo Requirements

### Minimum Requirements
- A folder in `/demos/`
- An `index.html` file as the entry point

### Best Practices
- Use relative links for navigation within your demo
- Keep all assets within your demo folder
- Test your demo locally before pushing
- Use semantic HTML for better accessibility

## Troubleshooting

### Demo Not Appearing
- Ensure your demo folder contains an `index.html` file
- Check that you've pushed your changes to the main branch
- Wait a few minutes for GitHub Actions to deploy

### Demo Marked as Broken
- Verify your `index.html` contains basic HTML structure
- Check for syntax errors in your HTML
- Ensure the file is named exactly `index.html` (case-sensitive)

## Technical Details

- **Platform**: GitHub Pages
- **Build Tool**: Node.js
- **CI/CD**: GitHub Actions
- **Requirements**: Static HTML/CSS/JS only (no server-side code)

## Contributing

1. Create your demo in the `/demos/` folder
2. Test locally using `node build.js`
3. Submit a pull request
4. Ensure your demo follows the structure requirements

## License

This project is open source. Feel free to use and modify as needed.