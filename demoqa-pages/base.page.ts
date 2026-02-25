import { test, expect, Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";
import { RadioButtonPage } from "./elements/radio-button.page";

export  class BasePageABS {
  protected readonly page: Page;
  readonly mainHeader: Locator;
  readonly menu: any;
  constructor(page: Page) {
    this.page = page;
    this.mainHeader = this.page.locator(".main-header");
    this.menu = {
      element: this.page.getByText("Elements"),
      ELEMENTS: {
        textboxpage: this.page.getByRole("link", { name: "Text Box" }),
        checkboxpage: this.page.getByRole("link", { name: "Check Box" }),
        radiobuttonpage: this.page.getByRole("link", { name: "Radio Button" }),
        buttonspage: this.page.getByRole('link', { name: 'Buttons' }),
        linkspage: this.page.locator('[href="/links"]')
      },
      form: this.page.getByText("Forms"),
      FORMS: {
        practicleformpage: this.page.getByRole("link", { name: "Practice Form" }),
      },
      alertsframewindows:this.page.getByText('Alerts, Frame & Windows'),
      ALERTS: {
        modaldialogspage: this.page.getByRole("link", { name: "Modal Dialogs" }),
      },
      bookstoreapplication: this.page.getByText("Book Store Application"),
    };
  }

  async waitForReady() {
    // Prosty warunek: nagłówek widoczny
    await expect(this.mainHeader).toBeVisible({ timeout: 10_000 });
  }

  async goToElementsButton() {
    await allure.step("Open Elements->Button page DemoQA", async () => {
      await this.menu.bookstoreapplication.click();
      await this.menu.element.click();
      await this.menu.ELEMENTS.buttonspage.click();
    });
  }
  async goToElementsoTextbox() {
    await allure.step("Open Elements->Textbox page DemoQA", async () => {
      await this.menu.bookstoreapplication.click();
      await this.menu.element.click();
      await this.menu.ELEMENTS.textboxpage.click();
    });
  }
  async goToElementsoCheckbox() {
    await allure.step("Open Elements->Checkbox page DemoQA", async () => {
      await this.menu.bookstoreapplication.click();
      await this.menu.element.click();
      await this.menu.ELEMENTS.checkboxpage.click();
    });
  }
  async goToElementsRadiobuttoms() {
    await allure.step("Open Elements->RadioButton page DemoQA", async () => {
      await this.menu.bookstoreapplication.click();
      await this.menu.element.click();
      await this.menu.ELEMENTS.radiobuttonpage.click();
    });
  }
  async goToElementsLinks() {
    await allure.step("Open Elements->Links page DemoQA", async () => {
      await this.menu.bookstoreapplication.click();
      await this.menu.element.click();
      await this.menu.ELEMENTS.linkspage.click();
    });
  }

   async goToFormsPracticleform() {
    await allure.step("Open Forms->Practicleform page DemoQA", async () => {
      await this.menu.bookstoreapplication.click();
      await this.menu.form.click();
      await this.menu.FORMS.practicleformpage.click();
    });
  }
  async goToAlertsFrameWindowsModaldialogs() {
    await allure.step("Open Alerts, Frame & Windows->Modal dialogs page DemoQA", async () => {
      await this.menu.bookstoreapplication.click();
      await this.menu.alertsframewindows.click();
      await this.menu.ALERTS.modaldialogspage.click();
    });
  }
  async goTowidgetsDatapickerpage() {
    await allure.step("Open WIDGETS->datapicker page DemoQA", async () => {
      await this.menu.bookstoreapplication.click();
      await this.menu.widgets.click();
      await this.menu.WIDGETS.datapickerpage.click();
    });
  }
  
}
