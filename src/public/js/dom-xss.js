// Vulnerable function that writes user input directly to DOM
function vulnerableDomXss() {
  console.log("[DOM-XSS DEBUG] vulnerableDomXss function called.");
  const userInputElement = document.getElementById("input");
  const outputElement = document.getElementById("output");

  if (!userInputElement) {
    console.error(
      "[DOM-XSS DEBUG] Error: Could not find input element with ID 'input'."
    );
    return;
  }
  if (!outputElement) {
    console.error(
      "[DOM-XSS DEBUG] Error: Could not find output element with ID 'output'."
    );
    return;
  }

  const userInput = userInputElement.value;
  console.log("[DOM-XSS DEBUG] User input value:", userInput);

  outputElement.innerHTML = userInput;
  console.log("[DOM-XSS DEBUG] innerHTML of output element set.");
}

// Secure function that uses textContent to prevent DOM XSS
function secureDomXss() {
  console.log("[DOM-XSS DEBUG] secureDomXss function called.");
  const userInputElement = document.getElementById("input");
  const outputElement = document.getElementById("output");

  if (!userInputElement) {
    console.error(
      "[DOM-XSS DEBUG] Error: Could not find input element with ID 'input'."
    );
    return;
  }
  if (!outputElement) {
    console.error(
      "[DOM-XSS DEBUG] Error: Could not find output element with ID 'output'."
    );
    return;
  }

  const userInput = userInputElement.value;
  console.log("[DOM-XSS DEBUG] User input value for secure:", userInput);

  outputElement.textContent = userInput;
  console.log("[DOM-XSS DEBUG] textContent of output element set for secure.");
}
