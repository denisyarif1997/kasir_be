const getCategories = 'SELECT c.id,c.name,c.description,c2."name" as "Nama Perusahaan" ,c.created_at,c.updated_at FROM categories c left join companies c2 on c2.id = c.company_id WHERE c.deleted_at IS NULL';
const getCategoriesById = 'SELECT * FROM categories WHERE id = $1 AND deleted_at is NULL';
const postCategories = 'INSERT INTO categories (name, description, company_id) VALUES ($1, $2, $3)';
const putCategories = 'UPDATE categories SET name = $1, description = $2, company_id = $3 WHERE id = $4;';
const deleteCategories = 'UPDATE categories SET deleted_at = NOW() where id = $1';

module.exports = {
    getCategoriesById,
    getCategories,
    postCategories,
    putCategories,
    deleteCategories,
}
