const pool = require('../../../db'); // Import the database configuration
const queries =  require('./queries')

const getCustomer = (req, res) => {
    pool.query(queries.getCustomer, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const getCustomerByName = (req, res) => {
    const { name } = req.params;
    pool.query(queries.getCustomerByName, [`%${name}%`], (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const postCustomer = (req, res) => {
    const {company_id,name,phone,address,description} = req.body;
    pool.query(queries.postCustomer,[
        company_id,
        name,
        phone,
        address,
        description], (error, result) => {
        if (error) throw error;
        res.status(201).json({message:"customer berhasil di buat", body: req.bod});
    });
};

const putCustomer = (req, res) => {
    const id = req.params.id;
    const {company_id,name,phone,address,description} = req.body;

    pool.query(queries.putCustomer,[ company_id, name, phone, address, description, id], 
        (error, result) => {
        if (error) {
            console.error('error dalam update customer', error);
            res.status(500).json({message: 'ups terjadi kesalahan'});
        } else {
            if (result.rowCount === 0) {
                res.status(404).json({message: `customer dengan ${id} tidak ditemukan`});
            } else {
                res.status(200).json({message: `Customer dengan ID ${id} berhasil di update`})
            }
        }
    });
};

const deleteCustomer = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteCustomer, [id], (error, results) => {
        if (error) {
            console.error('Error deleting customer:', error);
            res.status(500).send('An error occurred.');
        } else {
            if (results.rowCount === 0) {
                res.status(404).json({ message: `customer with ID ${id} not found` });
            } else {
                res.status(200).send('customer deleted successfully');
            }
        }
    });
};

module.exports = {
    getCustomer,
    getCustomerByName,
    postCustomer,
    putCustomer,
    deleteCustomer
}