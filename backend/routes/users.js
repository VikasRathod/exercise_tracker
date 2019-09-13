const router = require("express").Router();
let User = require("../models/user.model");

// this is url for localhost:5000/users/
// find method in here is a mongoose method used to list all the users from the mongo db database (find() returns a promise)
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

//handles incoming HTTP post request
//new username is part of req body
//save() is used to save new user to the database
router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
