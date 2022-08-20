import {NextFunction, Request, Response} from 'express';
import {StatusCodes,} from 'http-status-codes';
import {CreateWebsiteType, WebsiteStore} from "../models/website.model";


const websiteStore = new WebsiteStore()

class WebsiteHandler {
    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Create a Websiteand return the new Websiteobject
     * @return {json} Returns json [Product] object
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        try {

            // @ts-ignore
            const userId = req.user.id;

            const website: CreateWebsiteType = {
                category: req.body.category,
                createdBy: userId,
                description: req.body.description,
                url: req.body.url,
                name: req.body.name
            };

            const newWebsite = await websiteStore.create(website)

            if (!newWebsite) return next(new Error("InternalError: Website failed to create"))

            return res.status(StatusCodes.CREATED).json(newWebsite)

        } catch (e) {
            next(e)
        }
    }


    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get Websiteby productId
     * @return {json} Returns json  [product] object
     */
    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const {websiteId} = req.params;

            const website = await websiteStore.show(Number(websiteId))

            if (!website) return res.status(StatusCodes.NOT_FOUND).json({})

            res.status(StatusCodes.OK).json(website)
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
     * @return {json} Returns json [List<product>] object
     */
    static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const skip = req.query.skip;
            const limit = req.query.limit;


            const websiteList = await websiteStore.index(Number(limit), Number(skip))


            res.status(StatusCodes.OK).json(websiteList)

        } catch (e) {
            next(e)
        }

    }

    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Delete Category
     * @return {json} Returns json [List<Order>] object
     */
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {

            // @ts-ignore
            const userId = req.user.id;

            const {websiteId} = req.params;

            const website = await websiteStore.show(Number(websiteId));

            if (website === null) {
                return res.status(StatusCodes.NOT_FOUND).json({})
            }

            if (Number(website.createdBy) !== Number(userId)) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    error: "Cannot delete website you did not create"
                })
            }

            await websiteStore.delete(Number(websiteId), userId)

            res.status(StatusCodes.OK).json({})

        } catch (e) {
            next(e)
        }
    }


    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Delete Category
     * @return {json} Returns json [List<Order>] object
     */
    static async search(req: Request, res: Response, next: NextFunction) {
        try {

            const skip = req.query.skip;
            const limit = req.query.limit;
            const q = req.query.q ?? "";

            const websites = await websiteStore.searchWebsites({
                limit: Number(limit),
                skip: Number(skip),
                text: String(q)
            })

            res.status(StatusCodes.OK).json(websites)

        } catch (e) {
            next(e)
        }
    }
}

export default WebsiteHandler