const puppeteer = require('puppeteer');
const fs = require('fs')

// const url = process.argv[2];
const url = "https://myovt.apple.com"

// Load token
var TOKEN = fs.readFileSync("./token.txt").toString();

// console.log(TOKEN)

if (!url) {
  throw "Please provide URL as a first argument";
}
async function run (token_input) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  console.log(token_input)

  const cookies = [{
    'name': 'acack',
    'value': token_input
  }]

  await page.setCookie(...cookies);
  const cookiesSet = await page.cookies(url);
  // console.log(JSON.stringify(cookiesSet));

  await page.screenshot({path: 'screenshot.png'});
  browser.close();
}
run(TOKEN);