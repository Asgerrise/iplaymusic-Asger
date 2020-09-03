import {searchBarFunction} from "../assets/js/functions.js"; 
import {themeFunction} from "../assets/js/functions.js"; 
import {goBackFunction} from "../assets/js/functions.js"; 
searchBarFunction();
themeFunction();
goBackFunction();

token = localStorage.getItem("token");
let limit = 2;
let offset = -2;

const navIcon = document.querySelector("#featured");
navIcon.classList.add("circle_active");

function loadItems(offset) {

  fetch(
    `https://api.spotify.com/v1/browse/featured-playlists?country=DK&limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const featuredContent = document.querySelector(".container_io");

      function createFeatured(playlist) {
        let imageCardContainer = document.createElement("div");
        let imageCard = document.createElement("a");
        imageCardContainer.className = "spinner";
        imageCard.className = "image-card rounded shadow hidden link link_W";
        imageCard.setAttribute("href", "../playlists");
        imageCard.innerHTML = `
        <img style="height:425px;" src="${playlist.images[0].url}" alt="${playlist.name}" class="image-card__img">
        <div class="image-card__text">
        <h2 class="headline image-card__title">${playlist.name}</h2>
        <p class="image-card__small-text">${playlist.type}</p>
        </div>
        `;
        let spinner = document.createElement("div");
        spinner.className = "spinner__icon";

        imageCardContainer.appendChild(spinner);
        imageCardContainer.appendChild(imageCard);
        featuredContent.appendChild(imageCardContainer);
        setTimeout(() => {
          imageCard.classList.remove("hidden");
        }, 300);
      }

      data.playlists.items.forEach((playlist) => {
        createFeatured(playlist);
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  function triggerObserver(entries) {
    if (entries[0].intersectionRatio <= 0) return;
    offset = offset + 2;
    loadItems(offset);
  }

  let options = {
    threshold: 0,
  };

  let io = new IntersectionObserver(triggerObserver, options);
  io.observe(document.querySelector(".observed"));
});
