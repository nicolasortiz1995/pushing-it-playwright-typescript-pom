/**
 * This file defines the step definitions for the registration feature using Cucumber.
 * The tests are executed using Playwright to interact with the application,
 * and environment variables are loaded via dotenv.
 */

import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { RegisterPage } from "../pages/RegisterPage";
import { expect } from "@playwright/test";
import dotenv from "dotenv";
import { generateRandomUser } from "../utils/userGenerator";

// Load environment variables from .env file
dotenv.config();

let browser: Browser;
let page: Page;
let registerPage: RegisterPage;

// Generate random user credentials
const { username, password } = generateRandomUser();

Given("the user navigates to the homepage", async function () {
  // Launch the browser in non-headless mode for visualization
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  registerPage = new RegisterPage(page);
  
  // Retrieve the base URL from environment variables
  const baseUrl: string = process.env.BASE_URL as string;
  
  // Navigate to the homepage
  await registerPage.navigate(baseUrl);
});

When("the user enters valid registration details", async function () {
  // Call the registration method with the generated username and password.
  // The RegisterPage will randomly select options for gender, day, month, and year.
  await registerPage.register(username, password);
});

Then("the system displays a message or state confirming successful registration", async function () {
  // Assert that the welcome message is visible, indicating successful registration.
  expect(await registerPage.isRegistrationSuccessful()).toBe(true);
  await browser.close();
});
