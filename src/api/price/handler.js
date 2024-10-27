const pool = require('../../../db'); // Import the database configuration
const queries = require('./queries');

const getPrice = async (req, res) => {
    try {
        const results = await pool.query(queries.getPrice);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error fetching Price:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getPriceById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query(queries.getPriceById, [id]);
        if (results.rows.length === 0) {
            res.status(404).json({ message: `Prices with ID ${id} not found` });
        } else {
            res.status(200).json(results.rows);
        }
    } catch (error) {
        console.error(`Error fetching Price with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const postPrice = async (req, res) => {
    try {
      // Destructure and validate input data
      const {
        product_id,
        office_id,
        price,
        cost
      } = req.body;
  
      // Create a new Price using the provided query
      const result = await pool.query(queries.postPrice, [
        product_id,
        office_id,
        price,
        cost
      ]);
  
      // Extract the created Price's ID from the query result
      const PriceId = result.rows[0].id;
  
      // Return a success response with the created Price data
      return res.status(201).json({
        message: 'Harga berhasil di buat',
        body: req.body,
        Price_id: PriceId,
      });
    } catch (error) {
      console.error('Error dalam membuat Harga:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

    
  const putPrice = (req, res) => {
    const id = req.params.id;
    const {   product_id,
        office_id,
        price,
        cost } = req.body;    
    pool.query(queries.query, [  product_id,
        office_id,
        price,
        cost,
        id],
    (error, results) => {
        if (error) {
            console.error('Error updating Price:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.rowCount === 0) {
                res.status(404).json({ message: `Price with ID ${id} not found` });
            } else {
                res.status(200).json({ message: `Price with ID ${id} updated successfully` });
            }
        }
    });
};

const deletePrice = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await pool.query(queries.deletePrice, [id]);
        if (results.rowCount === 0) {
            res.status(404).json({ message: `Price with ID ${id} not found` });
        } else {
            res.status(200).send('Price deleted successfully');
        }
    } catch (error) {
        console.error(`Error deleting Price with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
getPrice,
getPriceById,
postPrice,
putPrice,
deletePrice
};
