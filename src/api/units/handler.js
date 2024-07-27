const pool = require('../../../db'); // Import the database configuration
const queries = require('./queries');

const getUnits = async (req, res) => {
    try {
        const results = await pool.query(queries.getUnits);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error fetching unit:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUnitsById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query(queries.getUnitsById, [id]);
        if (results.rows.length === 0) {
            res.status(404).json({ message: `Units with ID ${id} not found` });
        } else {
            res.status(200).json(results.rows);
        }
    } catch (error) {
        console.error(`Error fetching unit with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const postUnits = async (req, res) => {
//     const { office_id, name, description, address, phone } = req.body;

//     try {
//         await pool.query(queries.postUnits, [office_id, name, description, address, phone]);
//         res.status(201).json({ message: "Units created successfully", body: req.body });
//     } catch (error) {
//         console.error('Error creating Units:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const postUnits = async(req,res) => {
    const {company_id,name,description} = req.body;

    try {
        await pool.query(queries.postUnits, [company_id,name,description]);
        res.status(201).json({message:"Unit berhasil di buat", body: req.body});
    } catch (error) {
        console.error("error dalam membuat unit",error);
        res.status(500).json({error: 'internal server error'});
    }
}

const putUnits = async (req, res) => {
    const id = req.params.id;
    const { company_id, name, description } = req.body;

    try {
        const results = await pool.query(queries.putUnits, [company_id, name, description, id]);
        if (results.rowCount === 0) {
            res.status(404).json({ message: `Unit with ID ${id} not found` });
        } else {
            res.status(200).json({ message: `Unit with ID ${id} updated successfully` });
        }
    } catch (error) {
        console.error(`Error updating unit with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUnits = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await pool.query(queries.deleteUnits, [id]);
        if (results.rowCount === 0) {
            res.status(404).json({ message: `Unit with ID ${id} not found` });
        } else {
            res.status(200).send('Unit deleted successfully');
        }
    } catch (error) {
        console.error(`Error deleting unit with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getUnits,
    getUnitsById,
    postUnits,
    putUnits,
    deleteUnits
};
