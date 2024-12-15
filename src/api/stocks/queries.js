const getStock = 'select s.id, p."name" as "nama product", s.warehouse_id ,s.stock,s.purchase,s.created_at, s.updated_at from public.stocks s left join public.products p on s.product_id = p.id left join public.warehouses w on s.warehouse_id = w.id where s.deleted_at is null';
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
