import mongoose from "mongoose";

// Exercise Schema
const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  sets: {
    type: String,
    required: false,
  },
  reps: {
    type: String,
    required: false,
  }
});

// Day Schema
const DaySchema = new mongoose.Schema({
  tag: {
    type: String,
    required: false,
  },
  exercise: {
    type: [ExerciseSchema],
    default: undefined
  }
});

// Weekly Workout Plan Schema
const WorkoutPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  monday: DaySchema,
  tuesday: DaySchema,
  wednesday: DaySchema,
  thursday: DaySchema,
  friday: DaySchema,
  saturday: DaySchema,
  sunday: DaySchema,
}, { timestamps: true });

export default mongoose.model("WorkoutPlan", WorkoutPlanSchema);
