const getOffice = 'SELECT * FROM offices where deleted_at is null';
const getOfficeById = 'SELECT * FROM offices WHERE id = $1 AND deleted_at IS NULL';
const postOffice = 'INSERT INTO offices (company_id,name,description, address, phone, email) VALUES ($1, $2, $3, $4, $5, $6)';
const putOffice = 'UPDATE offices SET name = $1, description = $2, company_id = $3 WHERE id = $4;';
const deleteOffice = 'UPDATE offices SET deleted_at = NOW() where id = $1'

module.exports = {
    getOffice,
    getOfficeById,
    postOffice,
    putOffice,
    deleteOffice,
}
