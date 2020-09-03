import {searchBarFunction} from "../js/functions.js"; 
import {themeFunction} from "../js/functions.js"; 
import {goBackFunction} from "../js/functions.js"; 
searchBarFunction();
themeFunction();
goBackFunction();

token = localStorage.getItem("token");

const navIcon = document.querySelector("#albums");
navIcon.classList.add("linkWIcon__icon_active");

fetch("https://api.spotify.com/v1/browse/new-releases?country=DK", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const slider = document.querySelector(".slider");
    const container = document.querySelector(".container");

    function createAlbum(album) {
      let albumImg = document.createElement("a");
      albumImg.className = "slider__item";
      albumImg.setAttribute("href", `../album/?id=${album.id}`);
      albumImg.innerHTML = `
                        <img class="slider__img slider__img_first rounded" src="${album.images[1].url}" alt="${album.name}" style="width:155px; height:155px;">
                    `;

      let spinner = document.createElement("div");
      spinner.className = "spinner__icon spinner_small";

      albumImg.appendChild(spinner);
      slider.appendChild(albumImg);
    }

    function createFeatured(featured) {
      let albumLink = document.createElement("a");
      albumLink.className = "link";
      albumLink.setAttribute("href", `../album/?id=${featured.id}`);
      albumLink.innerHTML = `
            <div class="song-selector song-selector_wImg">
            <div class="song-selector__img-container">
                <img src="${featured.images[0].url}" alt="${featured.name}" class="song-selector__img rounded" style="width:50px; height:50px">
            </div>
            <div class="song-selector__text">
                <p class="song-selector__title">${featured.name}</p>
                <p class="song-selector__artist">${featured.artists[0].name}</p>
            </div>
            <p class="song-selector__duration song-selector_album-tracks">
                ${featured.total_tracks} tracks
            </p>
            </div>
            `;

      container.appendChild(albumLink);
    }
    data.albums.items.forEach((featured) => {
      createFeatured(featured);
    });

    data.albums.items.forEach((album) => {
      createAlbum(album);
    });
  });
