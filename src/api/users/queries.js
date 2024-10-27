const getUser = 'SELECT * FROM Users where deleted_at is null';
const getUserById = 'SELECT * FROM Users WHERE id = $1 AND deleted_at IS NULL';
const getUserByName = 'SELECT * FROM users WHERE name  ilike $1 AND deleted_at is null ';
const postUser = 'INSERT INTO Users (company_id, name, email, password) VALUES ($1, $2, $3, $4)';
const putUser = 'UPDATE Users SET company_id = $1, name = $2, email = $3, passsword = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $6;';
const deleteUser = 'UPDATE Users SET deleted_at = NOW() where id = $1';
const getUserByEmail = 'SELECT * FROM Users WHERE email = $1'; // Add this query for login


module.exports = {
    getUser,
    getUserById,
    getUserByName,
    postUser,
    putUser,
    deleteUser,
    getUserByEmail,
}
