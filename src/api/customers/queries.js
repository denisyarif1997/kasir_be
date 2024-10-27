const getCustomer = 'SELECT * FROM Customers where deleted_at is null';
const getCustomerByName = 'SELECT * FROM Customers WHERE name  ilike $1 AND deleted_at is null ';
const postCustomer = 'INSERT INTO Customers (company_id,name,phone,address,description)VALUES ($1, $2, $3, $4, $5)RETURNING id';
const putCustomer = 'UPDATE Customers SET company_id = $1, name = $2, address = $3, description = $4, phone = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6';
const deleteCustomer = 'UPDATE Customers SET deleted_at = NOW() where id = $1'

module.exports = {
    getCustomer,
    getCustomerByName,
    postCustomer,
    putCustomer,
    deleteCustomer,
}
