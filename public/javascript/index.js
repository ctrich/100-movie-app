//Toggle navigation on mobile
const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");
// const leftArrow = document.querySelector(".left-arrow");
// const rightArrow = document.querySelector(".right-arrow");
const carousel = document.querySelector(".carousel-container");
const signInNav = document.querySelector('.sign-in-nav');
const modalContainer = document.querySelector('.modal-container');
const signInClose = document.querySelector('.sign-in-close');

let slideNumber = 0;
// let touchstartX = 0;
// let touchendX = 0;

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

// const OpenCloseSignInModal = () => {
//   const visibility = modalContainer.getAttribute("data-visible");

//   if (visibility === "false") {
//     modalContainer.setAttribute("data-visible", true);
//   } else {
//     modalContainer.setAttribute("data-visible", false);
//   }
// }
const OpenCloseSignInModal = (e) => {
  const mainModal =  document.getElementById('modal-main');
  const createModal = document.getElementById('modal-create');

  switch(e.target.id) {
    case 'sign-in':
      modalContainer.setAttribute("data-visible", true);
      break;
      case 'modal-close':
        modalContainer.childNodes.forEach((element, i) =>{
                if ((i % 2) !== 0 && element.hasAttribute("data-visible")){
                  element.setAttribute("data-visible", false);
                }
              })
        mainModal.setAttribute("data-visible", true);
        modalContainer.setAttribute("data-visible", false);
      break;
    case 'btn-create':
      createModal.setAttribute("data-visible", true);
      mainModal.setAttribute("data-visible", false);
      break;
    case 'btn-create--email':
      document.getElementById('modal-create--email').setAttribute("data-visible", true);
      createModal.setAttribute("data-visible", false);
      break;
    case 'btn-sign-email':
      document.getElementById('modal-signin--email').setAttribute("data-visible", true);
      mainModal.setAttribute("data-visible", false);
      break;
  }

  
}

modalContainer.addEventListener('click', OpenCloseSignInModal);
signInNav.addEventListener('click', OpenCloseSignInModal);
// signInClose.addEventListener('click', OpenCloseSignInModal);

//Moves slides in image carousel left
// const moveLeft = () => {
//   document.querySelectorAll(".slide-card").forEach((card) => {
//     card.animate(
//        [
//         { transform: `translateX(${slideNumber * -100}%)` },
//         { transform: `translateX(${(slideNumber - 1) * -100}%)` },
//       ],
//       { duration: 1, fill: "forwards" }
//     );
//   });
//   slideNumber = 0;
// };

//Moves slides in image carousel right
const moveRight = () => {
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
    document.querySelector('.active').classList.remove('active');
    document.querySelector(`#slide-${slideNumber + 1}`).classList.add('active');
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
    
  // } else {
  //   moveLeft();
  // }
};
//Checks direction of swipes
// const checkDirection = () => {
//   if (touchendX < touchstartX) moveRight();
//   if (touchendX > touchstartX) moveLeft();
// };

//event listeners for image carousel
setInterval(() => {
  moveRight();
}, 10000);

// leftArrow.addEventListener("click", moveLeft);
// rightArrow.addEventListener("click", moveRight);

// carousel.addEventListener("touchstart", (e) => {
//   touchstartX = e.changedTouches[0].screenX;
// });
// carousel.addEventListener("touchend", (e) => {
//   touchendX = e.changedTouches[0].screenX;
//   checkDirection();
// });
