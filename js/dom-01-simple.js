document.addEventListener("DOMContentLoaded", () => {
  const numberInputs = [...document.querySelectorAll(".app-inp-number")];

  console.debug(numberInputs);

  numberInputs.forEach((elem) =>
    elem.addEventListener("change", () => {
      const result = numberInputs.reduce(
        (result, elem) =>
          result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
        0
      );

      const numberOutput = document.querySelectorAll(".app-out-number");
      numberOutput.forEach((elem) => (elem.textContent = result));
      console.debug(numberOutput);
    })
  );
});
