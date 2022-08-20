import express from "express";
import userModel from '../handlers/user'
import {ParamValidation, validateRequestParams} from "../middleware/param-validator";
import {validateToken} from "../middleware/token_validator";


import reviewModel from "../handlers/review";


const userRouter = express.Router();

userRouter.route('/')
    /** GET /api/users - Get user*/
    .get(validateToken, userModel.index)
    /** POST /api/users - Create new user */
    .post(validateRequestParams(ParamValidation.createUser), userModel.create)

// userRouter.route('/login')
//     /** GET /api/users - Get user*/
//     .post(userModel.authenticate)

userRouter.route('/me')
    /** GET /api/users/userId - Get user*/
    .get(validateToken, userModel.show)
    .delete(validateToken, userModel.delete)

userRouter.route('/reviews')
    .get(validateToken, validateRequestParams(ParamValidation.paginationParams), reviewModel.getUserReviews)

userRouter.route('/list-websites')
    .get(validateToken, validateRequestParams(ParamValidation.listWebsite), userModel.getWebsites)

userRouter.route('/:userId/profile')
    /** GET /api/users/userId - Get user*/
    .get(validateToken, validateRequestParams(ParamValidation.retieveUser), userModel.getUserById)


export default userRouter;

