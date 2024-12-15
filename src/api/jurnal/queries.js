const getJurnal = 'SELECT id , title, content, date,created_at,updated_at FROM journals where deleted_at is null';
const getJurnalById = 'SELECT id , title, content, date,created_at,updated_at FROM journals WHERE id = $1 AND deleted_at IS NULL';
const postJurnal = 'INSERT INTO journals (title,content,date) VALUES ($1, $2, $3)';
const putJurnal = 'UPDATE journals SET title = $1, content = $2, date = $3, updated_at = NOW() WHERE id = $4';
const deleteJurnal = 'UPDATE journals SET deleted_at = NOW() where id = $1';

module.exports = {
    getJurnal,
    getJurnalById,
    postJurnal,
    putJurnal,
    deleteJurnal,
}
