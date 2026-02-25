import { test, expect } from "@playwright/test";
import { ButtonsPage } from "../../demoqa-pages/elements/buttons.page";
import { HomePage } from "../../demoqa-pages/home.page";
let homepage:HomePage;
let buttonpage:ButtonsPage;

test.describe("@demoqa @button test suit", () => {
  test.beforeEach(async ({ page }) => {
    homepage=new HomePage(page)
    await homepage.start();
    await homepage.openElementsPage();
    buttonpage=new ButtonsPage(page);
    await buttonpage.goToElementsButton();

  });


  test.afterEach(async ({ page }) => {
   //await browser.close();
  });

  test("Test double click", async ({ page }) => {
    await buttonpage.doubleClickAndCheck();
  });

  test("Test right click", async ({ page }) => {
    await buttonpage.rightClickAndCheck();
  });
  test("Test click", async ({ page }) => {
    await buttonpage.clickAndCheck();
  });
});


