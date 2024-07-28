const pool = require('../../../db'); // Import the database configuration
const queries = require('./queries');

const getStock = async (req, res) => {
    try {
        const results = await pool.query(queries.getStock);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error fetching Stock:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getStockById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query(queries.getStockById, [id]);
        if (results.rows.length === 0) {
            res.status(404).json({ message: `Stocks with ID ${id} not found` });
        } else {
            res.status(200).json(results.rows);
        }
    } catch (error) {
        console.error(`Error fetching Stock with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const postStock = async(req,res) => {
//     const {company_id,Stock_id,category_id,name,description,price,cost,cost_average} = req.body;

//     try {
//         await pool.query(queries.postStocks, [company_id,name,description]);
//         res.status(201).json({message:"Stock berhasil di buat", body: req.body});
//     } catch (error) {
//         console.error("error dalam membuat Stock",error);
//         res.status(500).json({error: 'internal server error'});
//     }
// }
const postStock = async (req, res) => {
    try {
      // Destructure and validate input data
      const {
        product_id,
        warehouse_id,
        stock,
        sale,
        purchase,
      } = req.body;
  
      // Create a new Stock using the provided query
      const result = await pool.query(queries.postStock, [
        product_id,
        warehouse_id,
        stock,
        sale,
        purchase,
      ]);
  
      // Extract the created Stock's ID from the query result
      const StockId = result.rows[0].id;
  
      // Return a success response with the created Stock data
      return res.status(201).json({
        message: 'Stock berhasil di buat',
        body: req.body,
        Stock_id: StockId,
      });
    } catch (error) {
      console.error('Error dalam membuat Stock:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

    
  const putStock = (req, res) => {
    const id = req.params.id;
    const { product_id, warehouse_id, stock, sale, purchase, } = req.body;    
    pool.query(queries.query, [product_id, warehouse_id, stock, sale, purchase, id],
    (error, results) => {
        if (error) {
            console.error('Error updating stock:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.rowCount === 0) {
                res.status(404).json({ message: `stock with ID ${id} not found` });
            } else {
                res.status(200).json({ message: `stock with ID ${id} updated successfully` });
            }
        }
    });
};

const deleteStock = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await pool.query(queries.deleteStock, [id]);
        if (results.rowCount === 0) {
            res.status(404).json({ message: `Stock with ID ${id} not found` });
        } else {
            res.status(200).send('Stock deleted successfully');
        }
    } catch (error) {
        console.error(`Error deleting Stock with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getStock,getStockById,postStock,putStock,deleteStock,
};
