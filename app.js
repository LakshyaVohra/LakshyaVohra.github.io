const typeEl = document.getElementById("type");
const cards = Array.from(document.getElementsByClassName("card"));
const nameEl = document.getElementById("alphabet");
const names = Array.from(document.getElementsByClassName("name"));
const leg = document.getElementById("legendary");
const mega = document.getElementById("mega");

function shouldBeDisplayed(element, index) {
  const nameVal = nameEl.value;
  const typeVal = typeEl.value;
  const legVal = leg.value;
  const megaVal = mega.value;

  // Special case: Mega is true, so we check for name from index 5
  const indexToBeChecked = megaVal === "Yes" ? 5 : 0;

  if (
    (legVal === "Yes" && !element.classList.contains("legendary")) ||
    (legVal === "No" && element.classList.contains("legendary"))
  ) {
    return false;
  }
  if (
    nameVal !== "A-Z" &&
    names[index].innerText[indexToBeChecked] !== nameVal
  ) {
    return false;
  }
  if (typeVal !== "All" && !element.classList.contains(typeVal)) {
    return false;
  }
  if (megaVal !== "All" && (
    (megaVal !== "Yes" && names[index].innerText.slice(0, 5) === "Mega ") ||
    (megaVal === "Yes" && names[index].innerText.slice(0, 5) !== "Mega "))
  ) {
    return false;
  }
  return true;
}

function updateDOM() {
  cards.forEach((element, index) => {
    if (shouldBeDisplayed(element, index)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}

[typeEl, nameEl, leg, mega].forEach((select) =>
  select.addEventListener("input", updateDOM)
);
