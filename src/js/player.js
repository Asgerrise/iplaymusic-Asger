import {goBackFunction} from "../assets/js/functions.js"; 
import {whiteHeaderFunction} from "../assets/js/functions.js"; 
import {convertToMinutes} from "../assets/js/functions.js";

goBackFunction();
whiteHeaderFunction();

let token = localStorage.getItem("token");
let searchParams = new URLSearchParams(document.location.search);
let paramsId = searchParams.get("id");

const audio = document.querySelector("#audio");
const playIcon = document.querySelector("#play");
const player = document.querySelector("#player");
let playing = false;

fetch(`https://api.spotify.com/v1/tracks/${paramsId}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const artistImg = document.querySelector(".artistWRings__img");
    const backgroundImg = document.querySelector(".backgroundImg");
    const songTitle = document.querySelector("#songTitle");
    const artist = document.querySelector(".player__undertitle");
    const songEnd = document.querySelector(".player__end");
    const duration = convertToMinutes(data);

    fetch(`https://api.spotify.com/v1/artists/${data.artists[0].id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        artistImg.setAttribute("src", data.images[1].url);
      });

    backgroundImg.setAttribute("src", data.album.images[0].url);
    songTitle.innerText = data.name;
    artist.innerText = data.artists[0].name;
    songEnd.innerText = duration;
  });

function playPauseSong() {
  let interval = setInterval(() => {
    player.value = audio.currentTime / (audio.duration / 1000);
    if(!playing){
      clearInterval(interval);
    }
  }, 100);
  if (!playing) {
    audio.play();
    playIcon.setAttribute("name", "pause-sharp");
    playing = true;
    return;
  }
  audio.pause();
  playIcon.setAttribute("name", "play-sharp");
  playing = false;
}

function updateSongCurrentTime() {
  audio.currentTime = parseInt((player.value * audio.duration) / 1000);
  console.log(audio.currentTime);
}

player.addEventListener("change", updateSongCurrentTime);
playIcon.addEventListener("click", playPauseSong);