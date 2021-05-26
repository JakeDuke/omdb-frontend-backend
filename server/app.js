const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const redis = require("redis");
const axios = require("axios");
const querystring = require("querystring");
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

app.use(bodyParser());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/movies", cache, async (req, res) => {
  const query = req.query[0];
  try {
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=f68f2cab${query}`;
    const { data } = await axios.get(url);
    const parsed = querystring.parse(req.query[0]);
    // Set key
    const key = Object.values(parsed).join("");
    // Set data to Redis
    client.setex(key, 60, JSON.stringify(data));
    return res.send(data);
  } catch (error) {
    throw error;
  }
});

// Cache middleware
function cache(req, res, next) {
  const parsed = querystring.parse(req.query[0]);
  const key = Object.values(parsed).join("");

  client.get(key, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(data);
      console.log("from cache");
    } else {
      next();
    }
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
