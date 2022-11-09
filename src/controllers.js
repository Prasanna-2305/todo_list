const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registeredUser = require("./models/userSchema");
const toDoList = require("./models/todoSchema");

exports.createUser = async (req, res) => {
  try {
    const checkuser = await registeredUser.findOne({ email: req.body.email });
    if (checkuser !== null) {
      return res.status(400).send("Email already exist!");
    }

    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    if (req.body.password !== req.body.cpassword) {
      return res.send("Invalid Password").status(404);
    }

    const link = req.protocol + "://" + req.get("host");
    const imagePath = link + "/" + req.file.originalname;

    const addUser = new registeredUser({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
      profile: imagePath,
    });

    await addUser.save();
    const user = await registeredUser.findOne({ email: req.body.email });
    const token = jwt.sign(req.body, process.env.JWT_SECRET_KEY);
    const todo_list = await toDoList.find({ userId: user._id });
    res.status(200).send({
      
      token: token,
      id: user._id,
      name: user.name,
      todo_list: todo_list,
    });
  } catch (e) {
    res.status(404).send(e);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await registeredUser.findOne({ _id: req.params.id });
    res.status(200).send(user);
  } catch (e) {
    res.send(e).status(404);
  }
};

exports.uploadProfile = async (req, res) => {
  try {
    const link = req.protocol + "://" + req.get("host");
    const imagePath = link + "/" + req.file.originalname;
   await registeredUser.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { profile: imagePath } }
    );
    const user = await registeredUser.findOne({ _id: req.params.id });
    res.status(200).send(user);
  } catch (e) {
    res.send(e).status(404);
  }
};

exports.fetchToDOList = async (req, res) => {
  try {
    const todo_list = await toDoList.find({ userId: req.params.userId });
    res.send(todo_list).status(200);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.logIn = async (req, res) => {
  try {
    const user = await registeredUser.findOne({ email: req.body.email });
    const token = jwt.sign(req.body, process.env.JWT_SECRET_KEY);
    const todo_list = await toDoList.find({ userId: user._id });
    res.status(200).send({
      token: token,
      id: user._id,
      name: user.name,
      todo_list: todo_list,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.newToDo = async (req, res) => {
  try {
    const toDo = new toDoList({
      userId: req.body.id,
      todo: req.body.todo,
      status: "pending",
    });
    await toDo.save();
    res.send("todo added successfully!").status(200);
  } catch (e) {
    res.send(e).status(404);
  }
};

exports.editToDo = async (req, res) => {
  try {
    await toDoList.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: { todo: req.body.todo } }
    );
    const list = await toDoList.find();

    res.status(200).send("Successfully edited!");
  } catch (e) {
    res.send(e).status(404);
  }
};

exports.deleteToDo = async (req, res) => {
  try {
    await toDoList.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("Successfully deleted!");
  } catch (e) {
    res.send(e).status(404);
  }
};

exports.statusUpdate = async (req, res) => {
  try {
    await toDoList.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: { status: req.body.status } }
    );

    res.status(200).send("status update successfully");
  } catch (e) {
    res.send(e).status(404);
  }
};
