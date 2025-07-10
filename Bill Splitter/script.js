let billAmountInput = document.querySelector("#bill-amount");

let customTipInput = document.querySelector(".custom-tip");

let numberOfPeopleInput = document.querySelector(".number-of-people");

let generateBillBtn = document.querySelector(".generate-bill-btn");

let tipAmountOutPut = document.querySelector(".tip-amount span");

let totalBillOutPut = document.querySelector(".total span");

let eachPersonBillOutPut = document.querySelector(".each-person-bill span");

let tipsContainer = document.querySelector(".tip-container");

let resetBtn = document.querySelector(".reset-btn");

let tipPercentage = 0;

generateBillBtn.addEventListener("click", () => {
  let billAmount = parseInt(billAmountInput.value);

  let numberOfPeople = parseInt(numberOfPeopleInput.value);

  let tipAmount = billAmount * (tipPercentage / 100);

  let totalBill = billAmount + tipAmount;

  let eachPersonBill = totalBill / numberOfPeople;

  tipAmountOutPut.innerText = `₹${tipAmount}`;

  totalBillOutPut.innerText = `₹${totalBill}`;

  eachPersonBillOutPut.innerText = `₹${eachPersonBill}`;

  resetBtn.disabled = false;
});

tipsContainer.addEventListener("click", (e) => {
  if (tipsContainer.classList.contains("disabled")) return;

  if (e.target !== tipsContainer) {
    [...tipsContainer.children].forEach((tip) =>
      tip.classList.remove("selected")
    );

    e.target.classList.add("selected");

    tipPercentage = parseInt(e.target.innerText);

    customTipInput.value = "";

    if (numberOfPeopleInput.value && tipPercentage) {
      generateBillBtn.disabled = false;
    } else {
      generateBillBtn.disabled = true;
    }
  }
});

customTipInput.addEventListener("input", () => {
  tipPercentage = parseInt(customTipInput.value);

  [...tipsContainer.children].forEach((tip) =>
    tip.classList.remove("selected")
  );

  if (numberOfPeopleInput.value && tipPercentage) {
    generateBillBtn.disabled = false;
  } else {
    generateBillBtn.disabled = true;
  }
});

resetBtn.addEventListener("click", () => {
  tipPercentage = 0;

  billAmountInput.value = "";

  customTipInput.value = "";

  numberOfPeopleInput.value = "";

  tipAmountOutPut.innerText = "";

  totalBillOutPut.innerText = "";

  eachPersonBillOutPut.innerText = "";

  [...tipsContainer.children].forEach((tip) =>
    tip.classList.remove("selected")
  );

  resetBtn.disabled = true;

  resetBtn.style.cursor = "not-allowed";

  generateBillBtn.disabled = true;

  numberOfPeopleInput.disabled = true;

  customTipInput.disabled = true;

  tipsContainer.classList.add("disabled");
});

billAmountInput.addEventListener("input", () => {
  if (billAmountInput.value) {
    customTipInput.disabled = false;

    numberOfPeopleInput.disabled = false;

    tipsContainer.classList.remove("disabled");
  } else {
    customTipInput.disabled = true;

    numberOfPeopleInput.disabled = true;

    tipsContainer.classList.add("disabled");
  }
});

numberOfPeopleInput.addEventListener("input", () => {
  if (numberOfPeopleInput.value && tipPercentage) {
    generateBillBtn.disabled = false;
  } else {
    generateBillBtn.disabled = true;
  }
});
