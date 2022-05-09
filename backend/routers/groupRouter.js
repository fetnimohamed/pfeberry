import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Group from '../models/groupModel.js';
import {isAuth} from '../utils.js';
import data from '../data.js';

const groupRouter = express.Router();

groupRouter.get('/seed',async (req, res) => {
    const createdGroup = await Group.insertMany(data.groups);
    res.send({createdGroup})
  }
);


groupRouter.post(
  "/create",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const group = new Group({
      name: req.body.name,
      description: req.body.description,
      deleted:req.body.deleted,
    });
    const createdGroup = await group.save();
    res.send({
      _id: createdGroup._id,
      name: createdGroup.name,
      description: createdGroup.description,
      deleted:createdGroup.deleted,
      
    });
  })
);

groupRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const system = await Group.findById(req.params.id);
    if (system) {
      res.send(system);
    } else {
      res.status(404).send({ message: "system Not Found" });
    }
  })
);

groupRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const group = await Group.find();
    res.send({ group });
  })
);

groupRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (group) {
        const deleteGroup = await group.remove();
        res.send({ message: "group Deleted", group: deleteGroup });
     }else {
      res.status(404).send({ message: "group Not Found" });
    }
  })
);
groupRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (group) {
      group.name = req.body.name || group.name;
      group.description = req.body.description || group.description;
      group.deleted = req.body.deleted || group.deleted;
      const updatedGroup = await group.save();
      res.send({ message: 'group Updated', group: updatedGroup });
    } else {
      res.status(404).send({ message: 'group Not Found' });
    }
  })
);


export default groupRouter;