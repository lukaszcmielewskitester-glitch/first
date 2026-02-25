import { test, expect } from '@playwright/test';
import { RadioButtonPage } from '../../demoqa-pages/elements/radio-button.page';

test('Radio Button – select Yes', async ({ page }) => {
  const radio = new RadioButtonPage(page);
})
