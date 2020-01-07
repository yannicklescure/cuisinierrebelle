import "bootstrap";
import { scrollToAnchor } from "../components/scroll-to-anchor";

// console.log(window.innerWidth);

const userSignedIn = document.querySelector('body').dataset.user;
console.log(`userSignedIn? ${userSignedIn}`);

let data = window.location.href.match(/https?:\/(?<domain>\/\w+.+:\d+|\/\w+.\w+.\w+)(?<lang>\/en|\/es|\/fr)?(?<controller>\/\w+)?(?<page>\/.+)?/);
console.log(data.groups.domain);

let currentLang = data.groups.lang || null;
if(currentLang != null) currentLang = currentLang.replace('/','');
let currentController = data.groups.controller || null;
if(currentController != null) currentController = currentController.replace('/','');
let currentPage = data.groups.page || null;
if(currentPage != null) currentPage = currentPage.replace('/','');

console.log('currentLang ', currentLang);
console.log('currentController ', currentController);
console.log('currentPage ', currentPage);


const navbarBrand = document.querySelector(".navbar-brand");
console.log(`navbarBrand ${navbarBrand.href}`);

if(window.innerWidth <= 768) {
  navbarBrand.style.padding = "5px 0";
}

if(currentController === "users") {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    // button.classList.add('btn-secondary');
  });
  const modalMenuLinks = document.querySelectorAll('.modal-menu-link');
  modalMenuLinks.forEach(modalMenuLink => {
    modalMenuLink.classList.remove('btn-secondary');
  });
}

if ((currentController === null || 'users') || currentController.match(/en|fr|es/)) {

  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    console.log(card.dataset);
    const element = document.querySelector(`.fa-heart-${card.dataset.recipe}`);
    element.style.opacity = 0;
    const cardImgTop = document.querySelector(`.card-img-top-${card.dataset.recipe}`);
    let clickCount = 0;
    cardImgTop.addEventListener('click', (event) => {
      clickCount++;
      const timeOut = () => {
        setTimeout(() => {
          clickCount = 0;
        }, 400);
      }
      if (clickCount === 1) {
        timeOut();
      } else if (clickCount === 2) {
        const liked = document.querySelector(`[data-like-recipe="${card.dataset.recipe}"]`);
        liked.click();
        clearTimeout(timeOut);
        clickCount = 0;
      }
    });
  });

  if(userSignedIn === "false") {
    scrollToAnchor("#recipes-cards");
    const bannerCtaBox = document.querySelector('#banner-cta-box');
    const bannerCtaBoxBtn = document.querySelector('#banner-cta-box-btn');
    bannerCtaBoxBtn.style.width = `${bannerCtaBox.offsetWidth}px`;
  }
}
