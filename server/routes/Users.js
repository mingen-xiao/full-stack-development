const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

// Need to use 'async...await...' when use 'sequelize'
// Asynchronous
router.post("/", async (req, res) => {
  // Grab the post data from the 'body' that is sent in the request
  // 拿到請求的數據
  const { username, password } = req.body;
  //   "bcrypt": This library in "npm" allows to hash the contents like Strings (Turns the password into a random String of letters and numbers)
  //   "Hashing": A one-way function so even if someone get the hashed password he wont know the exact password
  //   The only way is to "Hash" the String again and compare hashed values to check if are the SAME Strings
  bcrypt.hash(password, 10).then((hash) => {
    // Tell users model to add new user to the database
    Users.create({
      username: username,
      password: hash,
    });
    // 返回完成反饋
    res.json("SUCCESS");
  });
});

// Asynchronous 異步: Wait for and make sure the data to be inserted before moving forward (with the request or anything else)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } }); // "findONe": Find the only one user name

    if (!user) res.json({ error: "User Doesn't Exit!" });

    //   "password": user used to try to login;
    //   "user.password": user's password stored in the database
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) return res.json({ error: "Wrong Username & Password Combination" });

      // 返回完成反饋
      return res.json("YOU LOGGED IN!");
    });
  } catch (error) {
    console.log("Bad Request", error);
  }
});

module.exports = router;
