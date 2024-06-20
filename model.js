const mongoose = require("mongoose");

mongoose.connect(process.env.DBPASSWORD);

const workOutSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: [true, "Workout needs a day"],
    },
    activity: {
      type: String,
      required: [true, "Workout needs a activity"],
    },
    reps: {
      type: Number,
      required: false,
    },
  },
  { timeseries: true }
);

const Workout = mongoose.model("Workout", workOutSchema);

module.exports = {
  Workout: Workout,
};
