import { Page, Locator, expect } from "@playwright/test";
import { BasePageABS } from "../base.page";
import { allure } from "allure-playwright";
import { faker } from "@faker-js/faker";

export type LinkDef = {
  name: string;
  result: string;
  status: number;
  path: string;
};

const links: Record<string, LinkDef> = {
  created: {
    name: "Created",
    result: "Created",
    status: 201,
    path: "/created",
  },
  nocontent: {
    name: "No Content",
    result: "No Content",
    status: 204,
    path: "/no-content",
  },
  moved: {
    name: "Moved",
    result: "Moved Permanently",
    status: 301,
    path: "/moved",
  },
  badrequest: {
    name: "Bad Request",
    result: "Bad Request",
    status: 400,
    path: "/bad-request",
  },
  unauthorized: {
    name: "Unauthorized",
    result: "Unauthorized",
    status: 401,
    path: "/unauthorized",
  },
  forbidden: {
    name: "Forbidden",
    status: 403,
    path: "/forbidden",
    result: "Forbidden",
  },
  notfound: {
    name: "Not Found",
    status: 404,
    path: "/invalid-url",
    result: "Not Found",
  },
};

export class LinksPage extends BasePageABS {
  constructor(page: Page) {
    super(page);
  }
  

  async clickAndAssertLink(
    key:string,
    baseURL?: string,
  ) {
    const def: LinkDef = links[key];

    if (!def) {
      throw new Error(`No definition for key "${name}" in 'links'.`);
    }

    const expectedUrl = new URL(def.path, baseURL).toString();
    const responsePromise = this.page.waitForResponse(
      (res) => res.url() === expectedUrl,
    );

    await allure.step(`Click on ${def.name} and wait for response`, async () => {
      const [response] = await Promise.all([
        responsePromise,
        this.page.getByRole("link", { name: def.name }).click(),
      ]);
      expect(response.status(), `Response code for ${def.name} `).toBe(
        def.status,
      );
    });

    await allure.step(`Check msg on page ${def.name} `, async () => {
      await expect(
        this.page.locator("#linkResponse").getByText(def.result),
      ).toBeVisible();
    });
  }
}

let LinkKey = [
  "created",
  "nocontent",
  "moved",
  "badrequest",
  "unauthorized",
  "forbidden",
  "notfound",
];

export type LinkKey = keyof typeof links;
