import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken,isAuth} from '../utils.js';

const userRouter = express.Router();

userRouter.get('/seed',async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers})
  }
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  "/register",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      fistName: createdUser.fistName,
      LastName: createdUser.LastName,
      email: createdUser.email,
      password:createdUser.password,
      
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.get(
  "/",
  //isAuth,
 
  expressAsyncHandler(async (req, res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const skip =pageSize * (page - 1)
    const users = await User.find()
      .skip(skip)
      .limit(pageSize);
    const count = await User .count();
    const pages= Math.ceil(count/ pageSize);
    
    res.send({ page, pages ,pageSize,users});;
  })
);

userRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
     if (user.email === "admin@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;}

        const deleteUser = await user.remove();
        res.send({ message: "User Deleted", user: deleteUser });
     }else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
userRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.isSuperAdmin=req.body.isSuperAdmin||user.isSuperAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


export default userRouter;