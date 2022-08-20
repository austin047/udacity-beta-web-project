import express from "express";
import userModel from '../handlers/user'
import {ParamValidation, validateRequestParams} from "../middleware/param-validator";


const authRouter = express.Router();

authRouter.route('/signup')
    /** POST /api/users - Create new user */
    .post(validateRequestParams(ParamValidation.createUser), userModel.create)

authRouter.route('/login')
    /** GET /api/users - Get user*/
    .post(userModel.authenticate)


export default authRouter;

