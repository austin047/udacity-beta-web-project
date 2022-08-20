import express from "express";
import websiteHandler from "../handlers/website";
import {ParamValidation, validateRequestParams} from "../middleware/param-validator";


const searchRouter = express.Router();


searchRouter.route('/')
    /** GET /api/search - Search Posts*/
    .get(validateRequestParams(ParamValidation.searchParams), websiteHandler.search)

export default searchRouter;