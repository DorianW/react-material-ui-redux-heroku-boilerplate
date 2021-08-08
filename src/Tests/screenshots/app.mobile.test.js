import { toMatchImageSnapshot } from 'jest-image-snapshot';
const puppeteer = require('puppeteer');
expect.extend({ toMatchImageSnapshot });

const viewPortSettings = { width: 375, height: 812 };
let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport(viewPortSettings);
});

it('Dashboard', async (done) => {
    await page.goto('http://localhost:3000');
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot();
    done();
}, 60000)

it('Room Detailed', async (done) => {
    await page.goto('http://localhost:3000/raum/1');
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot();
    done();
}, 60000)

it('Settings', async (done) => {
    await page.goto('http://localhost:3000/konfiguration');
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot();
    done();
}, 60000)

it('Operatioon mode', async (done) => {
    await page.goto('http://localhost:3000/konfiguration/betriebsart');
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot();
    done();
}, 60000)

it('Drinkwater', async (done) => {
    await page.goto('http://localhost:3000/konfiguration/trinkwasser');
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot();
    done();
}, 60000)

it('Vacation', async (done) => {
    await page.goto('http://localhost:3000/konfiguration/urlaub');
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot();
    done();
}, 60000)

it('Vacation Edit', async (done) => {
    await page.goto('http://localhost:3000/konfiguration/urlaub/1');
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot();
    done();
}, 60000)