import { Page } from "playwright";

/**
 * The RegisterPage class encapsulates all interactions with the registration form on the PushingIT page.
 * It provides methods for navigating to the page, filling out the form with random selections,
 * and verifying whether the registration was successful.
 */
export class RegisterPage {
  private readonly page: Page;

  // Selectors for form elements
  private readonly userInput = 'input[name="user"]';
  private readonly passInput = 'input[name="pass"]';
  
  // Selector for gender options - we will click on the full label to trigger the radio selection.
  private readonly genderLabelSelector = 'label.chakra-radio';
  
  // Selectors for the dropdowns (day, month, and year)
  private readonly daySelect = 'select[name="day"]';
  private readonly monthSelect = 'select[name="month"]';
  private readonly yearSelect = 'select[name="year"]';
  
  // Selector for the register button
  private readonly registerButton = 'button[type="submit"]';

  /**
   * Constructs a new RegisterPage instance.
   * @param page - The Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the specified URL and waits for the registration form to load.
   * @param url - The URL of the homepage.
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForSelector(this.userInput);
  }

  /**
   * Fills out the registration form with the provided username and password.
   * Random selections are made for gender, day, month, and year.
   * Finally, it clicks the register button.
   * @param user - The username to register.
   * @param pass - The password to register.
   */
  async register(user: string, pass: string): Promise<void> {
    await this.page.fill(this.userInput, user);
    await this.page.fill(this.passInput, pass);

    // Randomly select a gender option
    await this.selectRandomGender();
    // Randomly select options for day, month, and year
    await this.selectRandomDay();
    await this.selectRandomMonth();
    await this.selectRandomYear();

    // Click the register button to submit the form
    await this.page.click(this.registerButton);
  }

  /**
   * Randomly selects one of the gender options by clicking on its label.
   * This ensures the corresponding radio button is activated.
   */
  async selectRandomGender(): Promise<void> {
    // Locate all gender labels on the page
    const labels = this.page.locator(this.genderLabelSelector);
    const count = await labels.count();
    if (count > 0) {
      const randomIndex = Math.floor(Math.random() * count);
      // Click on a random gender label to select that option
      await labels.nth(randomIndex).click();
    }
  }

  /**
   * Randomly selects an option from the Day dropdown.
   */
  async selectRandomDay(): Promise<void> {
    const options = this.page.locator(`${this.daySelect} > option`);
    const count = await options.count();
    if (count > 0) {
      const randomIndex = Math.floor(Math.random() * count);
      const value = await options.nth(randomIndex).getAttribute('value');
      if (value) {
        await this.page.selectOption(this.daySelect, value);
      }
    }
  }

  /**
   * Randomly selects an option from the Month dropdown.
   */
  async selectRandomMonth(): Promise<void> {
    const options = this.page.locator(`${this.monthSelect} > option`);
    const count = await options.count();
    if (count > 0) {
      const randomIndex = Math.floor(Math.random() * count);
      const value = await options.nth(randomIndex).getAttribute('value');
      if (value) {
        await this.page.selectOption(this.monthSelect, value);
      }
    }
  }

  /**
   * Randomly selects an option from the Year dropdown.
   */
  async selectRandomYear(): Promise<void> {
    const options = this.page.locator(`${this.yearSelect} > option`);
    const count = await options.count();
    if (count > 0) {
      const randomIndex = Math.floor(Math.random() * count);
      const value = await options.nth(randomIndex).getAttribute('value');
      if (value) {
        await this.page.selectOption(this.yearSelect, value);
      }
    }
  }

  /**
   * Verifies whether the registration was successful by checking for the visibility of
   * an <h2> element with the class 'chakra-heading' that contains the text "Welcome".
   * @returns A Promise that resolves to true if the welcome message is visible, otherwise false.
   */
  async isRegistrationSuccessful(): Promise<boolean> {
    try {
      await this.page.waitForSelector('h2.chakra-heading:has-text("Welcome")', { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}