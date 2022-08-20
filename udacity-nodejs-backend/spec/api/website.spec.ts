import server from '../../src/server'
import supertest from "supertest";
import {StatusCodes} from "http-status-codes";
import {Website} from "../../src/models/website.model";

const request = supertest(server);

const newCorrectWebsite = {
    name: "Google LLC",
    url: "google.com",
    category: "Search Engine",
    description: "This is a website with which provides search enginer funtionality"
};

const wrongWebsite = {
    name: "Google LLC",
    category: "Search Engine",
    description: "This is a website with which provides search enginer funtionality"
}


describe('## websites Apis', () => {
    let website: Website;
    let token: string;

    beforeAll(async () => {
        const userCredential = {userName: "newmistro", email: "websitemistro@gmail.com", password: "password123"}
        const response = await request
            .post("/api/users")
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .send(userCredential)

        token = response.body.token;
    })

    describe("# POST /api/websites", () => {
        it('should create a new website', async () => {

            const response = await request
                .post("/api/websites")
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(newCorrectWebsite);

            expect(response.status).toBe(StatusCodes.CREATED)
            expect(response.body).toMatchObject(newCorrectWebsite);

            website = response.body;
        });

        it('should return a 400[error] if creating a website without url ]', async () => {


            const response = await request.post("/api/websites")
                .send(wrongWebsite)
                .set('Authorization', 'Bearer ' + token)
            expect(response.status).toBe(StatusCodes.BAD_REQUEST)

        });

        it('should return a 403[error] if creating a website without authorication token]', async () => {
            const response = await request
                .post("/api/websites")
                .send(newCorrectWebsite)
            expect(response.status).toBe(StatusCodes.FORBIDDEN)

        });
    })

    describe("# GET /api/websites", () => {
        it('should get list of websites', async () => {
            const response = await request.get("/api/websites?limit=10&skip=0");
            expect(response.status).toBe(StatusCodes.OK)
            expect(response.body).toBeInstanceOf(Array);

        });
    })

    describe("# GET Search /api/search", () => {
        it('should search for posts', async () => {
            const response = await request.get(`/api/search?limit=10&skip=0&q=`);

            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThanOrEqual(1)
            expect(response.body[0].averageRating).toBeDefined()
            expect(response.body[0].websiteId).toBeDefined()
        });

        it('should search for posts', async () => {
            const response = await request.get(`/api/search?limit=10&skip=0&q=milk`);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toEqual(0)
        });

    })

    describe("# GET /api/websites/:websiteId", () => {

        it('should get website details', async () => {

            const response = await request.get(`/api/websites/${website.id}`);
            expect(response.status).toBe(StatusCodes.OK)
            const responseData = response.body as Website

            expect(responseData.id).toBe(website.id)
            expect(responseData.name).toBe(website.name)
        });

        it('should return notfound when website id is not present', async () => {
            const response = await request.get(`/api/websites/${0}`);
            expect(response.status).toBe(StatusCodes.NOT_FOUND)
        });


        it('should delete a website', async () => {
            const response = await request
                .delete(`/api/websites/${website.id}`)
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(StatusCodes.OK)
        });

    })

});



