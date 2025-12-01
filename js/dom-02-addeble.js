function createInputComponent() {
  const numberInputs = [...document.querySelectorAll(".app-inp-number")];

  const labelElem = document.createElement("label");

  const bElem = document.createElement("b");
  bElem.textContent = `Number ${numberInputs.length + 1}:`;

  const InputElem = document.createElement("input");
  InputElem.setAttribute("type", "number");
  InputElem.classList.add("app-inp-number");

  labelElem.append(bElem);
  labelElem.append(InputElem);

  InputElem.addEventListener("change", () => {
    const numberInputs = [...document.querySelectorAll(".app-inp-number")];

    const result = numberInputs.reduce(
      (result, elem) =>
        result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
      0
    );

    const numberOutput = document.querySelectorAll(".app-out-number");
    numberOutput.forEach((elem) => (elem.textContent = result));
  });

  const container = document.querySelector(".app-cmp-number-list");
  if (container) {
    container.append(labelElem);
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
