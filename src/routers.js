const express = require("express");
const routers = express.Router();
const multer = require("multer");

const controllers = require("./controllers");
const middlewares = require("./middlewares");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

routers.post("/signup", upload.single("profile"), controllers.createUser);
routers.get("/profile/:id", controllers.getProfile);
routers.put("/uploadprofile/:id",upload.single("profile"),controllers.uploadProfile);

routers.post("/login", middlewares.auth, controllers.logIn);
routers.get("/fetchlist/:userId", middlewares.tokenAuth, controllers.fetchToDOList);
routers.post("/addtodo", middlewares.tokenAuth, controllers.newToDo);
routers.put("/edittodo", middlewares.tokenAuth, controllers.editToDo);
routers.delete(
  "/deletetodo/:id",
  middlewares.tokenAuth,
  controllers.deleteToDo
);
routers.put("/updatestatus", middlewares.tokenAuth, controllers.statusUpdate);
module.exports = routers;
