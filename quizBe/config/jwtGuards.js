import User from "../models/user.model";
import {responseHandler} from "./ResponseHandler";

export const register = async (req, res) => {
  try {
    const {name, email, password, role} = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({name, email, password: hash, role});
    responseHandler({
      req,
      res,
      data: user,
      message: "User registered",
      status: 201,
    });
  } catch (err) {
    responseHandler({
      req,
      res,
      success: false,
      message: err.message,
      status: 400,
    });
  }
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if (!user)
      return responseHandler({
        req,
        res,
        success: false,
        message: "User not found",
        status: 404,
      });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return responseHandler({
        req,
        res,
        success: false,
        message: "Invalid password",
        status: 401,
      });

    const token = jwt.sign(
      {user},
      process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY",
      {expiresIn: "7d"}
    );
    responseHandler({
      req,
      res,
      data: {token},
      message: "Login successful",
      status: 200,
    });
  } catch (err) {
    responseHandler({req, res, success: false, message: err.message});
  }
};
