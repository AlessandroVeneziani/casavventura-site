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


// Caroselli: frecce, tastiera e swipe nativo senza dipendenze.
document.querySelectorAll("[data-carousel]").forEach((shell) => {
  const track = shell.querySelector(".carousel-track");
  const previous = shell.querySelector(".carousel-button-prev");
  const next = shell.querySelector(".carousel-button-next");

  const getStep = () => {
    const firstCard = track.firstElementChild;
    if (!firstCard) return track.clientWidth;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  };

  const updateControls = () => {
    const hasOverflow = track.scrollWidth > track.clientWidth + 4;
    const atStart = track.scrollLeft <= 4;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;

    shell.classList.toggle("has-overflow", hasOverflow);
    previous.disabled = !hasOverflow || atStart;
    next.disabled = !hasOverflow || atEnd;
  };

  previous.addEventListener("click", () => {
    track.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: getStep(), behavior: "smooth" });
  });

  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      track.scrollBy({ left: -getStep(), behavior: "smooth" });
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      track.scrollBy({ left: getStep(), behavior: "smooth" });
    }
  });

  track.addEventListener("scroll", () => requestAnimationFrame(updateControls), { passive: true });
  new ResizeObserver(updateControls).observe(track);
  updateControls();
});
