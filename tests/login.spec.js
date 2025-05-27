// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import {STANDARD_USER, LOCKED_OUT_USER, PROBLEM_USER, PERFORMANCE_GLITCH_USER, PASSWORD} from "../config/env";

const testData = [
  {username: STANDARD_USER, password: PASSWORD, canLogin : true, expectedTitle: "Swag Labs"},
  {username: LOCKED_OUT_USER, password: PASSWORD, canLogin : false, expectedTitle: "Epic sadface: Sorry, this user has been locked out."},
  {username: PROBLEM_USER, password: PASSWORD, canLogin : true, expectedTitle: "Swag Labs"},
  {username: PERFORMANCE_GLITCH_USER, password: PASSWORD, canLogin : true, expectedTitle: "Swag Labs"},
  {username: "", password: PASSWORD, canLogin : false, expectedTitle: "Epic sadface: Username is required"},
  {username: STANDARD_USER, password: "", canLogin : false, expectedTitle: "Epic sadface: Password is required"},
  {username: STANDARD_USER, password: `${PASSWORD}123`, canLogin : false, expectedTitle: "Epic sadface: Username and password do not match any user in this service"},
  {username: `${STANDARD_USER}123`, password: PASSWORD, canLogin : false, expectedTitle: "Epic sadface: Username and password do not match any user in this service"},
]

test.describe("Login Test Suite", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("/");
  })

  testData.forEach(({username, password, canLogin, expectedTitle}, index) => {
    test(`TC${index+1}- Login with ${username} and ${password} credentials and expect ${canLogin == true ? "logged in successfully" : "can't login"}`, async ({page}) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(username, password);
      if(canLogin) {
        // Use loginPage.page instead of page
        await expect(page).toHaveURL("/inventory.html");
      }else{
        await loginPage.assertErrorMessage(expectedTitle);
      }
    })
  })
  
  test.afterEach(async ({page}) => {
    await page.close();
  })
})