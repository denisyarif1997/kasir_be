const getProduct = 'SELECT * FROM Products where deleted_at is null';
const getProductByName = 'SELECT * FROM Products where name ilike "%$1%"';
const getProductById = 'SELECT * FROM Products WHERE id = $1 AND deleted_at IS NULL';
const postProduct = 'INSERT INTO Products (company_id, unit_id, category_id, name, description, price, cost, cost_average)VALUES ($1, $2, $3, $4, $5, $6, $7, $8)RETURNING id';
// const putProduct = 'UPDATE Products SET company_id = $1, name = $2, description = $3,updated_at = CURRENT_TIMESTAMP WHERE id = $4';
const deleteProduct = 'UPDATE Products SET deleted_at = NOW() where id = $1'

module.exports = {
    getProduct,
    getProductById,
    getProductByName,
    postProduct,
    deleteProduct,
}
