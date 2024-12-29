var express = require("express");
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const connectDB = require("./helper/connect");
var indexRouter = require("./routes/index");

var app = express();

connectDB();

app.use(cors("*"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", indexRouter);

const port = 3001;
app.listen(port, () => {
  console.log("server is running on port", port);
});

module.exports = app;
