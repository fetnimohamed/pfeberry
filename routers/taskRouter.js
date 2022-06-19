import express from "express";
import expressAsyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";
import TaskState from "../models/taskStateModel.js";
import Week from "../models/weekModel.js";
import Departement from "../models/departementModel.js";
import data from "../data.js";
import { generateToken, isAuth } from "../utils.js";

const taskRouter = express.Router();

taskRouter.get("/seed", async (req, res) => {
  const createdTask = await Task.insertMany(data.tasks);
  res.send({ createdTask });
});

taskRouter.post(
  "/create",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = new Task({
      name: req.body.name,
      description: req.body.description,
      week: req.body.week,
      user: req.body.user,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      taskModel: req.body.taskModel,
      component: req.body.component,
      departement: req.body.departement,
      taskState: req.body.taskState,
    });
    const createdTask = tasks.save();

    res.send({
      _id: createdTask._id,
      name: createdTask.name,
      description: createdTask.description,
      week: createdTask.week,
      user: createdTask.user,
      startDate: createdTask.startDate,
      endDate: createdTask.endDate,
      taskModel: createdTask.taskModel,
      component: createdTask.component,
      departement: createdTask.departement,
      taskState: createdTask.taskState,
    });
  })
);
taskRouter.post("/analyse", async (req, res) => {
  try {
    const tasks = await Task.find({
      taskModel: req.body.modelId,
      component: req.body.componentId,
    });

    var weeks = await Task.distinct("week");
    var weedkData = await Week.find();

    const states = await TaskState.find();
    console.log({ tasks, weeks, states });
    let data = states.map((state) => {
      return { name: state.name, data: [] };
    });
    console.log({ data, states: states });
    weeks.map((week) => {
      states.map((state, i) => {
        data[i].data.push(
          tasks
            .filter((task) => task.week.toString() == week.toString())
            .filter((t) => {
              return t.taskState.toString() === state._id.toString();
            }).length
        );
        console.log(
          tasks
            .filter((task) => task.week == week)
            .filter((t) => {
              t.taskState == state;
            }).length
        );
      });
    });
    weeks = weeks.map(
      (week) => weedkData.find((w) => w._id.toString() === week.toString()).name
    );
    console.log(weeks);
    res.status(200).json({ categories: weeks, data, states });
  } catch (error) {
    res.status(500).send(error);
  }
});
taskRouter.get("/perDepartment", async (req, res) => {
  try {
    const data = { label: [], series: [] };
    const tasks = await Task.aggregate([
      { $group: { _id: "$departement", count: { $sum: 1 } } },
    ]);
    const departements = await Departement.find();
    tasks.map((task) => {
      data.label.push(
        departements.find(
          (departement) => departement._id.toString() === task._id.toString()
        ).name
      );
      data.series.push(task.count);
    });
    res.status(200).json({ ...data });
  } catch (error) {
    res.status(200).send(error);
  }
});

taskRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.findById(req.params.id)
      .populate("week", "name")
      .populate("user", "firstName")
      .populate("taskModel", "name")
      .populate("component", "name")
      .populate("departement", "name")
      .populate("taskState", "name");
    if (tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({ message: "Components Not Found" });
    }
  })
);

taskRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find()
      .populate("week", "name")
      .populate("user", "firstName")
      .populate("taskModel", "name")
      .populate("component", "name")
      .populate("departement", "name")
      .populate("taskState", "name");

    res.send({ tasks });
  })
);

taskRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    if (tasks) {
      const deletetasks = await tasks.remove();
      res.send({ message: "tasks Deleted", tasks: deletetasks });
    } else {
      res.status(404).send({ message: "tasks Not Found" });
    }
  })
);
taskRouter.put(
  "/:id",
  // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.name = req.body.name || task.name;
      task.description = req.body.description || task.description;
      task.week = req.body.week || task.week;
      task.user = req.body.user || task.user;
      task.startDate = req.body.startDate || task.startDate;
      task.endDate = req.body.endDate || task.endDate;
      task.taskModel = req.body.taskModel || task.taskModel;
      task.component = req.body.component || task.component;
      task.departement = req.body.departement || task.departement;
      task.taskState = req.body.taskState || task.taskState;
      const updatedTask = await task.save();
      res.send({ message: "task Updated", task: updatedTask });
    } else {
      res.status(404).send({ message: "task Not Found" });
    }
  })
);

export default taskRouter;
