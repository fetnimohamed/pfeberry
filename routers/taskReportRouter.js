import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import TaskReport from '../models/taskReportModel.js';
import { generateToken,isAuth} from '../utils.js';

const taskReportRouter = express.Router();




taskReportRouter.post(
  "/create",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskReport = new TaskReport({
       name: req.body.name,
       task:req.body.task,
       user:req.body.user,
       componentState:req.body.componentState,
       description:req.body.description,
    });
    const createdTaskReport = await taskReport.save();
    res.send({
           name: createdTaskReport.name,
           task:createdTaskReport.task,
           user:createdTaskReport.user,
           componentState:createdTaskReport.componentState,
           description:createdTaskReport.description,
      
    });
  })
);

taskReportRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskReport = await TaskReport.findById(req.params.id);
    if (taskReport) {
      res.send(taskReport);
    } else {
      res.status(404).send({ message: "task Report Not Found" });
    }
  })
);

taskReportRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskReport = await TaskReport.find() 
                          .populate('task','name') 
                          .populate('user','firstName')
                          .populate('componentState','name');
    res.send({ taskReport });
  })
);

taskReportRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskReport = await TaskReport.findById(req.params.id);
    if (taskReport) {
        const deleteTaskReport = await taskReport.remove();
        res.send({ message: "task Report Deleted", taskReport: deleteTaskReport });
     }else {
      res.status(404).send({ message: "task Report Not Found" });
    }
  })
);
taskReportRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const taskReport = await TaskReport.findById(req.params.id);
    if (taskReport) {
      taskReport.name = req.body.name || taskReport.name;
      taskReport.description = req.body.description || taskReport.description;
      taskReport.task = req.body.task || taskReport.task;
      taskReport.user = req.body.user || taskReport.user;
      taskReport.componentState = req.body.componentState || taskReport.componentState;
      taskReport.deleted = req.body.deleted || taskReport.deleted;
      const updatedTaskReport = await taskReport.save();
      res.send({ message: 'task Report Updated', taskReport: updatedTaskReport });
    } else {
      res.status(404).send({ message: 'task Report Not Found' });
    }
  })
);


export default taskReportRouter;