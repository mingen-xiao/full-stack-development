// "Middleware": A "Function" that runs BEFORE a "Request" and check if want to continue with the request or not

// "This file": Aim to be able to grab the token that is sent from the front end,
// then validate by using "jwt" function called "Verify" to verify if it's valid
// If valid, then continue with the request and send the comment and add the comment to database
// If not, then return some "json" response in the request with some error

// Get the stuff from the "req";
// Send stuff back by the "res";
// "next" is a function when want the request to move forward

const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  // Grab the "token" from front end,
  // Check if the user is authenticated.
  // If YES call "next", if not then return error
  const accessToken = req.header("accessToken");

  // Not access yet
  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    // verify the user by validating token
    const validToken = verify(accessToken, "importantsecret");
    // if true, return the "next" function to get access
    if (validToken) {
        return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
