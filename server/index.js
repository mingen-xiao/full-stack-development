const express = require("express");
const app = express();
const cors = require("cors");

// MIDDLEWARE:
// automatically whitelist API so that the connection works
// and able to make an API request that exists in the computer from a react app
app.use(express.json()); // To parse the JSON when acted as the body request and be able to access it
app.use(cors());

const db = require("./models");

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
