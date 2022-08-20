import bcrypt from "bcryptjs";
import {NextFunction, Request, Response} from 'express';
import {createAuthToken} from "../middleware/token_validator";
import {StatusCodes,} from 'http-status-codes';
import {CreateUserType, UserStore} from "../models/user.model";


const userStore = new UserStore()


class UserHandler {

    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Create a user and return the new user object
     * @return {json} Returns json New [User] object
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        try {

            const user: CreateUserType = {
                email: req.body.email,
                userName: req.body.userName,
                password: req.body.password
            }

            const newUser = await userStore.create(user)

            const token = createAuthToken({id: newUser.id, email: newUser.email});

            delete newUser.password;

            res.status(StatusCodes.CREATED).json({
                user: newUser,
                token: token
            })

        } catch (e) {
            if ((e as any).code === "23505") {
                return res.status(StatusCodes.CONFLICT).json({"error": "Email already exists"})
            }


            next(e)
        }

    }

    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get user by userId
     * @return {json} Returns json  [Order] object
     */
    static async show(req: Request, res: Response, next: NextFunction) {
        try {

            // @ts-ignore
            const userId = req.user.id;

            const user = await userStore.show(Number(userId))

            if (!user) return res.status(StatusCodes.NOT_FOUND).json({})

            res.status(StatusCodes.OK).json(user)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get user by userId
     * @return {json} Returns json  [Order] object
     */
    static async getUserById(req: Request, res: Response, next: NextFunction) {
        try {

            const {userId} = req.params;

            const user = await userStore.show(Number(userId))

            if (!user) return res.status(StatusCodes.NOT_FOUND).json({})

            res.status(StatusCodes.OK).json(user)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @static
     * @param _req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Get list of all users
     * @return {json} Returns json [List<Order>] object
     */
    static async index(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userStore.index()
            res.status(StatusCodes.OK).json(users)

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
     * @return {json} Returns json [List<Order>] object
     */
    static async authenticate(req: Request, res: Response, next: NextFunction) {
        try {

            const {email, password} = req.body

            const user = await userStore.getUserByEmail(email)

            if (!user) return res.status(StatusCodes.NOT_FOUND).json({error: "user not found"})

            const pepper = process.env.PASSWORD_SALT

            if (!pepper) return next("Pepper not found")


            if (bcrypt.compareSync(password + pepper, user.password!)) {
                const token = createAuthToken({id: user.id, email: user.email});

                delete user.password;

                res.status(StatusCodes.OK).send({
                    user: user,
                    token: token
                })
            } else {
                res.status(StatusCodes.UNAUTHORIZED
                ).json({
                    error: "password is not correct"
                })
            }

        } catch (e) {
            next(e)
        }
    }


    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlwareFunction
     * @description - Delete user
     * @return {json} Returns json [List<Order>] object
     */
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            // const {userId} = req.params
            // @ts-ignore
            const userId = req.user.id;

            await userStore.delete(Number(userId))

            res.status(StatusCodes.OK).json({})

        } catch (e) {
            next(e)
        }
    }


    /**
     * @static
     * @param req - RequestBody
     * @param res - ResponseBody
     * @param next - NextMiddlewareFunction
     * @description - Delete user
     * @return {json} Returns json [List<Websites>] object
     */
    static async getWebsites(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const userId = req.user.id;

            const skip = req.query.skip;
            const limit = req.query.limit;

            const websites = await userStore.getWebsitesByUserId({
                userId: userId,
                skip: Number(skip),
                limit: Number(limit)
            })

            res.json(websites);

        } catch (e) {
            next(e);
        }
    }
}

export default UserHandler