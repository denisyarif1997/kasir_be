const pool = require('../../../db'); // Import the database configuration
const queries = require('./queries');

const getWarehouse = async (req, res) => {
    try {
        const results = await pool.query(queries.getWarehouse);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error fetching warehouses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getWarehouseById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query(queries.getWarehouseById, [id]);
        if (results.rows.length === 0) {
            res.status(404).json({ message: `Warehouse with ID ${id} not found` });
        } else {
            res.status(200).json(results.rows);
        }
    } catch (error) {
        console.error(`Error fetching warehouse with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const postWarehouse = async (req, res) => {
    const { office_id, name, description, address, phone } = req.body;

    try {
        await pool.query(queries.postWarehouse, [office_id, name, description, address, phone]);
        res.status(201).json({ message: "Warehouse created successfully", body: req.body });
    } catch (error) {
        console.error('Error creating warehouse:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const putWarehouse = async (req, res) => {
    const id = req.params.id;
    const { office_id, name, description, address, phone } = req.body;

    try {
        const results = await pool.query(queries.putWarehouse, [office_id, name, description, address, phone, id]);
        if (results.rowCount === 0) {
            res.status(404).json({ message: `Warehouse with ID ${id} not found` });
        } else {
            res.status(200).json({ message: `Warehouse with ID ${id} updated successfully` });
        }
    } catch (error) {
        console.error(`Error updating warehouse with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteWarehouse = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await pool.query(queries.deleteWarehouse, [id]);
        if (results.rowCount === 0) {
            res.status(404).json({ message: `Warehouse with ID ${id} not found` });
        } else {
            res.status(200).send('Warehouse deleted successfully');
        }
    } catch (error) {
        console.error(`Error deleting warehouse with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getWarehouse,
    getWarehouseById,
    postWarehouse,
    putWarehouse,
    deleteWarehouse
};
