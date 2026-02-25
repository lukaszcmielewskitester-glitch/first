import { Page, Locator, expect } from "@playwright/test";
import { BasePageABS } from "../base.page";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";
export type TextBoxForm = {
  name?: string;
  email?: string;
  currentAddress?: string;
  permanentAddress?: string;
};
export class TextBoxPage extends BasePageABS {
  readonly items: any;

  constructor(page: Page) {
    super(page);
    this.items = {
      form: {
        fullName: this.page.locator("#userName"),
        email: this.page.locator("#userEmail"),
        currentAddress: this.page.locator("#currentAddress"),
        permanentAddress: this.page.locator("#permanentAddress"),
        submit: this.page.locator("#submit"),
      },
      output: {
        fullName: this.page.locator("#output #name"),
        email: this.page.locator("#output #email"),
        currentAddress: this.page.locator("#output #currentAddress"),
        permanentAddress: this.page.locator("#output #permanentAddress"),
      },
    };
  }

  async fillForm(data: TextBoxForm): Promise<TextBoxPage> {
    await allure.step("fill form  'Text Box'", async () => {
      if (data.name !== undefined) {
        await this.items.form.fullName.fill(data.name);
      }
      if (data.email !== undefined) {
        await this.items.form.email.fill(data.email);
      }
      if (data.currentAddress !== undefined) {
        await this.items.form.currentAddress.fill(data.currentAddress);
      }
      if (data.permanentAddress !== undefined) {
        await this.items.form.permanentAddress.fill(data.permanentAddress);
      }
    });
    return this;
  }

  async send(): Promise<TextBoxPage> {
    await allure.step("send form  'Text Box'", async () => {
      await this.items.form.submit.click();
    });
    return this;
  }
  async expectResult(data: TextBoxForm) {
    await allure.step("check data in output form 'Text Box'", async () => {
      if (data.name !== undefined) {
        await expect(this.items.output.fullName).toBeVisible();
        await expect(this.items.output.fullName).toContainText(
          "Name:" + data.name,
        );
      }
      if (data.email !== undefined) {
        await expect(this.items.output.email).toBeVisible();
        await expect(this.items.output.email).toContainText(
          "Email:" + data.email,
        );
      }
      if (data.currentAddress !== undefined) {
        await expect(this.items.output.currentAddress).toBeVisible();
        await expect(this.items.output.currentAddress).toContainText(
          "Current Address :" + data.currentAddress,
        );
      }
      if (data.permanentAddress !== undefined) {
        await expect(this.items.output.permanentAddress).toBeVisible();
        await expect(this.items.output.permanentAddress).toContainText(
          "Permananet Address :" + data.permanentAddress,
        );
      }
    });
  }
}
