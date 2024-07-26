const pool = require('../../../db'); // Import the database configuration
const queries = require('./queries');

const getOffice = (req, res) => {
    pool.query(queries.getOffice, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getOfficeById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getOfficeById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const postOffice = (req, res) => {
    const { company_id, name, description, address, phone, email } = req.body;

    pool.query(queries.postOffice, [company_id, name, description, address, phone, email], 
    (error, results) => {
        if (error) throw error;
        res.status(201).json({ message: "Office created successfully", body: req.body });
    });
};

const putOffice = (req, res) => {
    const id = req.params.id;
    const { company_id, name, description, address, phone, email } = req.body;
    
    pool.query(queries.putOffice, [company_id, name, description, address, phone, email, id],
    (error, results) => {
        if (error) {
            console.error('Error updating office:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.rowCount === 0) {
                res.status(404).json({ message: `Office with ID ${id} not found` });
            } else {
                res.status(200).json({ message: `Office with ID ${id} updated successfully` });
            }
        }
    });
};

const deleteOffice = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteOffice, [id], (error, results) => {
        if (error) {
            console.error('Error deleting office:', error);
            res.status(500).send('An error occurred.');
        } else {
            if (results.rowCount === 0) {
                res.status(404).json({ message: `Office with ID ${id} not found` });
            } else {
                res.status(200).send('Office deleted successfully');
            }
        }
    });
};

module.exports = {
  getOffice,
  getOfficeById,
  postOffice,
  putOffice,
  deleteOffice
};
