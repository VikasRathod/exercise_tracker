const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// this is url for localhost:5000/exercise/
//find() takes exercises from database and returns in the json format or else returns an error.
router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//id is automatically created by MongoDb.
// for returning information about the particular id mentioned.
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

// for deleting a particular using a id parameter
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

//first find the current exercise to be updated using the id parameter
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
