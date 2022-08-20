import {StatusCodes,} from 'http-status-codes';
import {User} from "../../src/models/user.model";

import server from '../../src/server'
import supertest from "supertest";
// @ts-ignore
import {noEmailUser} from "../mock/user";

const request = supertest(server);


describe('## User Apis', () => {
    let token: string;
    let user: User;

    describe("# POST /api/users", () => {
        it('should creat a new user', async () => {
            const userCredential = {userName: "newmistro", email: "newmistro@gmail.com", password: "password123"}
            const response = await request
                .post("/api/users")
                .send(userCredential)

            expect(response.status).toBe(201)
            expect(response.body.user).toMatchObject({userName: "newmistro", email: "newmistro@gmail.com"})

            token = response.body.token;
            user = response.body.user;
        });

        it('should return a 400 error if no email not provided', async () => {

            const response = await request.post("/api/users")
                .send(noEmailUser)
                .set('Accept', 'application/json')
            expect(response.status).toBe(StatusCodes.BAD_REQUEST)
        });

    })

    describe("# GET /api/users", () => {
        it('should get list of users', async () => {

            const response = await request.get("/api/users").set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(StatusCodes.OK)
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0)
        });
    })

    describe("# GET /api/users/:userId", () => {
        // let user:  IUser

        it('should get my profile only based on my auth token', async () => {
            const response = await request
                .get(`/api/users/me`)
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(StatusCodes.OK)

            const responseData = response.body as User;
            expect(responseData.id).toBe(user.id)
            expect(responseData.userName).toBe(user.userName)
        });

        it('should get user details', async () => {
            const response = await request
                .get(`/api/users/${user.id}/profile`)
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(StatusCodes.OK)

            const responseData = response.body as User;
            expect(responseData.id).toBe(user.id)
            expect(responseData.userName).toBe(user.userName)
        });


        it('should return notfound when user is not present in system', async () => {
            const response = await request.get(`/api/users/0/profile`).set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(StatusCodes.NOT_FOUND)
        });

        it('should return a status code of 403[FORBIDDEN] when retrieving user details with out auth token', async () => {
            const response = await request
                .get(`/api/users/${user.id}/profile`)
            expect(response.status).toBe(StatusCodes.FORBIDDEN)
        });

        it('should return a status code of 401[UNAUTHORIZED] when retriving user details with wrong auth token', async () => {

            const response = await request
                .get(`/api/users/${user.id}/profile`)
                .set('Authorization', "Bearer wrongauthtoken");
            expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
        });

        it('should delete a user', async () => {
            const response = await request.delete(`/api/users/me`).set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(StatusCodes.OK)
        });

    })


});


