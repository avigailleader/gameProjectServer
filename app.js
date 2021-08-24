var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
//const logger = require("morgan");
//var createError = require("http-errors");
var cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require('express-mongo-sanitize');
const app = express();

var apiRouter = require("./routes/api.js");

dotenv.config();
app.use(cors())
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, "./build")));
app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(mongoSanitize());

app.use("/api", apiRouter);
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"))
});
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("connected to mongoose")
);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render("error");
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});

module.exports = app;
