const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("hello");
});

router.post("/login", (req, res, next) => {
  console.log(req.body.name, "credentials");

  if (req.body.name === "admin" && req.body.pass === "admin") {
    return res.json({ valid: true });
  } else {
    return res.json({ valid: false });
  }
});

router.post("/movies", async (req, res, next) => {
  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=f68f2cab${req.query[0]}`;
  const { data } = await axios.get(url);
  return res.send(data);
});

module.exports = router;
