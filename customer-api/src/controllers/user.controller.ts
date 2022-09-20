import { authService, userService } from "../services";
import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  const result = await userService.getUsers();
  res.send(result);
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: "Fail to create user" });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  const station = await userService.findUserByEmail(req.params.email);
  res.send(station);
};

const loginUser = async (req: Request, res: Response) => {
  const result = await authService.loginAuth(req.body.email, req.body.password);
  res.send(result);
};

export const UserController = {
  getUsers,
  createUser,
  getUserByEmail,
  loginUser,
};
