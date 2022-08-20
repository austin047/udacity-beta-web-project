import pool from "../database/databaseConnection";
import {reviewQueries} from "../database/queries/reviews.queries";

export type Review = {
    id: number,
    rating: Number,
    comment: string,
    userId: number,
    websiteId: number,
    createdAt: Date,

};


export class ReviewStore {
    async index(params: { limit: number, skip: number }): Promise<Review[]> {
        const client = await pool.connect()

        const {rows} = await client.query(reviewQueries.getAllReviews, [params.limit, params.skip])

        const reviews = rows.map((row) => {
            return {
                id: row.id,
                userId: row.user_id,
                websiteId: row.website_id,
                createdAt: row.created_at,
                comment: row.comment,
                rating: row.rating
            }
        });

        client.release();

        return reviews;
    }

    async getAllReviewsByWebsite(params: { websiteId: string, limit: number, skip: number }): Promise<Review[]> {
        const client = await pool.connect()

        const {rows} = await client.query(reviewQueries.getAllReviewsByWebsite, [params.websiteId, params.limit, params.skip])

        const reviews = rows.map((row) => {
            return {
                id: row.id,
                userId: Number(row.user_id),
                websiteId: Number(row.website_id),
                createdAt: row.created_at,
                comment: row.comment,
                userName: row.username,
                rating: row.rating
            }
        });

        client.release();

        return reviews;
    }


    async show(reviewId: number): Promise<Review | null> {
        const client = await pool.connect()

        const {rows} = await client.query(reviewQueries.getReviewById, [reviewId])

        if (rows.length <= 0) return null

        client.release()

        return {
            id: rows[0].id,
            userId: rows[0].user_id,
            websiteId: rows[0].website_id,
            createdAt: rows[0].created_at,
            comment: rows[0].comment,
            rating: rows[0].rating,
        }
    }

    async reviewsByUser(params: { limit: number, skip: number, userId: number }): Promise<Review[]> {
        const client = await pool.connect()

        const {rows} = await client.query(reviewQueries.getReviewsByUser, [params.userId, params.limit, params.skip])

        client.release()

        return rows.map((row) => {
            return {
                id: row.id,
                userId: row.user_id,
                websiteId: row.website_id,
                createdAt: row.created_at,
                comment: row.comment,
                rating: row.rating,
                userName: row.username,
                websiteName: row.website_name,
                websiteUrl: row.url
            }
        });

    }

    // async orderUserByStatus(userId: number, status: string): Promise<Review[]> {
    //     var client = await pool.connect()
    //
    //     const {rows} = await client.query(reviewQueries.getOrderByUserStatus, [userId, status])
    //
    //     client.release()
    //
    //     return rows.map((row) => {
    //         return {
    //             id: row.id,
    //             userId: row.user_id,
    //             status: row.status,
    //         }
    //     });
    //
    // }

    // async productsForOrder(orderId: Number): Promise<Product[]> {
    //     var client = await pool.connect()
    //
    //     const {rows} = await client.query(reviewQueries.productsForOrder, [orderId])
    //
    //     client.release()
    //
    //     const products = rows.map((row) => {
    //         return {
    //             id: row.id,
    //             name: row.name,
    //             price: Number(row.price),
    //             categoryId: row.category_id
    //         }
    //     })
    //
    //     return products
    //
    // }

    async create(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
        const client = await pool.connect()

        const reviewPayload = [
            review.rating,
            review.comment,
            review.userId,
            review.websiteId
        ];

        const {rows} = await client.query(reviewQueries.createReview, reviewPayload);

        if (rows.length <= 0) throw new Error("InternalError: Order Account Not Created After ALl conditions passed")

        client.release()

        return {
            id: rows[0].id,
            userId: rows[0].user_id,
            websiteId: rows[0].website_id,
            createdAt: rows[0].created_at,
            comment: rows[0].comment,
            rating: rows[0].rating,
        }
    }

    // async createOrderProduct(orderId: Number, productId: Number, productQty: Number): Promise<OrderProduct> {
    //     const client = await pool.connect()
    //
    //     const {rows} = await client.query(reviewQueries.createOrderProduct, [orderId, productId, productQty])
    //
    //     if (rows.length <= 0) throw new Error("InternalError: Order Account Not Created After ALl conditions passed")
    //
    //     client.release()
    //
    //     return {
    //         id: rows[0].id,
    //         orderId: rows[0].order_id,
    //         productId: rows[0].product_id,
    //         productQty: rows[0].product_qty
    //     }
    // }


    // async update(status: string, orderId: Number): Promise<Review> {
    //     const client = await pool.connect()
    //
    //     const {rows} = await client.query(reviewQueries.updateOrder, [status, orderId])
    //
    //     if (rows.length <= 0) throw new Error("InternalError: Order Account Not Created After ALl conditions passed")
    //
    //     client.release()
    //
    //     return {
    //         id: rows[0].id,
    //         userId: rows[0].user_id,
    //         status: rows[0].status,
    //     }
    // }


    async delete(reviewId: string, userId: string): Promise<null> {
        const client = await pool.connect()

        await client.query(reviewQueries.deleteReview, [reviewId, userId])

        client.release()
        return null;
    }
}