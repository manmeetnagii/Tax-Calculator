//Selecting form button element
const button = document.getElementById("button");

// Add event listener to button for form submission
button.addEventListener("click", (e) => {
  // Selecting inputs values
  let grossIncome = document.getElementById("grossIncome").value;
  let extraIncome = document.getElementById("extraIncome").value;
  let deductions = document.getElementById("deductions").value;
  let ageGroup = document.getElementById("ageGroup").value;

  // Selecting alert icon element and it's tool-tip text element
  const grossIncomeAlert = document.getElementById("grossIncomeAlert");
  const grossIncomeAlertText = document.getElementById("grossIncomeAlertText");
  const extraIncomeAlert = document.getElementById("extraIncomeAlert");
  const extraIncomeAlertText = document.getElementById("extraIncomeAlertText");
  const deductionsAlert = document.getElementById("deductionsAlert");
  const deductionsAlertText = document.getElementById("deductionsAlertText");

  //Preventing form default behaviour
  e.preventDefault();

  if (grossIncome === "") {
    //      console.log("gross income is empty");
    grossIncomeAlert.style.display = "block";
    grossIncomeAlertText.innerText = "All fields are mandatory";
  }

  if (grossIncome != "") {
    if (!/^[0-9]+$/.test(grossIncome)) {
      //   console.log("gross income is not a number");
      grossIncomeAlert.style.display = "block";
      grossIncomeAlertText.innerText = "Please enter numbers only";
    }
  }

  if (extraIncome === "") {
    //      console.log("extra income is empty");
    extraIncomeAlert.style.display = "block";
    extraIncomeAlertText.innerText = "All fields are mandatory";
  }

  if (extraIncome != "") {
    if (!/^[0-9]+$/.test(extraIncome)) {
      //   console.log("extra income is not a number");
      extraIncomeAlert.style.display = "block";
      extraIncomeAlertText.innerText = "Please enter numbers only";
    }
  }

  if (deductions === "") {
    //      console.log("deduction is empty");

    deductionsAlert.style.display = "block";
    deductionsAlertText.innerText = "All fields are mandatory";
  }

  if (deductions != "") {
    if (!/^[0-9]+$/.test(deductions)) {
      //   console.log("deduction is not a number");
      deductionsAlert.style.display = "block";
      deductionsAlertText.innerText = "Please enter numbers only";
    }
  }

  if (ageGroup === "null") {
    // console.log("age group is empty");

    const ageGroupAlert = document.getElementById("ageGroupAlert");
    ageGroupAlert.style.display = "block";
  }

  if (ageGroup != "null") {
    const ageGroupAlert = document.getElementById("ageGroupAlert");
    ageGroupAlert.style.display = "none";
  }

  if (grossIncome != "" && /^[0-9]+$/.test(grossIncome) && extraIncome != "" && /^[0-9]+$/.test(extraIncome) && deductions != "" && /^[0-9]+$/.test(deductions) && ageGroup != "null") {
    const { TotalAmount, totalTaxAmount } = calculateAmount();
    displayModal(TotalAmount, totalTaxAmount);
  }
});

// Function to display modal
function displayModal(TotalAmount, totalTaxAmount) {
  const resultModal = document.getElementById("resultModal");
  const taxAmount = document.getElementById("taxAmount");
  const taxDeducted = document.getElementById("taxDeducted");

  resultModal.style.display = "flex";

  taxAmount.innerText = TotalAmount.toLocaleString();
  taxDeducted.innerText = totalTaxAmount.toLocaleString();
}

// Function to calculate total tax and total income after tax deduction
function calculateAmount() {

  // Selecting input values
  let grossIncome = document.getElementById("grossIncome").value;
  let extraIncome = document.getElementById("extraIncome").value;
  let deductions = document.getElementById("deductions").value;
  let ageGroup = document.getElementById("ageGroup").value;

  let totalAmount;
  let TotaltaxAmount;
  let netIncome = Number(grossIncome) + Number(extraIncome) - Number(deductions);

  if (netIncome > 800000) {
    let tax = 0;
    const taxableIncome = netIncome - 800000;

    if (ageGroup === "upto39") {
      tax = 0.3;
    } else if (ageGroup === "40to59") {
      tax = 0.4;
    } else {
      tax = 0.1;
    }

    TotaltaxAmount = taxableIncome * tax;
    totalAmount = netIncome - TotaltaxAmount;
    return { TotalAmount: totalAmount, totalTaxAmount: TotaltaxAmount };
  } 
  else {
    totalAmount = netIncome;
    TotaltaxAmount = 0;
    return { TotalAmount: totalAmount, totalTaxAmount: TotaltaxAmount };
  }
}

// Function to close modal
function closeModal() {
  const resultModal = document.getElementById("resultModal");
  resultModal.style.display = "none";
}

// Handling form when user presses the enter key.
document.getElementById("button").addEventListener("keydown", function (event) {
    event.preventDefault();
    if (event.key === "Enter") {
    const { TotalAmount, totalTaxAmount } = calculateAmount();
    displayModal(TotalAmount, totalTaxAmount);
    }
});


