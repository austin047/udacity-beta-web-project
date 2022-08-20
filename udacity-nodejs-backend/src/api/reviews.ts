import express from "express";
import {ParamValidation, validateRequestParams} from "../middleware/param-validator";
import {validateToken} from "../middleware/token_validator";
import reviewModel from "../handlers/review";


const reviewRouter = express.Router();

reviewRouter.route('/')
    /** GET /api/review - Get user*/
    .get(reviewModel.index)

    /** POST /api/review - Create Review*/
    .post(validateToken, validateRequestParams(ParamValidation.createReview), reviewModel.create)

reviewRouter.route('/:reviewId')
    /** GET /api/reviews/:reviewId - Get user*/
    .get(validateRequestParams(ParamValidation.retrieveReview), reviewModel.show)

    /** GET /api/reviews/:reviewId */
    .delete(validateToken, validateRequestParams(ParamValidation.retrieveReview), reviewModel.delete)

//
//     /** GET /api/orders/users/userId - Get user*/
//     .put(validateToken,validateRequestParams(ParamValidation.updateOrder), orderModel.update)
//

//
// reviewRouter.route('/users/:userId')
//     /** GET /api/orders/users - Get user*/
//     .get(validateToken, validateRequestParams(ParamValidation.retieveUserOrders), orderModel.getUserOrder)
//
//       /** POST /api/orders/users - Create new user */
//     .post(validateToken, validateRequestParams(ParamValidation.createReview),  orderModel.create)
//
// reviewRouter.route('/:orderId/product')
//     /** GET /api/orders/users/userId - Get user*/
//     .post(validateToken,validateRequestParams(ParamValidation.addProductToOrder),  orderModel.addProductToOrder)
//
//     /** GET /api/orders/users/userId - Get product*/
//     .get(validateToken,validateRequestParams(ParamValidation.getOrderProducts), orderModel.getOrderProducts)


export default reviewRouter;