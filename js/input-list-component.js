/**
 * Create input-list component for a SINGLE section.
 * (ฟังก์ชันนี้จัดการ Logic ภายในแต่ละ Section: การบวกเลข, เพิ่ม/ลบ Input)
 *
 * @param {HTMLElement} componentElem
 * @returns {HTMLElement}
 */
export function createComponent(componentElem) {
  const templateElem = componentElem.querySelector(".app-tmp-number-component");

  if (templateElem === null) {
    throw new Error("Template .app-tmp-number-component is not found");
  }

  const inputListContainer = templateElem.parentElement;

  if (inputListContainer === null) {
    throw new Error("Template .app-tmp-number-component does not have parent");
  }

  const regenerateTitleNumbersAndStatus = () => {
    const listItems = [
      ...inputListContainer.querySelectorAll(".app-cmp-number"),
    ];

    listItems.forEach((inputContainer, index, items) => {
      [...inputContainer.querySelectorAll(".app-title-number")].forEach(
        (elem) => (elem.textContent = `${index + 1}`)
      );

      [
        ...inputContainer.querySelectorAll(".app-cmd-remove-number-input"),
      ].forEach((elem) => (elem.disabled = items.length === 1));
    });
  };

  const recalculateResult = () => {
    const result = [
      ...inputListContainer.querySelectorAll(".app-inp-number"),
    ].reduce(
      (result, elem) =>
        result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
      0
    );

    [...componentElem.querySelectorAll(".app-out-number")].forEach(
      (elem) => (elem.textContent = result.toLocaleString())
    );
  };

  const createInputComponent = () => {
    const inputContainer =
      templateElem.content.cloneNode(true).firstElementChild;

    inputContainer.addEventListener("click", (ev) => {
      if (ev.target.closest(".app-cmd-remove-number-input")) {
        inputContainer.remove();
        regenerateTitleNumbersAndStatus();
        recalculateResult();
      }
    });

    inputListContainer.append(inputContainer);
    regenerateTitleNumbersAndStatus();
    recalculateResult();
  };

  inputListContainer.addEventListener("input", (ev) => {
    if (ev.target.matches(".app-inp-number")) {
      recalculateResult();
    }
  });

  componentElem.addEventListener("click", (ev) => {
    if (ev.target.closest(".app-cmd-add-number-input")) {
      createInputComponent();
    }
  });

  createInputComponent();

  return componentElem;
}

function initApp() {
  const addSectionBtn = document.querySelector("#app-cmd-add-section");
  const sectionContainer = document.querySelector("#app-section-container");
  const sectionTemplate = document.querySelector("#app-tmp-section");

  if (!addSectionBtn || !sectionContainer || !sectionTemplate) {
    console.warn("Main app elements not found (Check HTML)");
    return;
  }

  const regenerateSectionTitles = () => {
    const sections = sectionContainer.querySelectorAll(".app-cmp-section");
    sections.forEach((sec, index) => {
      const title = sec.querySelector(".app-section-title-number");
      if (title) title.textContent = index + 1;
    });
  };

  const createNewSection = () => {
    const clone = sectionTemplate.content.cloneNode(true).firstElementChild;

    const removeBtn = clone.querySelector(".app-cmd-remove-section");
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        clone.remove();
        regenerateSectionTitles();
      });
    }

    sectionContainer.append(clone);

    createComponent(clone);

    regenerateSectionTitles();
  };

  addSectionBtn.addEventListener("click", createNewSection);

  createNewSection();
}

document.addEventListener("DOMContentLoaded", initApp);
