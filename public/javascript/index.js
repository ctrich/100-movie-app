//Toggle navigation on mobile
const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const carousel = document.querySelector(".carousel-container");

let slideNumber = 0;
let touchstartX = 0;
let touchendX = 0;

//Toggle the navigation for mobile devices
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

//Moves slides in image carousel left
const moveLeft = () => {
  if (slideNumber > 0) {
    document.querySelectorAll(".slide-card").forEach((card) => {
      card.animate(
        [
          { transform: `translateX(${slideNumber * -100}%)` },
          { transform: `translateX(${(slideNumber - 1) * -100}%)` },
        ],
        { duration: 400, fill: "forwards" }
      );
    });

    slideNumber--;
  }
};

//Moves slides in image carousel right
const moveRight = () => {
  if (slideNumber < 9) {
    document.querySelectorAll(".slide-card").forEach((card) => {
      card.animate(
        [
          { transform: `translateX(${slideNumber * -100}%)` },
          { transform: `translateX(${(slideNumber + 1) * -100}%)` },
        ],
        { duration: 400, fill: "forwards" }
      );
    });

    slideNumber++;
  }
};
//Checks direction of swipes
const checkDirection = () => {
  if (touchendX < touchstartX) moveRight();
  if (touchendX > touchstartX) moveLeft();
};

//event listeners for image carousel
leftArrow.addEventListener("click", moveLeft);
rightArrow.addEventListener("click", moveRight);

carousel.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});
carousel.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});
