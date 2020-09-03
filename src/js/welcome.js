import {welcomeThemeFunction} from "../js/functions.js"
welcomeThemeFunction();

const welcome = document.querySelector(".welcome");
let loggedIn = localStorage.getItem("loggedIn");

welcome.classList.add("visible");

setTimeout(redirect, 3000);

function redirect() {
  if (!loggedIn) {
    welcome.style.transition = "1s";
    welcome.classList.remove("visible");
    setTimeout(() => {
      window.location.replace("../login");
    }, 1500);
    return;
  }
  welcome.style.transition = "1s";
  welcome.classList.remove("visible");
  setTimeout(() => {
    window.location.replace("../featured");
  }, 1500);
}
