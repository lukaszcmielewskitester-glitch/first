import { test } from '@playwright/test';
import { LinksPage } from '../../demoqa-pages/elements/links.page';
import { HomePage } from "../../demoqa-pages/home.page";
let homepage:HomePage;
let linkpage:LinksPage;

let LinkKey = [
  "created",
  "nocontent",
  "moved",
  "badrequest",
  "unauthorized",
  "forbidden",
  "notfound",
];
test.describe("@demoqa @links test suit", () => {
  test.beforeEach(async ({ page }) => {
    homepage=new HomePage(page)
    await homepage.start();
    await homepage.openElementsPage();
    linkpage=new LinksPage(page);
    await linkpage.goToElementsLinks();

  });


  test.afterEach(async ({ page }) => {
   //await browser.close();
  });

  LinkKey.forEach((link)=>{
    test("Test click on nocontent link: "+link, async ({ page, baseURL }) => {
   await linkpage.clickAndAssertLink( link, baseURL);
  });
});
});