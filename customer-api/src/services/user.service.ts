import { UserInterface } from "../interfaces/user.interface";
import { User } from "../models";
import bcrypt from "bcrypt";

/**
 * Get user list
 * @returns {Promise<UserInterface[]>}
 */
const getUsers = async (): Promise<UserInterface[]> => {
  return await User.find();
};

/**
 * Create invoice
 * @param {UserInterface} data
 * @returns {Promise<UserInterface>}
 */
const createUser = async (user: UserInterface): Promise<UserInterface> => {
  const existUser = await findUserByEmail(user.email);
  if (!existUser) {
    user = { ...user, password: await hashPassword(user.password), createdDate: new Date(), updatedDate: new Date() }
    return await User.create(user);
  }
  return;
};

const findUserByEmail = async (
  email: string
): Promise<UserInterface> => {
  return await User.findOne({
    email: email,
  });
};

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const checkPassword = async (password: string, user: UserInterface): Promise<boolean> => {
  return await bcrypt.compare(password, user.password);
}

export const UserService = {
  createUser,
  getUsers,
  findUserByEmail,
  hashPassword,
  checkPassword
};
