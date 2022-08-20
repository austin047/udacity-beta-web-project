export const reviewQueries = {
    createReview: "INSERT INTO reviews (rating, comment, user_id, website_id) VALUES ($1, $2, $3, $4) RETURNING *",
    getReviewById: "SELECT * FROM reviews WHERE id = $1",
    getAllReviews: "SELECT reviews.id, reviews.user_id, reviews.website_id, reviews.comment, reviews.rating, users.username  FROM reviews INNER JOIN users ON users.id=reviews.user_id ORDER BY reviews.created_at LIMIT $1 OFFSET $2",
    getAllReviewsByWebsite: "SELECT reviews.id, reviews.user_id, reviews.website_id, reviews.comment, reviews.rating, users.username  FROM reviews INNER JOIN  users on users.id=reviews.user_id where website_id=$1 ORDER BY reviews.created_at LIMIT $2 OFFSET $3",
    getReviewsByUser: "SELECT reviews.id, reviews.user_id, reviews.website_id, reviews.comment, reviews.rating, websites.name as website_name, url,  users.username FROM reviews INNER JOIN users ON users.id=reviews.user_id INNER JOIN websites ON websites.id=reviews.website_id  WHERE reviews.user_id=$1  ORDER BY reviews.created_at LIMIT $2 OFFSET $3",
    deleteReview: "DELETE FROM reviews WHERE id=$1 AND user_id=$2",
    searchReviews: "SELECT url, name, category, websites.id as domain_id, avg(reviews.rating) as average FROM websites LEFT JOIN reviews ON reviews.website_id=websites.id WHERE LOWER(websites.name) LIKE LOWER($1) GROUP BY name, url, category, domain_id ORDER BY LOWER(name) LIMIT $2 OFFSET $3",
}