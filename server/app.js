const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser());

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

app.use(
  cors({
    origin: "*",
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
