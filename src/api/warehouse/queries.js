const getWarehouse = 'SELECT * FROM Warehouses where deleted_at is null';
const getWarehouseById = 'SELECT * FROM Warehouses WHERE id = $1 AND deleted_at IS NULL';
const postWarehouse = 'INSERT INTO warehouses (office_id,name,description, address, phone) VALUES ($1, $2, $3, $4, $5)';
const putWarehouse = 'UPDATE Warehouses SET office_id = $1, name = $2, description = $3, address = $4, phone = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6;';
const deleteWarehouse = 'UPDATE warehouses SET deleted_at = NOW() where id = $1'

module.exports = {
    getWarehouse,
    getWarehouseById,
    postWarehouse,
    putWarehouse,
    deleteWarehouse,
}
