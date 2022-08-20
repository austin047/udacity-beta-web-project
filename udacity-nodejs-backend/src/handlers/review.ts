import {NextFunction, Request, Response} from 'express';
import {StatusCodes,} from 'http-status-codes';
import {Review, ReviewStore} from "../models/review.store";


const reviewStore = new ReviewStore()

class ReviewHandler {
    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Create a order and return the new order object
     * @return {json} Returns json [order] object
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const userId = req.user.id;

            const {websiteId} = req.params;

            const review: Omit<Review, 'id' | 'createdAt'> = {
                comment: req.body.comment,
                rating: req.body.rating,
                websiteId: Number(websiteId),//req.body.websiteId,
                userId: Number(userId)
            }

            const newOrder = await reviewStore.create(review)

            if (!newOrder) return next(new Error("InternalError: order failed to create"))

            return res.status(StatusCodes.CREATED).json(newOrder)

        } catch (e) {
            next(e)
        }
    }


    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get order by orderId
     * @return {json} Returns json  [order] object
     */
    static async show(req: Request, res: Response, next: NextFunction) {
        try {

            const {reviewId} = req.params;

            const order = await reviewStore.show(Number(reviewId))

            if (!order) return res.status(StatusCodes.NOT_FOUND).json({})

            res.status(StatusCodes.OK).json(order)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get list of all users
     * @return {json} Returns json [List<order>] object
     */
    static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const skip = req.query.skip;
            const limit = req.query.limit;
            // const { websiteId } = req.params;


            const reviews = await reviewStore.index({skip: Number(skip), limit: Number(limit)});

            res.status(StatusCodes.OK).json(reviews)

        } catch (e) {
            next(e)
        }
    }


    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get list of all users
     * @return {json} Returns json [List<order>] object
     */
    static async getReviewsForWebsite(req: Request, res: Response, next: NextFunction) {
        try {
            const skip = req.query.skip;
            const limit = req.query.limit;
            const {websiteId} = req.params;


            const reviews = await reviewStore.getAllReviewsByWebsite({
                websiteId: String(websiteId),
                skip: Number(skip),
                limit: Number(limit)
            });

            res.status(StatusCodes.OK).json(reviews)

        } catch (e) {
            next(e)
        }
    }


    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get all complete orders for users
     * @return {json} Returns json [List<Order>] object
     */
    static async getUserReviews(req: Request, res: Response, next: NextFunction) {
        try {

            // @ts-ignore
            const userId = req.user.id;

            const skip = req.query.skip;
            const limit = req.query.limit;

            const reviews = await reviewStore.reviewsByUser({
                limit: Number(limit),
                skip: Number(skip),
                userId: Number(userId)
            })

            res.json(reviews)

        } catch (e) {
            next(e)
        }
    }

    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get all products for order
     * @return {json} Returns json [List<Order>] object
     */
    // static async getOrderProducts(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { orderId } = req.params;
    //
    //         const products = await reviewStore.productsForOrder(Number(orderId))
    //
    //         return res.status(StatusCodes.OK).json(products)
    //
    //     } catch(e) {
    //         next(e)
    //     }
    // }


    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Delete Order
     * @return {json} Returns json [List<Order>] object
     */
    // static async update (req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { orderId } = req.params
    //         const { status } = req.query;
    //
    //         const order = await reviewStore.update(status as string, Number(orderId))
    //
    //         res.status(StatusCodes.OK).json(order)
    //
    //     } catch(e) {
    //         next(e)
    //     }
    // }


    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Delete Order
     * @return {json} Returns json [List<Order>] object
     */
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {

            // @ts-ignore
            const userId = req.user.id;

            const {reviewId} = req.params


            await reviewStore.delete(reviewId!, userId)

            res.status(StatusCodes.OK).json({})

        } catch (e) {
            next(e)
        }
    }


}

export default ReviewHandler