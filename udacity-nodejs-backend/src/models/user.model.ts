import pool from "../database/databaseConnection";
import bcrypt from "bcryptjs";
import APIError from "../helpers/APIError";
import {StatusCodes} from "http-status-codes";
import {Website} from "./website.model";
import {userQueries} from "../database/queries/users.queries";
import {websiteQueries} from "../database/queries/website.queries";

export type User = {
    id: number,
    userName: string,
    email: string,
    password?: string,
    createdAt: Date
};

export type CreateUserType = Omit<User, 'id' | 'createdAt'>

export class UserStore {
    async index(): Promise<User[]> {
        const client = await pool.connect()

        const {rows} = await client.query(userQueries.getAllUser)

        const userList = rows.map((row) => {
            return {
                id: row.id,
                userName: row.username,
                email: row.email,
                createdAt: row.created_at
            }
        })

        client.release()


        return userList
    }


    async show(userId: Number): Promise<User | null> {
        const client = await pool.connect()

        const {rows} = await client.query(userQueries.getUser, [userId])

        if (rows.length <= 0) return null

        client.release()

        return {
            id: rows[0].id,
            userName: rows[0].username,
            email: rows[0].email,
            createdAt: rows[0].created_at
        }
    }

    async create(user: CreateUserType): Promise<User> {
        const client = await pool.connect()

        const pepper = process.env.PASSWORD_SALT

        if (!pepper) throw new Error("Pepper not found")

        const userPayload = [
            user.userName,
            user.email,
            bcrypt.hashSync(user.password + pepper, Number(process.env.SALT)),
        ]

        const {rows} = await client.query(userQueries.createUser, userPayload)

        if (rows.length <= 0) throw new Error("InternalError: User Account Not Created After ALl conditions passed")

        client.release()

        return {
            id: rows[0].id,
            userName: rows[0].username,
            email: rows[0].email,
            createdAt: rows[0].created_at
        }

    }

    async getUserByEmail(email: string): Promise<User | null> {
        const client = await pool.connect()

        const {rows} = await client.query(userQueries.getUserByUserName, [email])

        client.release()

        if (rows.length <= 0) return null

        return {
            id: rows[0].id,
            userName: rows[0].username,
            email: rows[0].email,
            password: rows[0].password,
            createdAt: rows[0].created_at
        }

        // const user = rows[0]
        //
        // const pepper = process.env.PASSWORD_SALT
        //
        // if(!pepper) throw new Error("Pepper not found")
        //
        // client.release()
        //
        // if(bcrypt.compareSync(password+pepper, user.password)) {
        //     return  {
        //         id: rows[0].id,
        //         userName: rows[0].username,
        //         email: rows[0].email,
        //         createdAt: rows[0].created_at
        //     }
        // } else throw new APIError("User is not Authorized", StatusCodes.UNAUTHORIZED, true)
    }

    async authenticate(email: string, password: string): Promise<User | null> {
        const client = await pool.connect()

        const {rows} = await client.query(userQueries.getUserByUserName, [email])

        if (rows.length <= 0) return null

        const user = rows[0]

        const pepper = process.env.PASSWORD_SALT

        if (!pepper) throw new Error("Pepper not found")

        client.release()

        if (bcrypt.compareSync(password + pepper, user.password)) {
            return {
                id: rows[0].id,
                userName: rows[0].username,
                email: rows[0].email,
                createdAt: rows[0].created_at
            }
        } else throw new APIError("User is not Authorized", StatusCodes.UNAUTHORIZED, true)
    }

    async delete(userId: Number): Promise<null> {
        const client = await pool.connect()

        await client.query(userQueries.deleteUser, [userId])

        client.release()

        return null;
    }


    async getWebsitesByUserId(param: { userId: Number, limit: number, skip: number }): Promise<Array<Website>> {
        const client = await pool.connect()

        const {rows} = await client.query(websiteQueries.getWebsitesByUserId, [param.userId, param.limit, param.skip])

        client.release()

        return rows.map((row) => {
            return {
                id: row.id,
                name: row.name,
                url: row.url,
                category: row.category,
                description: row.description,
                createdBy: row.created_by,
                createdAt: row.created_at
            }
        });
    }
}