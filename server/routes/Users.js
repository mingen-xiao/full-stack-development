const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

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
      if (!match)
        return res.json({ error: "Wrong Username & Password Combination" });

      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );
      // 返回完成反饋
      // Not only return the token, but also username & id
      res.json({ token: accessToken, username: username, id: user.id });
    });
  } catch (error) {
    console.log("Bad Request", error);
  }
});

// To get information & return who (which user) os logged in
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    // Query from the "Users Table", the user with the id = id
    // Pass some actual information to this Query, where the info is just to telling the query
    // to exclude the Password so that no return the Password from the back-end and not showing in the front-end
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

// STEP 6
// Change the password
router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  //   Check if the editor knows the old password before changing to new password
  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) return res.json({ error: "Wrong Password Entered!" });

    //   If entered old password correctly, generate new "hash number" for the new password
    //   "bcrypt": This library in "npm" allows to hash the contents like Strings (Turns the password into a random String of letters and numbers)
    //   "Hashing": A one-way function so even if someone get the hashed password he wont know the exact password
    //   The only way is to "Hash" the String again and compare hashed values to check if are the SAME Strings
    bcrypt.hash(newPassword, 10).then((hash) => {
      // "update({a}, {b})": a (what changes to update); b (when to update the request)
      // No need to aysnc...await... because not waiting anything
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      // 返回完成反饋
      res.json("SUCCESS");
    });
  });
});

module.exports = router;
