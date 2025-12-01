function createInputListComponent(componentElem) {
  const templateElem = componentElem.querySelector(".app-tmp-number-component");

  if (templateElem === null) {
    throw new Error("Template .app-tmp-number-component is not found");
  }

  const inputListContainer = templateElem.parentElement;

  const regenerateTitleNumbersAndStatus = () => {
    [...inputListContainer.querySelectorAll(".app-cmp-number")].forEach(
      (inputContainer, index, items) => {
        [...inputContainer.querySelectorAll(".app-title-number")].forEach(
          (elem) => (elem.textContent = `${index + 1}`)
        );

        [
          ...inputContainer.querySelectorAll(".app-cmd-remove-number-input"),
        ].forEach((elem) => (elem.disabled = items.length === 1));
      }
    );
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
      (elem) => (elem.textContent = result)
    );
  };

  const createInputComponent = () => {
    const inputContainer =
      templateElem.content.cloneNode(true).firstElementChild;

    inputContainer.addEventListener("click", (ev) => {
      if (ev.target?.closest(".app-cmd-remove-number-input")) {
        inputContainer.remove();

        regenerateTitleNumbersAndStatus();
        recalculateResult();
      }
    });

    inputListContainer.append(inputContainer);

    regenerateTitleNumbersAndStatus();
    recalculateResult();
  };

  inputListContainer.addEventListener("change", (ev) => {
    if (ev.target?.matches(".app-inp-number")) {
      recalculateResult();
    }
  });

  componentElem.addEventListener("click", (ev) => {
    if (ev.target?.closest(".app-cmd-add-number-input")) {
      createInputComponent();
    }
  });

  createInputComponent();

  return componentElem;
}

function createSectionListComponent() {
  const addSectionBtn = document.getElementById("app-cmd-add-section");
  const sectionContainer = document.getElementById("app-section-container");
  const sectionTemplate = document.getElementById("app-tmp-section");

  if (!addSectionBtn || !sectionContainer || !sectionTemplate) {
    console.error("Required elements not found");
    return;
  }

  const regenerateSectionTitles = () => {
    const sections = [...sectionContainer.querySelectorAll(".app-cmp-section")];
    const totalSections = sections.length;
    sections.forEach((section, index) => {
      const titleSpan = section.querySelector(".app-section-title-number");
      if (titleSpan) titleSpan.textContent = index + 1;
      [...sectionContainer.querySelectorAll(".app-cmd-remove-section")].forEach(
        (elem) => (elem.disabled = totalSections === 1)
      );
    });
  };

  const createSection = () => {
    const clone = sectionTemplate.content.cloneNode(true).firstElementChild;

    const removeBtn = clone.querySelector(".app-cmd-remove-section");
    removeBtn.addEventListener("click", () => {
      clone.remove();
      regenerateSectionTitles();
    });

    sectionContainer.append(clone);

    createInputListComponent(clone);

    regenerateSectionTitles();
  };

  addSectionBtn.addEventListener("click", createSection);

  createSection();
}

document.addEventListener("DOMContentLoaded", () => {
  createSectionListComponent();
});
