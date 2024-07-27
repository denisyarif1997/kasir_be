const getUnits = 'SELECT * FROM Units where deleted_at is null';
const getUnitsById = 'SELECT * FROM Units WHERE id = $1 AND deleted_at IS NULL';
const postUnits = 'INSERT INTO Units (company_id,name,description) VALUES ($1, $2, $3)';
const putUnits = 'UPDATE Units SET company_id = $1, name = $2, description = $3,updated_at = CURRENT_TIMESTAMP WHERE id = $4';
const deleteUnits = 'UPDATE Units SET deleted_at = NOW() where id = $1'

module.exports = {
    getUnits,
    getUnitsById,
    postUnits,
    putUnits,
    deleteUnits,
}
