const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('index.html', () => {
  let dom;
  let content;

  beforeAll(() => {
    // Load the HTML file into a test DOM
    const htmlPath = path.join(__dirname, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    dom = new JSDOM(html, { runScripts: 'dangerously' });

    // Load the CSS file into the test DOM
    const cssPath = path.join(__dirname, 'style.css');
    const css = fs.readFileSync(cssPath, 'utf8');
    const styleEl = dom.window.document.createElement('style');
    styleEl.innerHTML = css;
    dom.window.document.head.appendChild(styleEl);

    // Load the JavaScript file into the test DOM
    const jsPath = path.join(__dirname, 'app.js');
    const js = fs.readFileSync(jsPath, 'utf8');
    const scriptEl = dom.window.document.createElement('app');
    scriptEl.innerHTML = js;
    dom.window.document.body.appendChild(scriptEl);

    // Get the content of the body element
    content = dom.window.document.body.innerHTML;
  });

  test('test_case1', () => {
    // Check that the expected content is present
    expect(content).toContain('function countBmi()');
  });
});