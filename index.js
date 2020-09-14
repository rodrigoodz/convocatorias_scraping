//require
const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

(async () => {
  try {
    //entramos a la pagina mediante puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(
      "http://fich.unl.edu.ar/pagina/convocatorias-rentadas/518/"
    );
    const body = await response.text();

    // 'parseamos' con JSDOM
    const { document } = new JSDOM(body).window;

    //extraigo lo que necesito
    document.querySelectorAll("#inner-content").forEach((element) => {
      console.log(element.textContent);
    });

    await browser.close();
  } catch (error) {
    console.error("ERROR! ", error);
  }
})();
