const getStock = 'SELECT * FROM Stocks where deleted_at is null';
const getStockById = 'SELECT * FROM Stocks WHERE id = $1 AND deleted_at IS NULL';
const postStock = 'INSERT INTO Stocks (product_id, warehouse_id, stock, sale, purchase)VALUES ($1, $2, $3, $4, $5)RETURNING id';
const putStock = 'UPDATE Stocks SET product_id = $1, warehouse_id = $2, stock = $3, sale = $4, purchase= %5,updated_at = CURRENT_TIMESTAMP WHERE id = $6';
const deleteStock = 'UPDATE Stocks SET deleted_at = NOW() where id = $1'

module.exports = {
    getStock,
    getStockById,
    postStock,
    putStock,
    deleteStock,
}
