import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByLabel("Upload your records to be checked")
    .setInputFiles(["e2e/fixtures/records.csv", "e2e/fixtures/records.xml"]);
  await page.getByRole("button", { name: "Submit" }).click();
  await page.waitForLoadState("networkidle");
  await page.getByRole("columnheader", { name: "Description" }).click();

  const recordsWithErrors = await page.$$("table tbody tr");
  expect(recordsWithErrors.length).toBe(4);
});
