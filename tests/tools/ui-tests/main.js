const puppeteer = require("puppeteer");
const testPaths = require('./tests');

const server = "http://localhost:8888/";
const app = "examples/mobile/UIComponents/";
const appUrl = server + app;

const deviceViewport = {
	width: 360,
	height: 640,
	deviceScaleFactor: 1,
	isMobile: true,
	hasTouch: true
};
const fileHtmlRegexp = /[^\/]+$/;

function getPageName(url) {
	return url.match(fileHtmlRegexp)[0];
}
function replaceToPng(fileNameHtml) {
	return fileNameHtml.replace(/\.html$/, '.png');
}

const run = async () => {
	
	console.log(testPaths);
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.setViewport(deviceViewport);

	for (let i = 0, l = testPaths.length; i < l; i++) {
		let testPath = testPaths[i];
		let fileNamePng = replaceToPng(getPageName(testPath));

		await page.goto(appUrl + testPath);
		await page.screenshot({path: "screenshots/" + fileNamePng});
	}

	await browser.close();
};


run();