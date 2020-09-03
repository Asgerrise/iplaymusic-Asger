import {searchBarFunction} from "../assets/js/functions.js"; 
import {themeFunction} from "../assets/js/functions.js"; 
import {goBackFunction} from "../assets/js/functions.js"; 
import {whiteHeaderFunction} from "../assets/js/functions.js"; 
import {createTracks} from "../assets/js/functions.js"; 
searchBarFunction();
themeFunction();
whiteHeaderFunction();
goBackFunction();

token = localStorage.getItem("token");

const navIcon = document.querySelector("#playlists");
navIcon.classList.add("linkWIcon__icon_active");

fetch(
  `https://api.spotify.com/v1/browse/featured-playlists?country=DK&limit=20`,
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

    const slider = document.querySelector(".slider");

    function createFeatured(playlist) {
      let sliderItem = document.createElement("a");
      sliderItem.className = "slider__item small";
      sliderItem.innerHTML = `
                    <img class="slider__img slider__img_first rounded" data-id="${playlist.id}" 
                    src="${playlist.images[0].url}" alt="${playlist.name}"
                    style="width:155px; height:155px;">
                        `;
      slider.appendChild(sliderItem);
      setTimeout(() => {
        sliderItem.classList.remove("small");
      }, 50);
      sliderItem.addEventListener("click", playlistContent);
    }
    function playlistContent(e) {
      const headline = document.querySelector("#headline");
      const id = e.target.getAttribute("data-id");

      if (!headline.classList.contains("hidden")) {
        headline.classList.add("hidden");
        setTimeout(() => {
          headline.innerText = e.target.getAttribute("alt");
          headline.classList.remove("hidden");
        }, 200);
      } else {
        headline.innerText = e.target.getAttribute("alt");
        setTimeout(() => {
          headline.classList.remove("hidden");
        }, 50);
      }

      fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          const container = document.querySelector(".container");
          container.innerHTML = "";

          data.items.forEach((track) => {
            if (track.track != null) {
              createTracks(track.track, container);
            }
          });
        });
    }
    data.playlists.items.forEach((playlist) => {
      createFeatured(playlist);
    });
  });
