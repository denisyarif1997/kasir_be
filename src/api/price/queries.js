const getPrice = 'SELECT * FROM Prices where deleted_at is null';
const getPriceById = 'SELECT * FROM Prices WHERE id = $1 AND deleted_at IS NULL';
const postPrice = 'INSERT INTO Prices (product_id, office_id, price, cost)VALUES ($1, $2, $3, $4)RETURNING id';
const putPrice = 'UPDATE Prices SET product_id = $1, office_id = $2, Price = $3, cost = $4,updated_at = CURRENT_TIMESTAMP WHERE id = $6';
const deletePrice = 'UPDATE Prices SET deleted_at = NOW() where id = $1'

module.exports = {
    getPrice,
    getPriceById,
    postPrice,
    putPrice,
    deletePrice,
}
