import { test, expect } from "@playwright/test";
import {
  TextBoxPage,
  TextBoxForm,
} from "../../demoqa-pages/elements/text-box.page";
import { HomePage } from "../../demoqa-pages/home.page";
import { faker } from "@faker-js/faker";
let homepage: HomePage;
let textBoxPage: TextBoxPage;
let testData: TextBoxForm[] = [
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
  },
  {
    name: faker.person.fullName(),
    permanentAddress: faker.location.streetAddress(),
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  },
  {
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
];

test.describe("@demoqa @textbox test suit", () => {
  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    await homepage.start();
    await homepage.openElementsPage();
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.goToElementsoTextbox();
  });
  testData.forEach((data, index) => {
    test("Test complete text box "+index, async ({ page }) => {
      await textBoxPage.fillForm(data);
      await textBoxPage.send();
      await textBoxPage.expectResult(data);
    });
  });
});
