import mongoose from 'mongoose';

const taskReportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    task:{ type: mongoose.Schema.Types.ObjectID, ref: "Task" },
    user:{ type: mongoose.Schema.Types.ObjectID, ref: "User" },
    componentState:{ type: mongoose.Schema.Types.ObjectID, ref: "ComponentState" },
    description:{ type: String, required: true },
    deleted: {
      type: mongoose.Schema.Types.Boolean,
      index: true,
      default: false,
    },
  },

);
const taskReport = mongoose.model('taskReport', taskReportSchema);
export default taskReport;