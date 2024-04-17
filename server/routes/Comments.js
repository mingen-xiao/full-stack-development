const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  // "await": wait for the data to be returned
  // ".findByPk(id)": find by the Primary Key
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

// "validateToken": Here means receive the request then go hrough the "middleware",
// do all the checks that needs to see if the "token" is VALID, call "next" function is yes
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  // Add comments when using corresponding users acc
  const username = req.user.username;
  // Show username in the database for the specific comments
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

// To delete the comment by the corresponding user, which means need to validate the user token
router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  // Destroy the comment which has the id matched with the parsing id at above
  await Comments.destroy({ where: { id: commentId } });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
