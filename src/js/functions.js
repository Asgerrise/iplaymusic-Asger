export function convertToMinutes(path) {
  let ms = path.duration_ms;
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let restSeconds = (function () {
    if (seconds % 60 < 10) {
      return "0" + (seconds % 60);
    } else {
      return seconds % 60;
    }
  })();

  return `${minutes}:${restSeconds}`;
}

export function createTracks(path, container) {
  let duration = convertToMinutes(path);
  let trackLink = document.createElement("a");
  let songSelector = document.createElement("div");
  songSelector.className = "song-selector hidden";
  trackLink.className = "link";
  trackLink.setAttribute("href", `../player?id=${path.id}`);
  songSelector.innerHTML = `
                <div class="circle circle_small">
                    <ion-icon class="song-selector__icon" name="play"></ion-icon>
                </div>
                <div class="song-selector__text">
                    <p class="song-selector__title">${path.name}</p>
                    <p class="song-selector__artist">${path.artists[0].name}</p>
                </div>
                <p class="song-selector__duration">
                    ${duration}
                </p>
            `;
  trackLink.appendChild(songSelector);
  container.appendChild(trackLink);
  setTimeout(() => {
    songSelector.classList.remove("hidden");
  }, 50);
}

export function goBackFunction() {
  if (document.querySelector("#back")) {
    const backArrow = document.querySelector("#back");
    backArrow.addEventListener("click", () => {
      window.history.back();
    });
  }
}

export function searchBarFunction() {
  if (document.querySelector(".search-bar")) {
    const searchBar = document.querySelector(".search-bar");
    const searchIcon = document.querySelector("#search");
    const mask = document.querySelector(".mask_fullSize");
    const maskAndIcon = [searchIcon, mask];

    function displaySearchBar(event) {
      if (event.target === searchIcon) {
        searchBar.style.width = "100%";
        mask.classList.add("mask_shown");
        return;
      }
      if (event.target === mask) {
        searchBar.style.width = "0px";
        mask.classList.remove("mask_shown");
        return;
      }
    }
    maskAndIcon.forEach((item) =>
      item.addEventListener("click", displaySearchBar)
    );
  }
}

export function themeFunction() {
  let dark = localStorage.getItem("dark");
  const themeBtn = document.querySelector("#theme");
  const stylesheet = document.querySelector("#stylesheet");

  function themeSwitch() {
    console.log(dark);
    if (dark == "false" || dark == false) {
      dark = true;
      stylesheet.setAttribute("href", "../assets/css/dark-style.css");
    } else {
      dark = false;
      stylesheet.setAttribute("href", "../assets/css/style.css");
    }
    window.localStorage.setItem("dark", dark);
  }

  function themeCheck() {
    if (dark == "false" || !dark) {
      stylesheet.setAttribute("href", "../assets/css/style.css");
    } else {
      stylesheet.setAttribute("href", "../assets/css/dark-style.css");
    }
  }

  themeBtn.addEventListener("click", themeSwitch);
  themeCheck();
}

export function loginThemeFunction() {
  let dark = localStorage.getItem("dark");
  const stylesheet = document.querySelector("#stylesheet");

  themeCheck();

  function themeCheck() {
    if (dark == "false") {
      stylesheet.setAttribute("href", "../assets/css/style.css");
    } else {
      stylesheet.setAttribute("href", "../assets/css/dark-style.css");
    }
  }
}

export function welcomeThemeFunction() {
  let dark = localStorage.getItem("dark");
  const stylesheet = document.querySelector("#stylesheet");
  const logo = document.querySelector(".welcome__img");

  themeCheck();

  function themeCheck() {
    if (dark == "false") {
      stylesheet.setAttribute("href", "../assets/css/style.css");
    } else {
      stylesheet.setAttribute("href", "../assets/css/dark-style.css");
      logo.setAttribute("src", "../assets/img/logo-dark.png");
    }
  }
}

export function whiteHeaderFunction() {
  const icons = document.querySelectorAll(".icon");
  const headline = document.querySelector(".headline");

  icons.forEach((icon) => {
    icon.classList.add("text-darkmode");
  });
  headline.classList.add("text-darkmode");

  if (window.location.pathname != "../playlists/") {
    const search = document.querySelector("#search");
    search.classList.add("hidden");
  }
}
