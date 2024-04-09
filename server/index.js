const express = require("express");
const app = express();

// To parse the JSON when acted as the body request and be able to access it
app.use(express.json());

const db = require('./models')

// Routers
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter);


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
})