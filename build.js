import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEMOS_DIR = path.join(__dirname, 'demos');
const INDEX_FILE = path.join(__dirname, 'index.html');

async function scanDemosDirectory() {
    try {
        const entries = await fs.readdir(DEMOS_DIR, { withFileTypes: true });
        return entries
            .filter(entry => entry.isDirectory())
            .map(entry => entry.name);
    } catch (error) {
        console.log('No demos directory found, creating one...');
        await fs.mkdir(DEMOS_DIR, { recursive: true });
        return [];
    }
}

async function validateDemo(demoName) {
    const demoPath = path.join(DEMOS_DIR, demoName);
    const indexPath = path.join(demoPath, 'index.html');
    
    try {
        const stats = await fs.stat(indexPath);
        if (!stats.isFile()) {
            return {
                name: demoName,
                path: `./demos/${demoName}/`,
                status: 'broken',
                error: 'index.html is not a file'
            };
        }
        
        const content = await fs.readFile(indexPath, 'utf8');
        
        const hasHtmlTag = /<html/i.test(content);
        const hasBodyTag = /<body/i.test(content);
        const hasClosingTags = /<\/html>/i.test(content);
        
        if (hasHtmlTag || hasBodyTag || hasClosingTags) {
            return {
                name: demoName,
                path: `./demos/${demoName}/`,
                status: 'working',
                error: null
            };
        } else {
            return {
                name: demoName,
                path: `./demos/${demoName}/`,
                status: 'broken',
                error: 'Missing basic HTML structure'
            };
        }
    } catch (error) {
        return {
            name: demoName,
            path: `./demos/${demoName}/`,
            status: 'broken',
            error: error.message || 'Missing index.html'
        };
    }
}

async function validateDemos(demoNames) {
    const validationPromises = demoNames.map(name => validateDemo(name));
    return Promise.all(validationPromises);
}

function generateIndexPage(demoStatuses) {
    const demoListItems = demoStatuses
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(demo => {
            const statusIcon = demo.status === 'working' ? '✅' : '❌';
            const errorInfo = demo.error ? ` (${demo.error})` : '';
            const displayName = demo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            return `        <li>
            <a href="${demo.path}">${displayName}</a> ${statusIcon}${errorInfo}
        </li>`;
        })
        .join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout Demo Library</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background: white;
            margin: 10px 0;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        li:hover {
            transform: translateX(5px);
            box-shadow: 0 3px 8px rgba(0,0,0,0.15);
        }
        a {
            color: #3498db;
            text-decoration: none;
            font-weight: 500;
        }
        a:hover {
            text-decoration: underline;
        }
        .stats {
            margin-top: 30px;
            padding: 15px;
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .stats p {
            margin: 5px 0;
        }
        .generated {
            text-align: center;
            color: #7f8c8d;
            font-size: 0.9em;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <h1>Checkout Demo Library</h1>
    
    ${demoStatuses.length === 0 ? '<p>No demos found. Add demos to the /demos directory.</p>' : ''}
    
    <ul>
${demoListItems}
    </ul>
    
    <div class="stats">
        <p><strong>Total Demos:</strong> ${demoStatuses.length}</p>
        <p><strong>Working:</strong> ${demoStatuses.filter(d => d.status === 'working').length} ✅</p>
        <p><strong>Broken:</strong> ${demoStatuses.filter(d => d.status === 'broken').length} ❌</p>
    </div>
    
    <p class="generated">Generated on ${new Date().toLocaleString()}</p>
</body>
</html>`;

    return html;
}

async function writeIndexFile(content) {
    await fs.writeFile(INDEX_FILE, content, 'utf8');
}

async function buildIndex() {
    console.log('🚀 Starting build process...');
    
    try {
        console.log('📁 Scanning demos directory...');
        const demos = await scanDemosDirectory();
        console.log(`Found ${demos.length} demo(s)`);
        
        console.log('🔍 Validating demos...');
        const demoStatuses = await validateDemos(demos);
        
        const workingCount = demoStatuses.filter(d => d.status === 'working').length;
        const brokenCount = demoStatuses.filter(d => d.status === 'broken').length;
        console.log(`✅ Working: ${workingCount}, ❌ Broken: ${brokenCount}`);
        
        console.log('📝 Generating index page...');
        const indexHTML = generateIndexPage(demoStatuses);
        
        console.log('💾 Writing index.html...');
        await writeIndexFile(indexHTML);
        
        console.log('✨ Build complete!');
        console.log(`Index page generated at: ${INDEX_FILE}`);
    } catch (error) {
        console.error('❌ Build failed:', error);
        console.log('Generating fallback index page...');
        
        const fallbackHTML = generateIndexPage([]);
        await writeIndexFile(fallbackHTML);
        
        console.log('Fallback index page created');
        process.exit(1);
    }
}

buildIndex();