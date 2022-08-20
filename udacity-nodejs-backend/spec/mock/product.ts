import {Review} from "../../src/models/review.store";

export const correctReview: Omit<Review, 'createdAt'> = {
    "id": 3,
    "userId": 2,
    "websiteId": 1,
    // "createdAt": "2022-08-12T23:00:00.000Z",
    "comment": "Comment Name",
    "rating": 3
};
