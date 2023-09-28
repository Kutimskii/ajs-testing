import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:8080";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 50,
      devtools: false, // show devTools
    });
    page = await browser.newPage();
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  });
  test("invalid", async () => {
    await page.goto(baseUrl);
    const input = await page.$("input");
    const btn = await page.$("button");
    await input.type("12357847523695414");
    await btn.click();
    await page.$("input.invalid");
  });
  test("should add do something", async () => {
    await page.goto(baseUrl);
    await page.waitForSelector("body");
  });
  test("valid master-card", async () => {
    await page.goto(baseUrl);
    const input = await page.$("input");
    const btn = await page.$("button");
    await input.type("5555555555554444");
    await btn.click();
    await page.$("master-card.active");
  });
  test("valid visa", async () => {
    await page.goto(baseUrl);
    const input = await page.$("input");
    const btn = await page.$("button");
    await input.type("4539283476916568");
    await btn.click();
    await page.$("visa.active");
  });
  test("valid mir", async () => {
    await page.goto(baseUrl);
    const input = await page.$("input");
    const btn = await page.$("button");
    await input.type("2200000000000038");
    await btn.click();
    await page.$("mir.active");
  });
  afterAll(async () => {
    await browser.close();
    await server.kill();
  });
});
