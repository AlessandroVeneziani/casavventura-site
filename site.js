const menuButton = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  primaryNavigation.classList.toggle("is-open", isOpen);
  menuButton.querySelector(".visually-hidden").textContent = isOpen ? "Chiudi il menu" : "Apri il menu";
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

primaryNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});
