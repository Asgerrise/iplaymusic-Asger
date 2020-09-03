import { searchBarFunction } from "../assets/js/functions.js";
import { themeFunction } from "../assets/js/functions.js";
import { goBackFunction } from "../assets/js/functions.js";
import { createTracks } from "../assets/js/functions.js";
searchBarFunction();
themeFunction();
goBackFunction();

token = localStorage.getItem("token");
let searchParams = new URLSearchParams(document.location.search);
let paramsId = searchParams.get("q");

fetch(`https://api.spotify.com/v1/search?q=${paramsId}&type=track`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.tracks.items);
    const container = document.querySelector(".main");

    data.tracks.items.forEach((track) => createTracks(track, container));
  });
