import server from '../../src/server'
import supertest from "supertest";
import {StatusCodes} from "http-status-codes";
import {Review} from "../../src/models/review.store";
import {Website} from "../../src/models/website.model";

const request = supertest(server);

const correctReview = {
    rating: 3,
    comment: "Random Comment",
};

const newCorrectWebsite = {
    name: "Google LLC",
    url: "googleers.com",
    category: "Search Engine",
    description: "This is a website with which provides search enginer funtionality"
};

const wrongReview = {
    rating: 3
}


describe('## reviews Apis', () => {
    let review: Review;
    let token: string;
    let website: Website;
    //let user: User;

    beforeAll(async () => {
        const userCredential = {userName: "newmistro", email: "reviewomistro@gmail.com", password: "password123"}
        const response = await request
            .post("/api/users")
            .set('Accept', 'application/json')
            .send(userCredential)

        token = response.body.token;
        // user = response.body.user;

        const websiteResponse = await request
            .post("/api/websites")
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(newCorrectWebsite);


        website = websiteResponse.body as Website;

    })

    describe("# POST /api/reviews", () => {

        it('should create a new review', async () => {
            const reviewPayload = {
                ...correctReview,
                websiteId: website.id
            };
            const response = await request
                .post(`/api/websites/${website.id}/reviews`)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(reviewPayload);

            expect(response.status).toBe(StatusCodes.CREATED)
            expect(response.body).toMatchObject(reviewPayload);

            review = response.body;
        });

        it('should return a 400[error] if creating a review without websiteId ]', async () => {
            const url = `/api/websites/${website.id}/reviews`;

            const response = await request.post(url)
                .send(wrongReview)
                .set('Authorization', 'Bearer ' + token)
            expect(response.status).toBe(StatusCodes.BAD_REQUEST)

        });

        it('should return a 403[error] if creating a review without authorization token]', async () => {
            const correctPayload = {
                ...correctReview,
                websiteId: website.id
            };

            const response = await request
                .post(`/api/websites/${website.id}/reviews`)
                .send(correctPayload)
            expect(response.status).toBe(StatusCodes.FORBIDDEN)

        });
    })

    describe("# GET /api/website/:websiteId/:reviewId", () => {
        it('should get list of reviews', async () => {
            const response = await request.get(`/api/websites/${website.id}/reviews?limit=10&skip=0`);

            expect(response.status).toBe(StatusCodes.OK)
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(1)

        });
        it('should get review details', async () => {

            const response = await request.get(`/api/websites/${website.id}/reviews/${review.id}`);
            expect(response.status).toBe(StatusCodes.OK)
            const responseData = response.body as Review

            expect(responseData.id).toBe(review.id)
            expect(responseData.websiteId).toBe(review.websiteId)
            expect(responseData.rating).toBe(review.rating)
        });


        it('should return notfound when review id is not present', async () => {
            const response = await request.get(`/api/websites/${website.id}/reviews/${0}`);
            expect(response.status).toBe(StatusCodes.NOT_FOUND)
        });


        it('get reviews for user', async () => {
            const response = await request
                .get(`/api/users/reviews?limit=10&skip=0`)
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(StatusCodes.OK)
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toEqual(1)
        });


        it('should delete a review', async () => {
            const response = await request
                .delete(`/api/websites/${website.id}/reviews/${review.id}`)
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(StatusCodes.OK)
        });

    })

});



