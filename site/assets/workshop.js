"use strict";

const announce = (message) => {
  const status = document.getElementById("status");
  if (status) status.textContent = message;
};

for (const code of document.querySelectorAll("pre > code")) {
  if (!navigator.clipboard) continue;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy";
  button.textContent = "Copy code";
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.textContent);
      announce("Copied. Check the approved repository, branch, and paths before running commands.");
    } catch (error) {
      console.warn("Clipboard access failed:", error);
      announce("Clipboard unavailable. Select and copy the code manually.");
    }
  });
  code.parentElement.after(button);
}

const button = document.getElementById("complete");
if (button) {
  button.hidden = false;
  const key = "rulesets-workshop-progress-v1";
  const lab = document.body.dataset.lab;
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    if (!Array.isArray(saved) || saved.some((entry) => typeof entry !== "string" || !/^0[1-8]$/u.test(entry))) {
      throw new TypeError("Invalid workshop progress data");
    }
    const completed = new Set(saved);
    const refresh = () => {
      button.textContent = completed.has(lab) ? "Mark evidence as incomplete" : "Mark evidence as collected";
      button.setAttribute("aria-pressed", String(completed.has(lab)));
    };
    refresh();
    button.addEventListener("click", () => {
      const next = new Set(completed);
      if (next.has(lab)) next.delete(lab);
      else next.add(lab);
      try {
        localStorage.setItem(key, JSON.stringify([...next]));
        completed.clear();
        for (const entry of next) completed.add(entry);
        refresh();
        announce("Saved in this browser only. This button does not verify GitHub enforcement.");
      } catch (error) {
        console.warn("Progress write failed:", error);
        button.disabled = true;
        announce("Progress could not be saved. All content remains available; keep evidence in your approved repository.");
      }
    });
  } catch (error) {
    console.warn("Progress read failed:", error);
    button.disabled = true;
    announce("Progress unavailable. Clear this site's local progress data to reset; all content remains available.");
  }
}
