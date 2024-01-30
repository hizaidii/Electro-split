// function to highlight the active link in the navbar

window.addEventListener("DOMContentLoaded", (event) => {
  const currentPath = window.location.pathname;

  document.querySelectorAll(".link").forEach((ev) => {
    // Check if the link's href matches the current URL path
    if (ev.getAttribute("href") === currentPath) {
      ev.classList.add("active-link");
    }
  });
});

// function to dynamically show total amount
let amountInput = document.querySelectorAll(".amountInput");
let totalAmt = document.querySelector(".totalAmt");

function updateSum() {
  let total = 0;
  amountInput.forEach((input) => {
    const value = parseFloat(input.value) || 0;
    total += value;
  });
  totalAmt.innerText = total;
}

amountInput.forEach((input) => {
  input.addEventListener("input", updateSum);
});

//function to show/hide the history cycle container
let showMoreBtn = document.querySelectorAll(".show-more-btn");
let showLessBtn = document.querySelectorAll(".show-less-btn");

showMoreBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let clickedBtn = event.target;
    let hiddenContainer = clickedBtn.parentElement.parentElement.parentElement.nextElementSibling;

    hiddenContainer.classList.remove("hidden");
    btn.classList.add("hidden");
  });
});

showLessBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let clickedBtn = event.target;
    let hiddenContainer = clickedBtn.parentElement.parentElement;
    let showMoreBtn = hiddenContainer.previousElementSibling.querySelector(".show-more-btn");

    hiddenContainer.classList.add("hidden");
    showMoreBtn.classList.remove("hidden");
  });
});
