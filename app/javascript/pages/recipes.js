import { cookiesToObject } from "../components/cookies";
import { lazyLoad } from "../components/lazy-load";

export const recipes = (root, location) => {
  // if (currentController === null || currentController === 'users' || currentController === 'bookmarks' || (currentController === 'recipes' && currentPage === null)) {
  // console.log(root.dataset.recipes);
  const body = document.querySelector('body');
  const userSignedIn = body.dataset.user === 'true';
  const cookies = cookiesToObject(document.cookie);
  const device = body.dataset.device;

  const init = {
    url: `/api/v1/recipes?cards=${root.dataset.recipes}`,
    userSignedIn: userSignedIn,
    currentController: location.currentController,
    currentPage: location.currentPage,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    locale: location.currentLang,
    device: device
  };
  if (location.query) {
    // console.log(location.query);
    init.url = `/api/v1/recipes?query=${location.query}`;
  }
  lazyLoad(init);

  if (userSignedIn && device === 'desktop') {
    const newRecipeButtonHTML = `<style>
    #new-recipe-btn {
      position: fixed;
      bottom: 45px;
      right: 30px;
      z-index: 999;
    }

    .new-recipe-btn {
      border: none;
      // border-radius: 50%;
      cursor: pointer;
      font-size: 1em;
      // padding: .4em .7em;
      background-color: #dc3544;
      transition: all .3s;
    }

    // .new-recipe-btn:hover {
    //   background-color: #dc3544;
    // }
    </style>
    <a href="https://www.cuisinierrebelle.com/r/new" id="new-recipe-btn" class="new-recipe-btn d-print-none rounded-pill text-decoration-none d-flex align-items-center text-white p-2"></a>`;
    document.querySelector('body').insertAdjacentHTML('afterBegin', newRecipeButtonHTML);
    // console.log(document.querySelector('#new-recipe-btn'));
    const btnIcon = `<span class="material-icons md-18 d-flex m-1">create</span>`;
    // console.log(location.currentLang);
    let btnText = `<span id="new-recipe-btn-text" class="mr-2">`;
    switch(location.currentLang) {
      case "en":
        btnText += `Add new recipe`;
        break;
      case "es":
        btnText += `Agregar nueva receta`;
        break;
      case "fr":
        btnText += `Créer une nouvelle recette`;
        break;
      default:
        btnText += `Créer une nouvelle recette`;
    }
    btnText += `</span>`;
    const newRecipeButton = document.querySelector('#new-recipe-btn');
    newRecipeButton.innerHTML = btnIcon;
    const newRecipeButtonSizeMin = newRecipeButton.offsetWidth;
    console.log(newRecipeButtonSizeMin);
    newRecipeButton.innerHTML = btnIcon + btnText;
    const newRecipeButtonSizeMax = newRecipeButton.offsetWidth;
    console.log(newRecipeButtonSizeMax);
    const newRecipeButtonText = document.querySelector('#new-recipe-btn-text');
    // newRecipeButton.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   console.log('click');
    // });
    newRecipeButton.addEventListener('mouseenter', (event) => {
      // event.currentTarget.innerHTML = btnIcon + btnText;
      event.currentTarget.style.width = `${newRecipeButtonSizeMax}px`;
      setTimeout(() => {
        newRecipeButtonText.classList.remove('d-none');
      }, 300);
    });
    newRecipeButton.addEventListener('mouseleave', (event) => {
      // event.currentTarget.innerHTML = btnIcon;
      event.currentTarget.style.width = `${newRecipeButtonSizeMin}px`;
      newRecipeButtonText.classList.add('d-none');
    });

    let lastScrollTop = 0;

    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    window.addEventListener("scroll", () => { // or window.addEventListener("scroll"....
      let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > lastScrollTop){
        // downscroll code
        // newRecipeButton.innerHTML = btnIcon;
        newRecipeButton.style.width = `${newRecipeButtonSizeMin}px`;
        newRecipeButtonText.classList.add('d-none');
      } else {
        // upscroll code
        // newRecipeButton.innerHTML = btnIcon + btnText;
        newRecipeButton.style.width = `${newRecipeButtonSizeMax}px`;
        setTimeout(() => {
          newRecipeButtonText.classList.remove('d-none');
        }, 300);
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
  }
  // }
}
