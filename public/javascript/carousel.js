const carousel = document.querySelector(".carousel-container");
let slideNumber = 0;

//Moves slides in image carousel right
const moveSlide = () => {

    if (slideNumber === 9) {
      document.querySelectorAll(".slide-card").forEach((card) => {
        card.animate(
          [
          { transform: `translateX(${slideNumber * -100}%)` },
          { transform: `translateX(${0})` },
          ],
          { duration: 0, fill: "forwards" }
      );
      });
    slideNumber = 0;
    document.querySelector(".active").classList.remove("active");
    document.querySelector(`#slide-${slideNumber + 1}`).classList.add("active");
  } else {
      document.querySelectorAll(".slide-card").forEach((card) => {
        card.animate(
          [
            { transform: `translateX(${slideNumber * -100}%)` },
          { transform: `translateX(${(slideNumber + 1) * -100}%)` },
          ],
          { duration: 0, fill: "forwards" }
        );
      });
      slideNumber++;
      document.querySelector('.active').classList.remove('active');
      document.querySelector(`#slide-${slideNumber + 1}`).classList.add('active');
    }
};
  
  setInterval(() => {
    moveSlide();
  }, 10000);
  
