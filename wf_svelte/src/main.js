import App from "./App.svelte";
import initializeCustomClient from "virtual:wf-custom";

const targetElement = document.getElementById("wf_app");

if (!targetElement) {
  throw new Error('Unable to start Wayfinder: element "#wf_app" was not found.');
}

const target = targetElement;

/** @param {string} attributeName */
function parseConfiguration(attributeName) {
  const value = target.getAttribute(attributeName) || "{}";

  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`Invalid JSON in ${attributeName}.`, { cause: error });
  }
}

const app = new App({
  target,
  props: {
    options: parseConfiguration("data-wf-options"),
    settings: parseConfiguration("data-wf-settings"),
  },
});

const openPOI = (poiOrId) => app.openPOI(poiOrId);

try {
  Promise.resolve(initializeCustomClient({ app, root: target, openPOI })).catch((error) => {
    console.error("Unable to initialize custom Wayfinder client code.", error);
  });
} catch (error) {
  console.error("Unable to initialize custom Wayfinder client code.", error);
}

target.dispatchEvent(
  new CustomEvent("wf:mounted", {
    bubbles: true,
    detail: { app, openPOI },
  }),
);

export default app;
