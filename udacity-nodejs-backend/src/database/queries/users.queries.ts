export const userQueries = {
    createUser: "INSERT INTO users (username, email, password) values ($1, $2, $3) RETURNING *",
    deleteUser: "DELETE FROM users where id=$1",
    getUser: "SELECT id, username, email, created_at FROM users WHERE id = $1",
    getAllUser: "SELECT id, username, email  FROM users",
    getUserByUserName: "SELECT * FROM users WHERE email=($1)"
}