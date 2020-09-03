let token;

let date = new Date();
let time = date.getTime();
let expire = parseInt(localStorage.getItem("tokenTime"));

if (expire + 3600000 < time) {
  deleteToken();
}

if (!localStorage.getItem("token")) {
  getToken();
}
function getToken() {
  let currentTime = new Date();
  let milliseconds = currentTime.getTime();
  localStorage.setItem("tokenTime", milliseconds);

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        btoa(
          "3a86fce1e01f4a21a3292f26df8af32d:b48f6dfe15c7483fb345e79914610590"
        ),
    },
    body: "grant_type=client_credentials",
  })
    .then((response) => response.json())
    .then((data) => {
      token = data.access_token;
      localStorage.setItem("token", token);
    });
}

function deleteToken() {
  localStorage.removeItem("token");
  setTimeout(() => {
    location.reload();
  }, 200);
}
