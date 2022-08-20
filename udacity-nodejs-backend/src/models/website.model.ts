import pool from "../database/databaseConnection";
import {websiteQueries} from "../database/queries/website.queries";
import {reviewQueries} from "../database/queries/reviews.queries";


export type Website = {
    id: number,
    name: string,
    url: string,
    category: string,
    description: string,
    createdBy: number,
    createdAt: Date
};

export  type CreateWebsiteType = Omit<Website, "id" | "createdAt">;

export type SearchType = Pick<Website, 'url' | 'name'> & { website_id: string, averageRating: Number }

export class WebsiteStore {
    async index(limit: number, skip: number): Promise<Pick<Website, 'url' | 'name'>[]> {
        let client;

        try {
            client = await pool.connect()

            const {rows} = await client.query(websiteQueries.getAllWebsites, [limit, skip])

            return rows.map((row) => {
                return {
                    id: row.id,
                    name: row.name,
                    url: row.url,
                    category: row.category,
                    description: row.description,
                    createdBy: Number(row.created_by),
                    createdAt: row.created_at
                }
            })
        } catch (e) {
            throw  e;
        } finally {
            client?.release()
        }
    }

    async searchWebsites(params: { limit: number, skip: number, text: string }) {
        let client;

        try {
            client = await pool.connect()

            const {rows} = await client.query(reviewQueries.searchReviews, ['%' + params.text + '%', params.limit, params.skip]);
            return rows.map((row) => {
                return {
                    name: row.name,
                    url: row.url,
                    websiteId: row.domain_id,
                    category: row.category,
                    averageRating: Number(row.average).toFixed(1),
                }
            })
        } catch (e) {
            throw  e;
        } finally {
            client?.release()
        }
    }


    async show(productId: Number): Promise<Website | null> {
        var client = await pool.connect()

        const {rows} = await client.query(websiteQueries.getWebsiteById, [productId])

        if (rows.length <= 0) return null

        client.release()

        return {
            id: rows[0].id,
            name: rows[0].name,
            url: rows[0].url,
            category: rows[0].category,
            description: rows[0].description,
            createdBy: Number(rows[0].created_by),
            createdAt: rows[0].created_at
        }
    }

    async create(website: CreateWebsiteType): Promise<Website> {
        const client = await pool.connect()

        const websitePayload = [
            website.name,
            website.url,
            website.category,
            website.description,
            website.createdBy,
        ]

        const {rows} = await client.query(websiteQueries.createWebsite, websitePayload)

        if (rows.length <= 0) throw new Error("InternalError: Product Account Not Created After ALl conditions passed")

        client.release()

        return {
            id: rows[0].id,
            name: rows[0].name,
            createdBy: Number(rows[0].created_by),
            url: rows[0].url,
            category: rows[0].category,
            description: rows[0].description,
            createdAt: rows[0].created_at
        }
    }


    async delete(websiteId: Number, userId: number): Promise<null> {
        const client = await pool.connect()

        await client.query(websiteQueries.deleteWebsites, [websiteId, userId])

        client.release()
        return null;
    }

    async update(description: string, reviewId: Number): Promise<Website> {
        const client = await pool.connect()

        const {rows} = await client.query(websiteQueries.updateReview, [description, reviewId])

        if (rows.length <= 0) throw new Error("InternalError: Order Account Not Created After ALl conditions passed")

        client.release()

        return {
            id: rows[0].id,
            name: rows[0].name,
            createdBy: Number(rows[0].created_by),
            url: rows[0].url,
            category: rows[0].category,
            description: rows[0].description,
            createdAt: rows[0].created_at
        }
    }
}