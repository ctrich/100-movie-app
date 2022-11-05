
//Toggle navigation on mobile
const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");
const signInNav = document.querySelector('.sign-in-nav');
const modalContainer = document.querySelector('.modal-container');
const signInClose = document.querySelector('.sign-in-close');
const create = document.querySelector('#create');

//nav sub-menu
const movieNav = document.querySelector('#movie');
const tvNav = document.querySelector('#tv');


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
//login modal
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

//nav sub-menu
const showSubMenu = (e) => {
  if (e.target.id === "movie") {
    document.querySelector(".movie-sub").setAttribute("data-visible", true);
  } else if (e.target.id === "tv") {
    document.querySelector(".tv-sub").setAttribute("data-visible", true);
  }
}

const hideSubMenu = (e) => {
  if (e.target.id === "movie") {
    document.querySelector(".movie-sub").setAttribute("data-visible", false);
  } else if (e.target.id === "tv") {
    document.querySelector(".tv-sub").setAttribute("data-visible", false);
  }
}

modalContainer.addEventListener('click', OpenCloseSignInModal);
signInNav.addEventListener('click', OpenCloseSignInModal);

movieNav.addEventListener('mouseover', showSubMenu);
tvNav.addEventListener('mouseover', showSubMenu);

movieNav.addEventListener('mouseleave', hideSubMenu);
tvNav.addEventListener('mouseleave', hideSubMenu);

create.addEventListener("click", async (e)=> {
  e.preventDefault();
  document.querySelectorAll('.error').forEach(error => {
    error.remove();
  })

  const email = e.target.form.children[0].children[0].value;
  const password = e.target.form.children[1].children[0].value;
  const confirmPassword = e.target.form.children[2].children[0].value;
  try{
    const response = await fetch("/auth/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    })
    data = await response.json()
    console.log(data)
    const errors = document.getElementById('errors');
    data.forEach(error => {
      const errorMessage = document.createElement('p');
      errorMessage.classList.add('error');
      errorMessage.innerText = error.msg;
      errors.append(errorMessage);
    })
  }catch(err) {
    console.log(err);
  }
  
})

