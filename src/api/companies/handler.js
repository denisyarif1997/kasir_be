const pool = require('../../../db'); // Import the database configuration
const queries =  require('./queries')

const getCompanies = (req, res) => {
    pool.query(queries.getCompanies, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getCompaniesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCompaniesById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const postCompanies = (req, res) => {
    const { name, description, address,phone,email } = req.body;

    pool.query(queries.postCompanies, [name, description,address,phone,email], 
    (error, results) => {
        if (error) throw error;
        res.status(201).json({ "message": "company berhasil dibuat.", "body": req.body });
    });
};

const putCompanies = (req, res) => {
    const company_id = req.params.id;
    const { name, 
            description,
            address,
            phone,
            email } = req.body;
    pool.query(queries.putCompanies, [name, description, address,phone,email,company_id],
    (error, results) => {
        if (error) {
            console.error('Error Update Company', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.rowCount === 0) {
                res.status(404).json({ message: `Company dengan ID ${company_id} tidak ditemukan` });
            } else {
                res.status(200).json({ message: `Company dengan ID ${company_id} berhasil diupdate` });
            }
        }
    });
};

const deleteCompanies = (req, res) => {
    const company_id = parseInt(req.params.id);
    pool.query(queries.deleteCompanies, [company_id], (error, results) => {
        if (error) {
            console.error('Error hapus company:', error);
            res.status(500).send('An error occurred.');
        } else {
            res.status(200).send('Company deleted successfully');
        }
    });
};

module.exports = {
  getCompanies,getCompaniesById,postCompanies,putCompanies,deleteCompanies,
}