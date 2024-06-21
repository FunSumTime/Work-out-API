const express = require("express");
const app = express();
const Workout = require("./model");
const model = require("./model");

const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/workouts", async (request, response) => {
  try {
    let workouts = await model.Workout.find();
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.json(workouts);
  } catch (error) {
    console.log(error);
    response.status(404).send("Generic Error");
  }
});

app.post("/workouts", async (request, response) => {
  try {
    console.log(request.body);
    const data = request.body;
    let newWorkout = new model.Workout({
      day: data.day,
      activity: data.activity,
      reps: data.reps,
    });
    let error = newWorkout.validateSync();
    if (error) {
      response.status(400).json(error);
      return;
    }

    await newWorkout.save();
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(201).json(newWorkout);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic Error");
  }
});

app.put("/workouts/:id", async (request, response) => {
  try {
    const updatedReq = {
      day: request.body.day,
      activity: request.body.activity,
      reps: request.body.reps,
    };
    let putWorkout = await model.Workout.findByIdAndUpdate(
      { _id: request.params.id },
      updatedReq,
      { new: true }
    );

    if (!putWorkout) {
      response.status(404).send("Can't update that");
      return;
    }
    response.status(201).json(putWorkout);
  } catch (error) {
    console.log(error);
    response.status(404).send("Generic Error");
  }
});

app.delete("/workouts/:id", async (request, response) => {
  try {
    console.log("DELETE for single workout");
    console.log(request.params.id);

    let isDelted = await model.Workout.findByIdAndDelete({
      _id: request.params.id,
    });

    if (!isDelted) {
      response.status(404).send("could not find workout");
      return;
    }

    response.status(204).send("Workout deleted");
  } catch (error) {
    console.log(error);
    response.status(404).send("Generic Error");
  }
});

app.get("/workouts/:id", async (request, response) => {
  try {
    let chosenWorkout = await model.Workout.findById({
      _id: request.params.id,
    });
    if (!chosenWorkout) {
      response.status(404).send("Could not find workout");
      return;
    }
    response.status(201).json(chosenWorkout);
  } catch (error) {
    console.log(error);
    response.status(404).send("Generic Error");
  }
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
