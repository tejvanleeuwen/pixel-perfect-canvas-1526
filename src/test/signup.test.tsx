import { act, createElement, type ComponentType } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Route } from "@/routes/index";

const { submit } = vi.hoisted(() => ({ submit: vi.fn() }));
vi.mock("@tanstack/react-start", async (importOriginal) => ({
  ...await importOriginal<typeof import("@tanstack/react-start")>(),
  useServerFn: () => submit,
}));

let container: HTMLDivElement;
let root: Root;
beforeEach(async () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  submit.mockReset();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root.render(createElement(Route.options.component as ComponentType)));
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});

async function fillAndSubmit() {
  const form = container.querySelector("form")!;
  const choice = Array.from(form.querySelectorAll("button")).find((button) => button.textContent === "Stationery")!;
  await act(async () => choice.click());
  for (const [name, value] of Object.entries({first_name: "Robin", email: "robin@example.com", age_range: "25-30", country: "Netherlands"})) {
    (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement).value = value;
  }
  await act(async () => form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
}

describe("Signup confirmation", () => {
  it("shows future email expectations and both social profiles only after saving succeeds", async () => {
    let resolve: (value: {ok: boolean}) => void = () => {};
    submit.mockImplementation(() => new Promise((done) => { resolve = done; }));
    await fillAndSubmit();
    expect(submit).toHaveBeenCalledOnce();
    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(container.querySelector('button[type="submit"]')).toBeDisabled();
    await act(async () => resolve({ok: true}));
    const confirmation = container.querySelector('[role="status"]')!;
    expect(confirmation).toHaveTextContent("Thank you, Robin!");
    expect(confirmation).toHaveTextContent("future email updates");
    expect(Array.from(confirmation.querySelectorAll("a")).map((link) => link.href)).toEqual([
      "https://www.instagram.com/littleredwritinghooddd/",
      "https://www.tiktok.com/@littleredwritinghooddd",
    ]);
    expect(container.querySelector("form")).toBeNull();
  });

  it("keeps the form available without claiming success when saving fails", async () => {
    submit.mockRejectedValue(new Error("Could not save signup"));
    await fillAndSubmit();
    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(container.querySelector("form")).toHaveTextContent("Something went wrong");
    expect(container.querySelector('button[type="submit"]')).not.toBeDisabled();
  });
});
