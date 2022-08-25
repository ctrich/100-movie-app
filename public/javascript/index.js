//Toggle navigation on mobile
const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");
const leftArrow = document.querySelector(".left-arrow");
let rightArrow = document.querySelector(".right-arrow");
let slideNumber = 0;

navToggle.addEventListener("click", () => {
  const visibility = nav.getAttribute("data-visible");

  if (visibility === "false") {
    nav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

leftArrow.addEventListener("click", () => {
  if (slideNumber > 0) {
    console.log("should be moving");
    document
      .querySelector(".carousel")
      .animate(
        [
          { transform: `translateX(${slideNumber * -100}%)` },
          { transform: `translateX(${(slideNumber - 1) * -100}%)` },
        ],
        { duration: 400, fill: "forwards" }
      );
    slideNumber--;
  }
});

rightArrow.addEventListener("click", () => {
  if (slideNumber < 9) {
    console.log("should be moving");
    document
      .querySelector(".carousel")
      .animate(
        [
          { transform: `translateX(${slideNumber * -100}%)` },
          { transform: `translateX(${(slideNumber + 1) * -100}%)` },
        ],
        { duration: 400, fill: "forwards" }
      );

    slideNumber++;
  }
});
