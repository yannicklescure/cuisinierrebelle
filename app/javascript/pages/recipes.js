import { cookiesToObject } from "../components/cookies";
import { lazyLoad } from "../components/lazy-load";
import { newRecipeButton } from "../components/recipe-button-new";
import { setCardsParams } from "../util";
import { localRecipes } from "../util";
import { fetchRecipes } from "../util";
import { formattedTime } from "../util";

const max = x => {
  if (x === 5) return 25
  else return 24
}

const setLazyLoad = (init, data) => {
  console.log(data);
  init.data = data;
  lazyLoad(init);
}

export const recipes = (location) => {
  // if (currentController === null || currentController === 'users' || currentController === 'bookmarks' || (currentController === 'recipes' && currentPage === null)) {
  // console.log(root.dataset.recipes);
  const body = document.querySelector('body');
  const userSignedIn = body.dataset.user === 'true';
  const cookies = cookiesToObject(document.cookie);
  const device = body.dataset.device;
  const cardsMaxCount = max(setCardsParams().count);
  // const cardsMax = square(setCardsCount(window.innerWidth))

  let options;
  if(userSignedIn) {
    options = {
      headers: {
        'X-User-Email': atob(decodeURIComponent(cookies.user_email)),
        'X-User-Token': atob(decodeURIComponent(cookies.user_token))
      }
    };
  } else {
    options = {};
  }

  const init = {
    // url: `/api/v1/recipes?cards=${document.querySelector('#root').dataset.recipes}`,
    url: `/api/v1/recipes?cards=${cardsMaxCount}`,
    userSignedIn: userSignedIn,
    currentController: location.currentController,
    currentPage: location.currentPage,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    locale: location.currentLang,
    device: device,
    cards: cardsMaxCount,
    options: options,
    query: false,
  };
  if (location.query) {
    // console.log(location.query);
    init.url = `/api/v1/recipes?query=${location.query}`;
    init.query = true;
  }

  let data = localRecipes();
  if (data.timestamp < 1599858840836) { // Fix store built before Fri Sep 11, 2020 17:14:00
    localStorage.removeItem('recipes'); // To remove
    data = null;
  }

  const waitingTime = 3 * 60 * 1000; // 3 minutes
  console.log(data);
  // if (!data) data = { timestamp: new Date().getTime() }
  if (data != null) {
    formattedTime(data.timestamp);
    formattedTime(data.timestamp + waitingTime);
    formattedTime(new Date().getTime());
  }

  if (data && !(data.timestamp + waitingTime <= new Date().getTime())) {
    console.log('localStorage');
    setLazyLoad(init, data);
  }
  else {
    console.log('fetch server');
    fetchRecipes(init).then(result => setLazyLoad(init, result));
  }

  if (userSignedIn && device === 'desktop') {
    setTimeout(() => {
      newRecipeButton(location);
    },2000);
  }
  // }
}
