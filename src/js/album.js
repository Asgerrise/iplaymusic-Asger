import {searchBarFunction} from "../js/functions.js"; 
import {themeFunction} from "../js/functions.js"; 
import {goBackFunction} from "../js/functions.js"; 
import {whiteHeaderFunction} from "../js/functions.js"; 
import {createTracks} from "../js/functions.js"; 
searchBarFunction();
themeFunction();
whiteHeaderFunction();
goBackFunction();

token = localStorage.getItem("token");
let searchParams = new URLSearchParams(document.location.search);
let paramsId = searchParams.get("id");

fetch(`https://api.spotify.com/v1/albums/${paramsId}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let backgroundImg = document.querySelector(".backgroundImg");
    let title = document.querySelector("#headline");
    let totalTracks = document.querySelector("#total_tracks");

    backgroundImg.setAttribute("src", data.images[0].url);
    title.textContent = data.name;
    totalTracks.textContent = data.total_tracks + " Song(s)";

    fetch(`https://api.spotify.com/v1/albums/${paramsId}/tracks?limit=50`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const container = document.querySelector(".main");

        data.items.forEach((track) => {
          createTracks(track, container);
        });
      });
  });
