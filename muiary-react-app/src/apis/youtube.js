export async function youtubeSearch(text) {
  const url = new URL("https://www.googleapis.com/youtube/v3/search?");
  const params = {
    key: "AIzaSyCG22j7IzlgROf-G5UdfagEJXNZCw5FeOI",
    part: "snippet",
    q: text,
    maxResults: 1,
    type: "video",
  };
  try {
    url.search = new URLSearchParams(params);
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.items[0].id.videoId);
    return data;
  } catch (error) {
    console.log(error);
  }
}