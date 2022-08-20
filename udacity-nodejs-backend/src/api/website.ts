import express from "express";
import {ParamValidation, validateRequestParams} from "../middleware/param-validator";
import {validateToken} from "../middleware/token_validator";
import websiteHandler from "../handlers/website";
import reviewModel from "../handlers/review";


const websiteRouter = express.Router();

websiteRouter.route('/')
    /** GET /api/products - Get user*/
    .get(validateRequestParams(ParamValidation.listWebsite), websiteHandler.index)
    /** POST /api/products - Create new user */
    .post(validateToken, validateRequestParams(ParamValidation.createWebsite), websiteHandler.create)


websiteRouter.route('/:websiteId')
    /** GET /api/products/productId - Get user*/
    .get(validateRequestParams(ParamValidation.retrieveWebsite), websiteHandler.show)

    /** GET /api/products/productId - Get user*/
    .delete(validateToken, validateRequestParams(ParamValidation.retrieveWebsite), websiteHandler.delete)


websiteRouter.route('/:websiteId/reviews')
    /** GET /api/review - Get reviews for website*/
    .get(validateRequestParams(ParamValidation.paginationParams), reviewModel.getReviewsForWebsite)

    /** POST /api/review - Create Review*/
    .post(validateToken, validateRequestParams(ParamValidation.createReview), reviewModel.create)


websiteRouter.route('/:websiteId/reviews/:reviewId')
    /** GET /api/:websiteId/reviews/:reviewId - Get user*/
    .get(validateRequestParams(ParamValidation.retrieveReview), reviewModel.show)

    /** GET /api/:websiteId/reviews/:reviewId */
    .delete(validateToken, validateRequestParams(ParamValidation.retrieveReview), reviewModel.delete)

export default websiteRouter;