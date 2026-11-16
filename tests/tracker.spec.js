import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const user = {
  uid: "chai-test@example.invalid",
  email: "chai-test@example.invalid",
};
const fixedNow = Date.UTC(2026, 10, 16, 10, 0, 0);
const seeded = {
  [fixedNow - 5 * 3600000]: { name: "Masala Chai", cost: "25.50" },
  [fixedNow - 3600000]: { name: "Kadak Chai", cost: 30 },
  [fixedNow - 49 * 3600000]: { name: "Herbal Tea", cost: 20 },
};
async function setup(page, signedIn = false, data = {}) {
  await page.clock.install({ time: fixedNow });
  await page.clock.setFixedTime(fixedNow);
  await page.addInitScript(
    ({ signedIn, data, user }) => {
      if (!localStorage.getItem("test-initialized")) {
        localStorage.setItem("test-initialized", "1");
        if (signedIn) localStorage.setItem("test-user", JSON.stringify(user));
        localStorage.setItem(`test-data:${user.uid}`, JSON.stringify(data));
      }
    },
    { signedIn, data, user },
  );
  await page.goto("/");
}
async function audit(page) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}
test("guest selection, auth gate, keyboard dialog and persistent themes", async ({
  page,
}, testInfo) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await setup(page);
  await expect(
    page.getByRole("heading", { name: "Every cup. Counted." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Masala Chai 60 mg caffeine" })
    .click();
  await expect(
    page.getByRole("button", { name: "Masala Chai 60 mg caffeine" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Add entry" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await audit(page);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Add entry" })).toBeFocused();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass("dark");
  await audit(page);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-dark.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await audit(page);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-light.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});
test("auth error, signup, signin and signout states", async ({ page }) => {
  await setup(page);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.getByLabel("Email", { exact: true }).fill(user.email);
  await page.getByLabel("Password", { exact: true }).fill("wrong-password");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Sign in", exact: true })
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "Invalid email" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Sign up", exact: true }).click();
  await page.getByLabel("Password", { exact: true }).fill("test-password");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(
    page.getByText("Account created successfully. Please sign in."),
  ).toBeVisible();
  await page.getByLabel("Email", { exact: true }).fill(user.email);
  await page.getByLabel("Password", { exact: true }).fill("test-password");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Sign in", exact: true })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(
    page.getByRole("button", { name: "Sign in", exact: true }),
  ).toBeVisible();
});
test("backdating, merge writes, reset, statistics, history details and persistence", async ({
  page,
}, testInfo) => {
  await setup(page, true, seeded);
  await expect(page.locator(".caffeine-value")).toHaveText("90.94mg");
  await expect(page.locator(".status-pill")).toHaveText("moderate");
  await expect(page.locator(".stat-grid")).toContainText("₹75.50");
  await page.getByRole("button", { name: "Add entry" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Select a chai type first.",
  );
  await page.getByRole("button", { name: "Others Explore all types" }).click();
  await expect(
    page.getByLabel("Choose your chai").locator("option"),
  ).toHaveCount(37);
  await page.getByLabel("Choose your chai").selectOption("Kashmiri Pink Tea");
  await page.getByLabel("Cost in rupees").fill("60.25");
  await page.getByLabel("Hours", { exact: true }).selectOption("2");
  await page.getByLabel("Minutes", { exact: true }).selectOption("30");
  await page.getByRole("button", { name: "Add entry" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "One more cup, counted. Chai saved!",
  );
  await expect(page.getByLabel("Hours", { exact: true })).toHaveValue("0");
  await expect(page.getByLabel("Minutes", { exact: true })).toHaveValue("0");
  await expect(page.getByLabel("Cost in rupees")).toHaveValue("0");
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("test-last-write")),
  );
  const timestamp = Number(Object.keys(saved.data)[0]);
  expect(timestamp).toBe(fixedNow - 2.5 * 3600000);
  expect(saved).toEqual({
    ref: { collection: "users", uid: user.uid },
    data: { [timestamp]: { name: "Kashmiri Pink Tea", cost: "60.25" } },
    options: { merge: true },
  });
  await expect(page.locator(".history-entry")).toHaveCount(4);
  await expect(page.locator(".caffeine-value")).toHaveText("119.22mg");
  await expect(page.locator(".stat-grid")).toContainText("₹135.75");
  await audit(page);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-history.png`,
    fullPage: true,
  });
  await page
    .getByRole("button", { name: /View Kashmiri Pink Tea/ })
    .press("Enter");
  await expect(page.getByRole("dialog")).toContainText("28.28mg / 40mg");
  await expect(page.getByRole("dialog")).toContainText("₹60.25");
  await audit(page);
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.locator(".history-entry")).toHaveCount(4);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await audit(page);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page.locator("#history")).not.toBeVisible();
});
test("failed writes retain form values and do not add an unsaved cup", async ({
  page,
}) => {
  await setup(page, true, seeded);
  await page.evaluate(() => localStorage.setItem("test-fail-save", "1"));
  await page
    .getByRole("button", { name: "Masala Chai 60 mg caffeine" })
    .click();
  await page.getByLabel("Cost in rupees").fill("20");
  await page.getByRole("button", { name: "Add entry" }).click();
  await expect(page.getByRole("status")).toContainText("couldn’t be saved");
  await expect(page.getByLabel("Cost in rupees")).toHaveValue("20");
  await expect(page.locator(".history-entry")).toHaveCount(3);
});
test("reduced motion and narrow layout", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 700 });
  await setup(page, true, seeded);
  await audit(page);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("status boundaries and top tea counts stay consistent", async ({
  page,
}) => {
  await setup(page, true, { [fixedNow]: { name: "Herbal Tea", cost: 0 } });
  await expect(page.locator(".status-pill")).toHaveText("low");
  for (const [data, level, caffeine] of [
    [{ [fixedNow]: { name: "Assam Tea", cost: "10" } }, "moderate", "80.00mg"],
    [
      {
        [fixedNow]: { name: "Assam Tea", cost: "10" },
        [fixedNow - 1]: { name: "Kadak Chai", cost: "20" },
        [fixedNow - 2]: { name: "Masala Chai", cost: 0 },
      },
      "high",
      "210.00mg",
    ],
  ]) {
    await page.evaluate(
      ({ data, user }) =>
        localStorage.setItem(`test-data:${user.uid}`, JSON.stringify(data)),
      { data, user },
    );
    await page.reload();
    await expect(page.locator(".status-pill")).toHaveText(level);
    await expect(page.locator(".caffeine-value")).toHaveText(caffeine);
  }
  const data = {
    [fixedNow]: { name: "Masala Chai", cost: 10 },
    [fixedNow - 1]: { name: "Masala Chai", cost: 10 },
    [fixedNow - 2]: { name: "Kadak Chai", cost: 20 },
  };
  await page.evaluate(
    ({ data, user }) =>
      localStorage.setItem(`test-data:${user.uid}`, JSON.stringify(data)),
    { data, user },
  );
  await page.reload();
  await expect(page.locator("tbody tr").first()).toContainText("Masala Chai");
  await expect(page.locator("tbody tr").first()).toContainText("66.67%");
});
