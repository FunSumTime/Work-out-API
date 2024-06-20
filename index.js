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
