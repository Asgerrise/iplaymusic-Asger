import {loginThemeFunction} from "../assets/js/functions.js"
loginThemeFunction();

  // FADE IN

  const login = document.querySelector(".login");
  login.classList.add("visible");

  //LOGIN

  const form = document.querySelector(".login-form");

  function validate(e) {
    if (e.target.username.value === "") {
      event.preventDefault();
      e.target.username.style.backgroundColor = "#ffa8bf";
      e.target.username.focus();
      return false;
    }
    e.target.username.style.backgroundColor = "transparent";
    if (e.target.password.value === "") {
      event.preventDefault();
      e.target.password.style.backgroundColor = "#ffa8bf";
      e.target.password.focus();
      return false;
    }
    e.target.password.style.backgroundColor = "transparent";
    window.localStorage.setItem("loggedIn", true);
  }

  form.addEventListener("submit", validate);
