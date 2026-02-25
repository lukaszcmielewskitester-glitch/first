import { test, expect, Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";
import { BasePageABS } from "./base.page";

export type DemoQaSection = "Elements" | "Forms";

export class HomePage {
  private page: Page;
  private links: any;
  constructor(page: Page) {
    this.page = page;
    //this.page.goto("https://demoqa.com/");

    this.links = {
      elementspage: page.getByRole("link", { name: "Elements" }),
      formspage: page.getByRole("link", { name: "Forms" }),
      alertsframewindowpage: page.getByRole("link", {
        name: "Alerts, Frame & Windows",
      }),
      widgetpage: page.getByRole("link", { name: "Widgets" }),
    };
  }

  async start() {
    await allure.step("Open main page DemoQA", async () => {
      await this.page.goto("/");
    });
  }

  async openSection(section: DemoQaSection) {
    await allure.step(`Enter in: ${section}`, async () => {
      await this.links[section].click();
    });
  }
  async openElementsPage() {
    await allure.step(`Enter in: ELEMENTS`, async () => {
      await this.links.elementspage.click();
    });
    return new BasePageABS(this.page);
  }
  async openFormsPage() {
    await allure.step(`Enter in: FORMS`, async () => {
      await this.links.formspage.click();
    });
  }
  async openAlertsFramesWindowsPage() {
    await allure.step(`Enter in: ALERT, FRAME & WINDOWS`, async () => {
      await this.links.alertsframewindowpage.click();
    });
  }
  async openWidgetsPage() {
    await allure.step(`Enter in: WIDGETS`, async () => {
      await this.links.widgetpage.click();
    });
  }
}