function handleInputValues() {
  // Selecting input elements
  const grossIncome = document.getElementById("grossIncome");
  const extraIncome = document.getElementById("extraIncome");
  const deductions = document.getElementById("deductions");

  //    Selecting alert icon element
  const grossIncomeAlert = document.getElementById("grossIncomeAlert");
  const extraIncomeAlert = document.getElementById("extraIncomeAlert");
  const deductionsAlert = document.getElementById("deductionsAlert");

  //   Keeps the track of gross income when user types the input value
  grossIncome.addEventListener("input", (e) => {
    const currVal = e.target.value;
    if (!/^[0-9]+$/.test(currVal) && currVal != "") {
      const grossIncomeAlert = document.getElementById("grossIncomeAlert");
      const grossIncomeAlertText = document.getElementById("grossIncomeAlertText");

      //   console.log("gross income is not a number");
      grossIncomeAlert.style.display = "block";
      grossIncomeAlertText.innerText = "Please enter numbers only";
    } 
    else {
      grossIncomeAlert.style.display = "none";
    }
  });

  // Keeps the track of age group when user selects the input value
  ageGroup.addEventListener("input", (e) => {
    const currVal = e.target.value;
    if (currVal === "null") {
        //   console.log("age group is not a selected");
      const ageGroupAlert = document.getElementById("ageGroupAlert");
      ageGroupAlert.style.display = "block";
    } 
    else {
      ageGroupAlert.style.display = "none";
    }
  });

  // Keeps the track of extra income when user types the input value
  extraIncome.addEventListener("input", (e) => {
    const currVal = e.target.value;
    if (!/^\d+$/.test(currVal) && currVal != "") {
      const extraIncomeAlert = document.getElementById("extraIncomeAlert");
      const extraIncomeAlertText = document.getElementById("extraIncomeAlertText");

      //   console.log("extra income is not a number");
      extraIncomeAlert.style.display = "block";
      extraIncomeAlertText.innerText = "Please enter numbers only";
    } 
    else {
      extraIncomeAlert.style.display = "none";
    }
  });

  // Keeps the track of deductions when user types the input value
  deductions.addEventListener("input", (e) => {
    const currVal = e.target.value;
    if (!/^\d+$/.test(currVal) && currVal != "") {
      const deductionsAlert = document.getElementById("deductionsAlert");
      const deductionsAlertText = document.getElementById("deductionsAlertText");

      //   console.log("gross income is not a number");
      deductionsAlert.style.display = "block";
      deductionsAlertText.innerText = "Please enter numbers only";
    } 
    else {
      deductionsAlert.style.display = "none";
    }
  });
}
handleInputValues();

// toggles between dark/light mode icons
document.addEventListener("DOMContentLoaded", function () {
  const darkLightModeIcon = document.getElementById("toggleDarkMode");
  const sun = "sun.webp";
  const moon = "moon.webp";

  let isDark = true;

  function toggleImageSrc() {
    if (isDark) {
      darkLightModeIcon.src = moon;
      isDark = false;
    } else {
      darkLightModeIcon.src = sun;
      isDark = true;
    }
  }
  darkLightModeIcon.addEventListener("click", toggleImageSrc);
});

// Togggles between dark/light mode theme
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("light-mode"); // Toggle the 'dark-mode' class on the <body> element

  const container = document.getElementById("container");
  container.classList.toggle("light-mode");

  const h1 = document.getElementById("heading");
  h1.classList.toggle("light-mode");

  const ageGroupInput = document.getElementById("ageGroupInput");
  ageGroupInput.classList.toggle("light-mode");
  const grossIncomeInput = document.getElementById("grossIncomeInput");
  grossIncomeInput.classList.toggle("light-mode");
  const extraIncomeInput = document.getElementById("extraIncomeInput");
  extraIncomeInput.classList.toggle("light-mode");
  const deductionsInput = document.getElementById("deductionsInput");
  deductionsInput.classList.toggle("light-mode");

  const grossIncome = document.getElementById("grossIncome");
  grossIncome.classList.toggle("light-mode");
  const extraIncome = document.getElementById("extraIncome");
  extraIncome.classList.toggle("light-mode");
  const ageGroup = document.getElementById("ageGroup");
  ageGroup.classList.toggle("light-mode");
  const deductions = document.getElementById("deductions");
  deductions.classList.toggle("light-mode");

  const grossIncomeLabel = document.getElementById("grossIncomeLabel");
  grossIncomeLabel.classList.toggle("light-mode");
  const extraIncomeLabel = document.getElementById("extraIncomeLabel");
  extraIncomeLabel.classList.toggle("light-mode");
  const ageGroupLabel = document.getElementById("ageGroupLabel");
  ageGroupLabel.classList.toggle("light-mode");
  const deductionslabel = document.getElementById("deductionslabel");
  deductionslabel.classList.toggle("light-mode");
}

// This will help the user to navigate between the inputs by pressing tab.
const inputElements = document.querySelectorAll('input[type="text"]');
inputElements.forEach((input, index) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault(); 
      
      // Determine the index of the next input field to focus on
      const nextIndex = (index + 1) % inputElements.length;
      
      // Set focus to the next input field
      inputElements[nextIndex].focus();
    }
  });
});
document.getElementById("grossIncome").focus(); //Auto focus on the input when page is loaded.
