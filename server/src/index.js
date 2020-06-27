const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { notFound, errorHandler } = require("./middlewares");

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "You have request the / path",
  });
});

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
