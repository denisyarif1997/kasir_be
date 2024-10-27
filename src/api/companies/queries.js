const getCompanies = 'SELECT * FROM companies where deleted_at is null order by id desc limit 100';
const getCompaniesById = 'SELECT * FROM companies WHERE id = $1 AND deleted_at IS NULL';
const postCompanies = 'INSERT INTO companies (name, description, address, phone, email) VALUES ($1, $2, $3, $4, $5)';
const putCompanies = 'UPDATE companies SET name = $1, description = $2, company_id = $3 WHERE id = $4;';
const deleteCompanies = 'UPDATE companies SET deleted_at = NOW() where id = $1'

module.exports = {
    getCompanies,
    getCompaniesById,
    postCompanies,
    putCompanies,
    deleteCompanies,
}
