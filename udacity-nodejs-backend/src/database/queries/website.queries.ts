export const websiteQueries = {
    createWebsite: "INSERT INTO websites (name, url , category, description, created_by ) values ($1, $2, $3, $4, $5) RETURNING *",
    getWebsiteById: "SELECT id, name, url , category, description, created_by FROM websites WHERE id = $1",
    getAllWebsites: "SELECT * FROM websites ORDER BY name LIMIT $1 OFFSET $2",
    deleteWebsites: "DELETE FROM websites where id=$1 AND created_by=$2",
    getWebsitesByUserId: "SELECT * FROM websites WHERE created_by=$1 ORDER BY name LIMIT $2 OFFSET $3",
    updateReview: "UPDATE websites SET description=$1 WHERE id=$2 RETURNING *",
}