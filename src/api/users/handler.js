const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../../db'); // Import the database configuration
const queries = require('./queries');

const getUser = async (req, res) => {
    try {
        const results = await pool.query(queries.getUser);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error fetching Users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query(queries.getUserById, [id]);
        if (results.rows.length === 0) {
            res.status(404).json({ message: `User with ID ${id} not found` });
        } else {
            res.status(200).json(results.rows);
        }
    } catch (error) {
        console.error(`Error fetching User with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserByName = (req, res) => {
    const { name } = req.params;
    pool.query(queries.getUserByName, [`%${name}%`], (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const postUser = async (req, res) => {
    const { company_id, name, email, password } = req.body;

    try {
        await pool.query(queries.postUser, [company_id, name, email, password]);
        res.status(201).json({ message: "User created successfully", body: req.body });
    } catch (error) {
        console.error('Error creating User:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const putUser = async (req, res) => {
    const id = req.params.id;
    const { company_id, name, email, password } = req.body;

    try {
        const results = await pool.query(queries.putUser, [company_id, name, email, password, id]);
        if (results.rowCount === 0) {
            res.status(404).json({ message: `User with ID ${id} not found` });
        } else {
            res.status(200).json({ message: `User with ID ${id} updated successfully` });
        }
    } catch (error) {
        console.error(`Error updating User with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await pool.query(queries.deleteUser, [id]);
        if (results.rowCount === 0) {
            res.status(404).json({ message: `User with ID ${id} not found` });
        } else {
            res.status(200).send('User deleted successfully');
        }
    } catch (error) {
        console.error(`Error deleting User with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fungsi Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const results = await pool.query(queries.getUserByEmail, [email]);
        if (results.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getUser,
    getUserById,
    getUserByName,
    postUser,
    putUser,
    deleteUser,
    loginUser // Export the login function
};