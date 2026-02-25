import { Page, expect } from "@playwright/test";
import { BasePageABS } from "../base.page";
import { allure } from "allure-playwright";
import { formatDateShort, formatDate } from "../../tool/dateformat";
export type PracticeForm = {
  firstName: string;
  lastName: string;
  email?: string;
  gender: "Male" | "Female" | "Other";
  mobile: string;
  dateOfBirthAsDate: Date;

  sportHobby?: boolean;
  readingHobby?: boolean;
  musicHobby?: boolean;
  currentAddress?: string;
};
export class PracticeFormPage extends BasePageABS {
  readonly items: any;
  readonly resultModal: any;
  constructor(page: Page) {
    super(page);
    this.items = {
      firstName: this.page.locator("#firstName"),
      lastName: this.page.locator("#lastName"),
      userEmail: this.page.locator("#userEmail"),
      mobile: this.page.locator("#userNumber"),
      dateOfBirth: this.page.locator("#dateOfBirthInput"),
      //listOfSsubjects: this.page.locator("#react-select-5-placeholder"),
      sportBox: this.page.locator("#hobbies-checkbox-1"),
      readingBox: this.page.locator("#hobbies-checkbox-2"),
      musicBox: this.page.locator("#hobbies-checkbox-3"),
      currentAddress: this.page.locator("#currentAddress"),

      submitBth: this.page.locator("#submit"),
    };
    // RESULT MODAL
    this.resultModal = {
      tableResponsive: this.page.locator(".table-responsive"),
      resultTitle: this.page.locator("#example-modal-sizes-title-lg"),
      resultName: this.page,

      studentName: this.page.locator(
        'tr:has(td:text-is("Student Name")) td:nth-child(2)',
      ),
      emailStudent: this.page.locator(
        'tr:has(td:text-is("Student Email")) td:nth-child(2)',
      ),
      gender: this.page.locator('tr:has(td:text-is("Gender")) td:nth-child(2)'),
      mobile: this.page.locator('tr:has(td:text-is("Mobile")) td:nth-child(2)'),
      dateOfBirth: this.page.locator(
        'tr:has(td:text-is("Date of Birth")) td:nth-child(2)',
      ),
      subject: this.page.locator(
        'tr:has(td:text-is("Subjects")) td:nth-child(2)',
      ),
      hobbies: this.page.locator(
        'tr:has(td:text-is("Hobbies")) td:nth-child(2)',
      ),
      picture: this.page.locator(
        'tr:has(td:text-is("Picture")) td:nth-child(2)',
      ),
      address: this.page.locator(
        'tr:has(td:text-is("Address")) td:nth-child(2)',
      ),
      stateAndCity: this.page.locator(
        'tr:has(td:text-is("State and City")) td:nth-child(2)',
      ),

      closeModalBtn: this.page.locator("#closeLargeModal"),
    };
  }
  private async selectGender(
    gender: "Male" | "Female" | "Other",
  ): Promise<void> {
    await this.page.locator(`input[name="gender"][value="${gender}"]`).check();
  }

  async completePraccticeForm(data: PracticeForm) {
    await allure.step("fill form  'Practice Form'", async () => {
      await this.items.firstName.fill(data.firstName);
      await this.items.lastName.fill(data.lastName);
      if (data.email !== undefined) {
        await this.items.userEmail.fill(data.email);
      }
      await this.selectGender(data.gender);
      await this.items.mobile.fill(data.mobile);

      let dateString = formatDateShort(data.dateOfBirthAsDate);
      await this.items.dateOfBirth.fill(dateString);
      await this.items.dateOfBirth.press("Enter");
      if (data.currentAddress !== undefined) {
        await this.items.currentAddress.fill(data.currentAddress);
      }
      if (data.sportHobby) {
        await this.items.sportBox.check();
      } else {
        await this.items.sportBox.uncheck();
      }
      if (data.readingHobby) {
        await this.items.readingBox.check();
      } else {
        await this.items.readingBox.uncheck();
      }
      if (data.musicHobby) {
        await this.items.musicBox.check();
      } else {
        await this.items.musicBox.uncheck();
      }
    });
  }

  async sendForm() {
    await this.items.submitBth.click();
  }

  async checkResultModal(data: PracticeForm) {
    await expect(this.resultModal.resultTitle).toContainText(
      "Thanks for submitting the form",
    );

    await expect(await this.resultModal.studentName.innerText()).toBe(
      `${data.firstName} ${data.lastName}`,
    );
    if (data.email !== undefined) {
      await expect(await this.resultModal.emailStudent.innerText()).toBe(
        data.email,
      );
    } else {
      await expect(await this.resultModal.emailStudent.innerText()).toBe("");
    }
    await expect(await this.resultModal.gender.innerText()).toBe(data.gender);
    await expect(await this.resultModal.mobile.innerText()).toBe(data.mobile);
    await expect(await this.resultModal.dateOfBirth.innerText()).toBe(
      formatDate(data.dateOfBirthAsDate),
    );
    if (data.sportHobby || data.readingHobby || data.musicHobby) {
      await expect(await this.resultModal.hobbies.innerText()).toBe(
        this.getHobbiesString(data),
      );
    } else {
      await expect(await this.resultModal.hobbies.innerText()).toBe("");
    }
    if (data.currentAddress !== undefined) {
      await expect(await this.resultModal.address.innerText()).toBe(
        data.currentAddress,
      );
    } else {
      await expect(await this.resultModal.gender.innerText()).toBe("");
    }
  }

  private getHobbiesString(data: PracticeForm): string {
    const h: string[] = [];
    if (data.sportHobby) h.push("Sports");
    if (data.readingHobby) h.push("Reading");
    if (data.musicHobby) h.push("Music");
    return h.join(", ");
  }
}
