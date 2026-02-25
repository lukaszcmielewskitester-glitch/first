import { test } from "@playwright/test";
import { PracticeFormPage, PracticeForm } from "../../demoqa-pages/forms/practice-form.page";
import { HomePage } from "../../demoqa-pages/home.page";
import { faker } from "@faker-js/faker";
import { getRandomPastDate } from "../../tool/dateformat";
let homepage: HomePage;
let practicleformpage: PracticeFormPage;
const practicleformData:PracticeForm={
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  gender: "Male",
  mobile: generatePhoneNumber(),
  dateOfBirthAsDate: getRandomPastDate(),
  sportHobby: true,
  musicHobby: false,
  currentAddress: faker.location.streetAddress()
}
test.describe("@demoqa @PracticeForm test suit", () => {
  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    await homepage.start();
    await homepage.openElementsPage();
    practicleformpage = new PracticeFormPage(page);
    await practicleformpage.goToFormsPracticleform();
  });

  test.afterEach(async ({ page }) => {
    //await browser.close();
  });

  test("Test Practice Form", async ({ page }) => {
    await practicleformpage.completePraccticeForm(practicleformData)
    await practicleformpage.sendForm()
    await practicleformpage.checkResultModal(practicleformData)
  });
});


function generatePhoneNumber(): string {
  let phone = "";
  for (let i = 0; i < 10; i++) {
    phone += Math.floor(Math.random() * 10).toString();
  }
  return phone;
}

