export const setCardsParams = () => {
  const width = window.innerWidth;
  console.log(width);
  if (width >= 1600) return {
    count: 6,
    width: 299
  };
  else if (width >= 1400) return {
    count: 5,
    width: 298
  };
  // Extra large screen / wide desktop
  // xl: 1200px
  else if (width >= 1200) return {
    count: 4,
    width: 326
  };
  // Large screen / desktop
  // lg: 992px,
  else if (width >= 992) return {
    count: 4,
    width: 276
  };
  // Medium screen / tablet
  // md: 768px,
  else if (width >= 768) return {
    count: 3,
    width: 304
  };
  // Small screen / phone
  // sm: 576px,
  else if (width >= 576) return {
    count: 2,
    width: 346
  };
  // Extra small screen / phone
  // xs: 0,
  else return {
    count: 1,
    width: 530
  };
}

export const capitalize_Words = (str) => {
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const userParams = (checked, locale) => {
  let result = {
    verified: '',
    checked: ''
  };
  if (checked) {
    switch(locale) {
      case 'fr':
        result.verified = `Vérifié`;
        break;
      case 'es':
        result.verified = `Auditado`;
        break;
      default:
        result.verified = `Verified`;
    }
    result.checked = `<span data-toggle="tooltip" data-placement="top" title="${result.verified}" class="ml-1">
      <i class="material-icons md-16 d-flex" style="font-size: 90%">check_circle</i>
    </span>`;
  }
  return result
}

export const setPictureSize = (picture) => {
  const device = document.querySelector('body').dataset.device;
  if (picture) {
    let pictureWidth = '';
    if (device === 'desktop' || device === 'tablet') {
      pictureWidth = picture.offsetWidth || 260
    } else {
      pictureWidth = window.innerWidth - 30;
    }
    let pictureHeight = `${parseInt(pictureWidth * 9 / 16)}`;
    if ((/url.*/).test(picture.style.backgroundImage)) {
      picture.style.width = `${pictureWidth}px`;
      picture.style.height = `${pictureHeight}px`;
    } else {
      picture.width = pictureWidth;
      picture.height = pictureHeight;
    }
    // console.log(picture);
    // console.log(device);
    // console.log(pictureWidth);
    // console.log(pictureHeight);
    // console.log((/url.*/).test(picture.style.backgroundImage));
  }
}

export const mainbarFixedTop = (init) => {
  const title = document.querySelector(init.title);
  const mainbar = document.querySelector(init.mainbar);
  const content = document.querySelector(init.content);
  let lastScrollTop = 0;
  document.addEventListener('scroll', (event) => {
    const navbarHeight = parseInt(document.querySelector('#navbar-main').offsetHeight);
    // console.log(navbarHeight);
    // console.log(window.scrollY);
    let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
      // downscroll code
      if (window.scrollY > mainbar.offsetTop - navbarHeight) {
        mainbar.classList.add('fixed-top');
        mainbar.style.top = `${navbarHeight}px`;
        title.style.paddingBottom = `${mainbar.clientHeight}px`;
      }
    } else {
      // upscroll code
      if ( window.scrollY < content.offsetTop - mainbar.clientHeight - navbarHeight) {
        title.style.paddingBottom = null;
        mainbar.style.top = null;
        mainbar.classList.remove('fixed-top');
      }
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }, false);
}