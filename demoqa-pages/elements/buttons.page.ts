import { Page, expect } from "@playwright/test";
import { BasePageABS } from "../base.page";
import { allure } from "allure-playwright";

export class ButtonsPage extends BasePageABS {
  readonly items: any;

  constructor(page: Page) {
    super(page);
    this.items = {
      doubleClickBtn: this.page.locator("#doubleClickBtn"),
      exDoubleTextLabel: page.locator("#doubleClickMessage"),
      rightClickBtn: this.page.locator("#rightClickBtn"),
      exRightTextLabel: page.locator("#rightClickMessage"),
      clickMeBtn: this.page.getByRole("button", {
        name: "Click Me",
        exact: true,
      }),
      exClickMeLabel: page.locator("#dynamicClickMessage"),
    };
  }

  async doubleClickAndCheck() {
    await allure.step("double click on button 'Double Click Me'", async () => {
      await this.items.doubleClickBtn.dblclick();
    });
    await allure.step(
      "check double click and the inscription should appear",
      async () => {
        await expect(this.items.exDoubleTextLabel).toBeVisible();
        await expect(this.items.exDoubleTextLabel).toContainText(
          "You have done a double click",
        );
      },
    );
  }

  async rightClickAndCheck() {
    await allure.step("right click on button 'Right Click Me'", async () => {
      await this.items.rightClickBtn.click({ button: "right" });
    });
    await allure.step(
      "check right click and the inscription should appear",
      async () => {
        await expect(this.items.exRightTextLabel).toBeVisible();
        await expect(this.items.exRightTextLabel).toContainText(
          "You have done a right click",
        );
      },
    );
  }

  async clickAndCheck() {
    await allure.step("click on button 'Double Click Me'", async () => {
      await this.items.clickMeBtn.click();
    });
    await allure.step(
      "check click and the inscription should appear",
      async () => {
        await expect(this.items.exClickMeLabel).toBeVisible();
        await expect(this.items.exClickMeLabel).toContainText(
          "You have done a dynamic click",
        );
      },
    );
  }
}
