import { User } from "../models";
import bcrypt from "bcrypt";
import { AuthInterface } from "../interfaces/auth.interface";
import { userService } from ".";
import moment from "moment";
import jwt from 'jsonwebtoken';

/**
 * Get user list
 * @returns {Promise<any>}
 */
const loginAuth = async (email: string, password: string): Promise<any> => {
    const user = await userService.findUserByEmail(email);
    if (!user || !(await userService.checkPassword(password, user))) {
        return;
    }
    return await generateAuthTokens(user);
};

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
 const generateToken = (userId, expires, type, secret = 'crm_@pp') => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  };

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
 const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(60, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires, 'access');
  
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
    };
  };

export const AuthService = {
    loginAuth,
};
