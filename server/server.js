const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const axios = require("axios");

// add your endpoints here
app.get("/", (request, response) => response.json("Root route for translatim"));

app.get("/translate", async (request, response) => {
  // const word = request.query.word;
  // const from = request.query.from;
  // const to = request.query.to;

  const { word, from, to } = request.query; //destructure all the properties from request.query into variables

  const API = `https://api.mymemory.translated.net/get?q=${word}!&langpair=${from}|${to}`;
  const res = await axios.get(API);

  const imageAPI = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${res.data.responseData.translatedText}`;
  const resImage = await axios.get(imageAPI);

  const gifAPI = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_ACCESS_KEY}&q=${res.data.responseData.translatedText}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  const resGif = await axios.get(gifAPI);

  const wrangledData = {
    translation: res.data.responseData.translatedText,
    match: res.data.responseData.match,
    image: resImage.data.results[0].urls.regular,
    gif: resGif.data.data[0].images.original.url,
  };

  response.json(wrangledData);
});

app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
