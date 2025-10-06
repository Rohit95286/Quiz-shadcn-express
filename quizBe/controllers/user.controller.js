import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import {responseHandler} from "../config/ResponseHandler.js";

dotenv.config();

// --------------------------------- REGISTER ---------------------------------
export const register = async (req, res) => {
  console.log("Register endpoint hit");

  try {
    const {name, email, password, role} = req.body;
    console.log(password, "password");

    // Hash password before saving

    // Create user
    const user = await User.create({
      name,
      email,
      password: password,
      role,
    });

    // Generate JWT
    const token = jwt.sign(
      {user},
      process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY",
      {expiresIn: "7d"}
    );

    // Remove password from response
    const safeUser = {...user.toJSON()};
    delete safeUser.password;

    return responseHandler({
      req,
      res,
      data: {user: safeUser, token},
      success: true,
      status: 200,
      message: "Registration successful",
    });
  } catch (err) {
    console.error(err);

    if (err.name === "SequelizeUniqueConstraintError") {
      return responseHandler({
        req,
        res,
        data: null,
        success: false,
        status: 400,
        message: "User with this email already exists",
      });
    }

    responseHandler({
      req,
      res,
      data: null,
      success: false,
      status: 500,
      message: "Server error",
    });
  }
};

// --------------------------------- LOGIN ---------------------------------
export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Find user by email
    const user = await User.findOne({where: {email}});
    if (!user) {
      return responseHandler({
        req,
        res,
        data: null,
        success: false,
        status: 404,
        message: "User not found",
      });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return responseHandler({
        req,
        res,
        data: null,
        success: false,
        status: 400,
        message: "Wrong password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {user},
      process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY",
      {expiresIn: "7d"}
    );

    // Remove password from response
    const safeUser = {...user.toJSON()};
    delete safeUser.password;

    return responseHandler({
      req,
      res,
      data: {user: safeUser, token},
      success: true,
      status: 200,
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    responseHandler({
      req,
      res,
      data: null,
      success: false,
      status: 500,
      message: "Server error",
    });
  }
};
