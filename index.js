let container = document.querySelector(".video-container");

/* Search Bar*/

let main = async () => {
  try {
    let query = document.getElementById("search").value;
    // console.log(query);
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${query}&part=snippet&key=AIzaSyBw9fvK4EvMOsRk-iRs_TeYE1T4f_EAC9Y&maxResults=20&autoplay=1`
    );

    let { items } = await res.json();
    //console.log(data);
    let arr_videos = items;
    appendData(arr_videos);
  } catch (err) {
    console.log(err);
  }
};
let Searchdisplay = document.getElementById("Searchdisplay ");
let appendData = (data) => {
  Searchdisplay.innerHTML = null;
  data.forEach(({ snippet: { title }, id: { videoId } }) => {
    let div = document.createElement("div");
    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allow = "fullscreen";
    iframe.autoplay = true;
    let name = document.createElement("h4");
    name.innerText = title;

    let channelName = document.createElement("h3");

    div.append(iframe, name, channelName);
    Searchdisplay.append(div);

    console.log(title, videoId);
  });
};

/* Video Display */
let api = "AIzaSyBw9fvK4EvMOsRk-iRs_TeYE1T4f_EAC9Y";
const videoCardContainer = document.querySelector(".video-container");
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  video_http +
    new URLSearchParams({
      key: api,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
};
