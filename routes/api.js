const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.get("/workouts", (req, res) => {
  Workout.aggregate([{
      $addFields:{
        totalDuration: {$sum: "$exercises.duration"}
      }
    }])
    .sort({ day: -1 })
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(newWorkout => {
      res.json(newWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    {$push:{
      exercises: req.body
      }
    }
  )
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", (req, res) => {
  Workout.aggregate([{
      $addFields:{
        totalDuration: {$sum: "$exercises.duration"}
      }
    }])
  .sort({ day: -1 })
  .then(workout => {
    res.json(workout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});


module.exports = router;