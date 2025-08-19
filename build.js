const fs = require('fs');
const path = require('path');

function scanDemosDirectory() {
  const demosPath = path.join(__dirname, 'demos');
  
  if (!fs.existsSync(demosPath)) {
    console.log('Creating demos directory...');
    fs.mkdirSync(demosPath, { recursive: true });
    return [];
  }
  
  try {
    return fs.readdirSync(demosPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  } catch (error) {
    console.error('Error reading demos directory:', error);
    return [];
  }
}

function validateDemo(demoName) {
  const demoPath = path.join(__dirname, 'demos', demoName);
  const indexPath = path.join(demoPath, 'index.html');
  
  const result = {
    name: demoName,
    path: `./demos/${demoName}/`,
    status: 'broken',
    error: null
  };
  
  try {
    if (!fs.existsSync(indexPath)) {
      result.error = 'Missing index.html';
      return result;
    }
    
    const content = fs.readFileSync(indexPath, 'utf8');
    
    if (content.trim().length === 0) {
      result.error = 'Empty index.html';
      return result;
    }
    
    if (!content.toLowerCase().includes('<html') && !content.toLowerCase().includes('<!doctype')) {
      result.error = 'Invalid HTML structure';
      return result;
    }
    
    result.status = 'working';
    result.error = null;
    
  } catch (error) {
    result.error = error.message;
  }
  
  return result;
}

function generateIndexPage(demoStatuses) {
  const workingDemos = demoStatuses.filter(demo => demo.status === 'working');
  const brokenDemos = demoStatuses.filter(demo => demo.status === 'broken');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout Demo Library</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem 1rem;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 3rem 2rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }
        
        h1 {
            text-align: center;
            color: #2c3e50;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .subtitle {
            text-align: center;
            color: #7f8c8d;
            font-size: 1.1rem;
            margin-bottom: 3rem;
            font-weight: 300;
        }
        
        .stats {
            text-align: center;
            margin-bottom: 2rem;
            font-size: 0.8rem;
            color: #7f8c8d;
        }
        
        .demos-section {
            margin-bottom: 2rem;
        }
        
        .section-title {
            font-size: 1.3rem;
            color: #2c3e50;
            margin-bottom: 1.5rem;
            font-weight: 600;
        }
        
        .demo-grid {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .demo-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
        }
        
        .demo-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2);
        }
        
        .demo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
            border-color: #667eea;
        }
        
        .demo-card.broken {
            opacity: 0.7;
            background: #f8f9fa;
        }
        
        .demo-card.broken::before {
            background: #e74c3c;
        }
        
        .demo-name {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #2c3e50;
        }
        
        .demo-path {
            font-size: 0.9rem;
            color: #7f8c8d;
            font-family: 'Monaco', 'Menlo', monospace;
            background: #f8f9fa;
            padding: 0.3rem 0.6rem;
            border-radius: 6px;
            margin-bottom: 0.5rem;
        }
        
        .demo-error {
            font-size: 0.8rem;
            color: #e74c3c;
            font-style: italic;
            margin-top: 0.5rem;
        }
        
        .empty-state {
            text-align: center;
            padding: 3rem 1rem;
            color: #7f8c8d;
        }
        
        .empty-state h3 {
            margin-bottom: 1rem;
            color: #2c3e50;
        }
        
        .footer {
            text-align: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #ecf0f1;
            color: #7f8c8d;
            font-size: 0.9rem;
        }
        
        @media (max-width: 600px) {
            .container {
                padding: 2rem 1rem;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            .stats {
                text-align: center;
            }
            
            .demo-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Checkout Demo Library</h1>
        
        <div class="stats">
            ${demoStatuses.length} total • ${workingDemos.length} working • ${brokenDemos.length} broken
        </div>
        
        ${workingDemos.length > 0 ? `
        <div class="demos-section">
            <h2 class="section-title">Working Demos</h2>
            <div class="demo-grid">
                ${workingDemos.map(demo => `
                <a href="${demo.path}" class="demo-card">
                    <div class="demo-name">
                        ${demo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div class="demo-path">${demo.path}</div>
                </a>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        ${brokenDemos.length > 0 ? `
        <div class="demos-section">
            <h2 class="section-title">Broken Demos</h2>
            <div class="demo-grid">
                ${brokenDemos.map(demo => `
                <div class="demo-card broken">
                    <div class="demo-name">
                        ${demo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div class="demo-path">${demo.path}</div>
                    ${demo.error ? `<div class="demo-error">Error: ${demo.error}</div>` : ''}
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        ${demoStatuses.length === 0 ? `
        <div class="empty-state">
            <h3>No Demos Found</h3>
            <p>Add demos to the <code>/demos</code> directory to get started!</p>
            <p>Each demo should have an <code>index.html</code> file as its entry point.</p>
        </div>
        ` : ''}
        
        <div class="footer">
        </div>
    </div>
</body>
</html>`;
}

function buildIndex() {
  console.log('🔍 Scanning for demos...');
  const demos = scanDemosDirectory();
  console.log(`📁 Found ${demos.length} demo directories`);
  
  console.log('✅ Validating demos...');
  const demoStatuses = demos.map(validateDemo);
  
  const workingCount = demoStatuses.filter(d => d.status === 'working').length;
  const brokenCount = demoStatuses.filter(d => d.status === 'broken').length;
  
  console.log(`✅ ${workingCount} working demos`);
  console.log(`❌ ${brokenCount} broken demos`);
  
  if (brokenCount > 0) {
    console.log('\nBroken demos:');
    demoStatuses
      .filter(d => d.status === 'broken')
      .forEach(demo => console.log(`  - ${demo.name}: ${demo.error}`));
  }
  
  console.log('📝 Generating index page...');
  const indexHTML = generateIndexPage(demoStatuses);
  
  try {
    fs.writeFileSync(path.join(__dirname, 'index.html'), indexHTML);
    console.log('🎉 Index page generated successfully!');
  } catch (error) {
    console.error('❌ Error writing index.html:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  buildIndex();
}

module.exports = { buildIndex, scanDemosDirectory, validateDemo, generateIndexPage };