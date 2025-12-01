function createInputComponent() {
  const numberInputs = [...document.querySelectorAll(".app-inp-number")];

  const templateElem = document.querySelector(".app-tmp-number-component");

  if (templateElem) {
    const inputContainer =
      templateElem.content.cloneNode(true).firstElementChild;

    [...inputContainer.querySelectorAll(".app-title-number")].forEach(
      (elem) => (elem.textContent = `${numberInputs.length + 1}`)
    );
    const InputElem = inputContainer.querySelector(".app-inp-number");

    InputElem.addEventListener("change", () => {
      const numberInputs = [...document.querySelectorAll(".app-inp-number")];

      const result = numberInputs.reduce(
        (result, elem) =>
          result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
        0
      );

      const numberOutput = [...document.querySelectorAll(".app-out-number")];
      numberOutput.forEach((elem) => (elem.textContent = result));
    });

    const container = document.querySelector(".app-cmp-number-list");
    if (container) {
      container.append(inputContainer);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const addButtons = [...document.querySelectorAll(".app-cmd-add-input")];

  addButtons.forEach((elem) =>
    elem.addEventListener("click", () => {
      createInputComponent();
    })
  );

  createInputComponent();
});
