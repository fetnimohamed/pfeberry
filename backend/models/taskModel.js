import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    taskTheme: { type: mongoose.Schema.Types.ObjectID, ref: "taskTheme" },
    taskModel: { type: mongoose.Schema.Types.ObjectID, ref: "taskModel" },
    week:{ type: mongoose.Schema.Types.ObjectID, ref: "week" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "user" },
    description: { type: String, required: true },
    state: { type: mongoose.Schema.Types.ObjectID, ref: "taskState" },
    report: { type: mongoose.Schema.Types.ObjectID, ref: "taskReport" },
    
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", TaskSchema);
export default Task;
