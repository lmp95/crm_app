import express from "express";
import { userController } from "../controllers";

const router = express.Router();

router
  .route("/")
  .get(userController.getUsers)
  .post(userController.createUser);

router
  .route("/login")
  .post(userController.loginUser);

router
  .route("/:email")
  .get(userController.getUserByEmail)

module.exports = router;
