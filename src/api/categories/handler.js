const pool = require('../../../db'); // Import the database configuration
const queries =  require('./queries')

const getCategories = (req, res) => {
    pool.query(queries.getCategories, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getCategoriesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCategoriesById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const postCategories = (req, res) => {
    const { name, description, company_id } = req.body;

    pool.query(queries.postCategories, [name, description,company_id], 
    (error, results) => {
        if (error) throw error;
        res.status(201).json({ "message": "Kategori berhasil dibuat.", "body": req.body });
    });
};

const putCategories = (req, res) => {
    const categoryId = req.params.id;
    const { name, 
            company_id,
            description } = req.body;

    pool.query(queries.putCategories, [name, description, company_id, categoryId],
    (error, results) => {
        if (error) {
            console.error('Error Update Categori', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.rowCount === 0) {
                res.status(404).json({ message: `Kategori dengan ID ${categoryId} tidak ditemukan` });
            } else {
                res.status(200).json({ message: `Kategori dengan ID ${categoryId} berhasil diupdate` });
            }
        }
    });
};

const deleteCategories = (req, res) => {
    const categoryId = parseInt(req.params.id);
    pool.query(queries.deleteCategories, [categoryId], (error, results) => {
        if (error) {
            console.error('Error hapus categori:', error);
            res.status(500).send('An error occurred.');
        } else {
            res.status(200).send('Kategori deleted successfully');
        }
    });
};

module.exports = {
    getCategoriesById,
    getCategories,
    postCategories,
    putCategories,
    deleteCategories
}