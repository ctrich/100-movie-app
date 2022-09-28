//Toggle navigation on mobile
const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");
const signInNav = document.querySelector('.sign-in-nav');
const modalContainer = document.querySelector('.modal-container');
const signInClose = document.querySelector('.sign-in-close');

//nav sub-menu
const movieNav = document.querySelector('#movie');


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

const OpenCloseSignInModal = (e) => {
  const mainModal =  document.getElementById('modal-main');
  const createModal = document.getElementById('modal-create');


  switch(e.target.id) {
    case 'sign-in':
      modalContainer.setAttribute("data-visible", true);
      break;
      case 'modal-close':
      for (let i = 0; i < modalContainer.children.length; i++) {
        if (modalContainer.children[i].hasAttribute("data-visible")) {
            modalContainer.children[i].setAttribute("data-visible", false);
            }
        }
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

movieNav.addEventListener('mouseover', ()=> {
  const movieSubMenu = document.querySelector('.movie-sub');
  movieSubMenu.setAttribute("data-visible", true);
});

movieNav.addEventListener('mouseleave', ()=> {
  const movieSubMenu = document.querySelector('.movie-sub');
  movieSubMenu.setAttribute("data-visible", false);
});
