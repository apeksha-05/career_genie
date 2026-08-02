const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting puppeteer to check frontend at http://localhost:5173...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`PAGE ERROR: ${msg.text()}`);
    } else {
      // console.log(`PAGE LOG: ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`UNCAUGHT ERROR: ${error.message}`);
    console.log(`STACK: ${error.stack}`);
  });

  page.on('requestfailed', request => {
    console.log(`REQUEST FAILED: ${request.url()} - ${request.failure()?.errorText}`);
  });

  try {
    await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully. Checking for errors in DOM...');
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(`Body text snippet: ${bodyText.substring(0, 100)}`);
  } catch (err) {
    console.error('Failed to load page:', err);
  }

  await browser.close();
})();
