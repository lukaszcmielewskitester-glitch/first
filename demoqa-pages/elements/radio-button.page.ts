import { Page, Locator } from '@playwright/test';

export class RadioButtonPage {
  readonly yes: Locator;
  readonly impressive: Locator;
  readonly result: Locator;

  constructor(public page: Page) {
    this.yes = this.page.getByLabel('Yes');
    this.impressive = this.page.getByLabel('Impressive');
    this.result = this.page.locator('.text-success');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/radio-button');
  }
}