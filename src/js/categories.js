import { searchBarFunction } from "../js/functions.js";
import { themeFunction } from "../js/functions.js";
import { goBackFunction } from "../js/functions.js";
searchBarFunction();
themeFunction();
goBackFunction();

const navIcon = document.querySelector("#categories");
navIcon.classList.add("linkWIcon__icon_active");

function foldToggle(e) {
  let content = e.target.nextElementSibling;

  if (content.style.maxHeight) {
    content.classList.remove("fold-out_active");
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + 20 + "px";
    content.classList.add("fold-out_active");
  }
}

token = localStorage.getItem("token");

fetch("https://api.spotify.com/v1/browse/categories?limit=9&country=DK", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.categories.items);

    const categories = document.querySelector(".main");
    const colorArray = [
      "red",
      "orangeRed",
      "orange",
      "yellow",
      "lightGreen",
      "green",
      "teal",
      "lightBlue",
      "blue",
    ];

    function createCategory(category, index) {
      let btn = document.createElement("div");
      btn.className = "fold-out";
      btn.innerHTML = `
        <button class="btn btn_wide btn_wIcon btn_${colorArray[index]} rounded">${category.name}
          <ion-icon class="btn__icon" name="ellipsis-horizontal"></ion-icon>
        </button>
      `;

      fetch(`https://api.spotify.com/v1/browse/categories/${category.id}/playlists?limit=8`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let subs = document.createElement("div");
          subs.className = "fold-out__subs";

          data.playlists.items.forEach(playlist => {
            let sub = document.createElement("div");
            sub.className = "fold-out__sub";
            sub.innerHTML = `
                <p class="fold-out__sub-text">${playlist.name}</p>
                <ion-icon class="fold-out__icon" name="chevron-forward"></ion-icon>
            `;
            subs.appendChild(sub);
          })
          btn.appendChild(subs);
        });

      categories.appendChild(btn);
      btn.addEventListener("click", foldToggle);
    }

    data.categories.items.forEach((category, index) => {
      createCategory(category, index);
    });
  });
