function createInputComponent() {
  container.addEventListener("click", (ev) => ev);

  const templateElem = document.querySelector(".app-tmp-number-component");

  const createInputComponent = () => {
    const inputContainer =
      templateElem.content.cloneNode(true).firstElementChild;

    if (templateElem === null) {
      throw new Error("Template .app-tmp-number-component is not found");
    }

    const inputListContainer = templateElem.parentElement;

    if (templateElem === null) {
      throw new Error(
        "Template .app-tmp-number-component does not have parent"
      );
    }

    const recalcluateresult = () => {};

    const regenerateTitleAndAttribue = () => {};

    if (templateElem) {
      const inputContainer =
        templateElem.content.cloneNode(true).firstElementChild;

      inputContainer.addEventListener("click", (ev) => {
        console.debug(ev);
        if (ev.target?.matches?.(".app-cmd-remove-number-input") ?? false) {
          inputContainer.remove();
        }
      });
    }
    const numberInputs = [...container.querySelectorAll(".app-inp-number")];

    [...inputContainer.querySelectorAll(".app-title-number")].forEach(
      (elem) => (elem.textContent = `${numberInputs.length + 1}`)
    );
    const InputElem = inputContainer.querySelector(".app-inp-number");

    InputElem.addEventListener("change", () => {
      const numberInputs = [...container.querySelectorAll(".app-inp-number")];

      const result = numberInputs.reduce(
        (result, elem) =>
          result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
        0
      );

      const numberOutput = [...container.querySelectorAll(".app-out-number")];
      numberOutput.forEach((elem) => (elem.textContent = result));
    });

    const container = container.querySelector(".app-cmp-number-list");
    if (container) {
      container.append(inputContainer);
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const addButtons = [...container.querySelectorAll(".app-cmd-add-input")];

  addButtons.forEach((elem) =>
    elem.addEventListener("click", () => {
      createInputComponent();
    })
  );

  createInputComponent();
});
