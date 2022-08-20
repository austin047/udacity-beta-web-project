import {NextFunction, Request, Response} from 'express';
import {StatusCodes,} from 'http-status-codes';
import {check, param, query, ValidationChain, validationResult} from 'express-validator';


export const validateRequestParams = (validations: Array<ValidationChain>) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            await Promise.all(validations.map((err) => err.run(req)))

            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({errors: result.array()});
            } else {
                next()
            }
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

export const ParamValidation = {
    createUser: [
        check('password', 'Your password must be at least 5 characters').isLength({min: 5}),
        check('userName', 'Should contain userName').notEmpty(),
        check('email', 'Should contain email').notEmpty(),
        check('email', 'Email should be valid').isEmail()

    ],

    retieveUser: [
        param('userId', "User id id missen in url path").notEmpty(),
        param('userId', "User id must be a number").isNumeric()
    ],

    retrieveWebsite: [
        param('websiteId', "Website id id missed in url path").notEmpty(),
        param('websiteId', "Website id must be a number").isNumeric()
    ],

    listWebsite: [
        query('limit', "limit is requires and should be a number").notEmpty(),
        query('skip', "skip is required and should be a number").notEmpty(),
        query('limit', "limit should be a number").notEmpty().isNumeric(),
        query('skip', "skip  should be a number").notEmpty().isNumeric()
    ],

    createWebsite: [
        check('name', "A website must have a name").notEmpty(),
        check('category', "Website must belong to a category").notEmpty(),
        check('description', "Website must have a price").notEmpty(),
        check('url', "url for website must be a valid url").isURL(),
    ],

    paginationParams: [
        query('limit', "limit is required").notEmpty(),
        query('skip', "skip is required").notEmpty(),
        query('limit', "limit should be a number").notEmpty().isNumeric(),
        query('skip', "skip  should be a number").notEmpty().isNumeric()
    ],

    searchParams: [
        query('limit', "limit is required").notEmpty(),
        query('skip', "skip is required").notEmpty(),
        query('limit', "limit should be a number").notEmpty().isNumeric(),
        query('skip', "skip  should be a number").notEmpty().isNumeric(),
        // query('q', "q(query) is required and should be a number").notEmpty()
    ],

    //
    // retieveCategory: [
    //   param('categoryId', "Website id id missen in url path").notEmpty(),
    //   param('categoryId', "Website id must be a number").isNumeric()
    // ],
    //
    //
    // retieveOrder: [
    //   param('orderId', "Order id id missen in url path").notEmpty(),
    //   param('orderId', "Order id must be a number").isNumeric()
    // ],

    // updateOrder: [
    //   param('orderId', "Order id id missen in url path").notEmpty(),
    //   param('orderId', "Order id must be a number").isNumeric(),
    //   query('status').custom( value => {
    //     if(!value || value == "") return  Promise.reject('Please provide status to retrive orders for');
    //     if(['complete', 'pending'].indexOf(value) < 0) return  Promise.reject('Please provide status a valid status [complete, pending]');
    //     return Promise.resolve()
    //   })
    // ],
    //
    // createCategory: [
    //   check('name', "A category must have a name").notEmpty()
    // ],


    createReview: [
        param('websiteId', "Website id is required").notEmpty(),
        check('rating', "Rating is required").notEmpty(),
        check('comment', "Comment is required").notEmpty()
    ],

    retrieveReview: [
        param('reviewId', "User id id missed in url path").notEmpty(),
        param('reviewId', "User id must be a number").isNumeric()
    ],


    //
    // retieveUserOrders: [
    //   param('userId', "User id id missen in url path").notEmpty(),
    //   param('userId', "UserId must be a number").isNumeric(),
    //   query('status').custom( value => {
    //     // if(!value || value == "") return  Promise.reject('Please provide status to retrive orders for');
    //     if(!value || value == "") return  Promise.resolve()
    //
    //     if(['complete', 'pending'].indexOf(value) < 0) return  Promise.reject('Please provide a valid status [complete, pending]');
    //     return Promise.resolve()
    //   })
    // ],
    //
    // createOrder: [
    //   param('userId', "User id id missen in body").notEmpty(),
    //   param('userId', "UserId must be a number").isNumeric(),
    // ],
    //
    // addWebsiteToOrder: [
    //   param('orderId', "Order id is missen in the path").notEmpty(),
    //   check('websiteId', "Website Id is missen in body").notEmpty(),
    //   check('websiteQty', "Website Qty missen in body ").notEmpty()
    // ],
    //
    // getOrderWebsites: [
    //   param('orderId', "Order id is missen in the path").notEmpty()
    // ]
}