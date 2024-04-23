const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

// Need to use 'async...await...' when use 'sequelize'
router.get("/", validateToken, async (req, res) => {
  // findAll(): function in 'sequelize' to get all the data in the database
  const listOfPosts = await Posts.findAll({ include: [Likes] });

  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  // return the result
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  // "await": wait for the data to be returned
  // ".findByPk(id)": find by the Primary Key
  const post = await Posts.findByPk(id);
  res.json(post);
});

// Asynchronous
router.post("/", validateToken, async (req, res) => {
  // Grab the post data from the 'body' that is sent in the request
  // 拿到請求的數據
  const post = req.body;
  post.username = req.user.username;
  // Asynchronous 異步: Wait for and make sure the data to be inserted before moving forward (with the request or anything else)
  // 把拿到的數據創建到Posts這個數據庫裏
  await Posts.create(post); // Add this new post into the database
  // 返回完成反饋
  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({ where: { id: postId } });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;