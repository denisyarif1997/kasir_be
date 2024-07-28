const pool = require('../../../db'); // Import the database configuration
const queries = require('./queries');

const getProduct = async (req, res) => {
    try {
        const results = await pool.query(queries.getProduct);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductByName = async (req, res) => {
    try {
        const results = await pool.query(queries.getProductByName);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query(queries.getProductById, [id]);
        if (results.rows.length === 0) {
            res.status(404).json({ message: `Products with ID ${id} not found` });
        } else {
            res.status(200).json(results.rows);
        }
    } catch (error) {
        console.error(`Error fetching Product with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const postProduct = async(req,res) => {
//     const {company_id,Product_id,category_id,name,description,price,cost,cost_average} = req.body;

//     try {
//         await pool.query(queries.postProducts, [company_id,name,description]);
//         res.status(201).json({message:"Product berhasil di buat", body: req.body});
//     } catch (error) {
//         console.error("error dalam membuat Product",error);
//         res.status(500).json({error: 'internal server error'});
//     }
// }
const postProduct = async (req, res) => {
    try {
      // Destructure and validate input data
      const {
        company_id,
        Product_id,
        category_id,
        name,
        description,
        price,
        cost,
        cost_average,
      } = req.body;
  
      if (!company_id || !name || !description) {
        return res.status(400).json({ error: 'Invalid request data' });
      }
  
      // Create a new product using the provided query
      const result = await pool.query(queries.postProduct, [
        company_id,
        Product_id,
        category_id,
        name,
        description,
        price,
        cost,
        cost_average,
      ]);
  
      // Extract the created product's ID from the query result
      const productId = result.rows[0].id;
  
      // Return a success response with the created product data
      return res.status(201).json({
        message: 'Product berhasil di buat',
        body: req.body,
        product_id: productId,
      });
    } catch (error) {
      console.error('Error dalam membuat product:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };


  const putProduct = async (req, res) => {
    const id = req.params.id;
    const {
      company_id,
      Product_id,
      category_id,
      name,
      description,
      price,
      cost,
      cost_average,
    } = req.body;
  
    // Ensure at least one field is being updated
    if (
      company_id === undefined &&
      Product_id === undefined &&
      category_id === undefined &&
      name === undefined &&
      description === undefined &&
      price === undefined &&
      cost === undefined &&
      cost_average === undefined
    ) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }
  
    // Build the dynamic SQL query and values array
    let query = 'UPDATE products SET';
    const values = [];
    let index = 1;
  
    // Utility function to append fields to the query
    const appendField = (field, value) => {
      if (value !== undefined) {
        query += ` ${field} = $${index},`;
        values.push(value);
        index++;
      }
    };
  
    appendField('company_id', company_id);
    appendField('Product_id', Product_id);
    appendField('category_id', category_id);
    appendField('name', name);
    appendField('description', description);
    appendField('price', price);
    appendField('cost', cost);
    appendField('cost_average', cost_average);

     // Update the updated_at column with the current timestamp
  query += ' updated_at = CURRENT_TIMESTAMP,';
  // values.push(new Date().toISOString);
  
    // Remove the trailing comma and add the WHERE clause
    query = query.slice(0, -1); // Removes the last comma
    query += ` WHERE id = $${index}`;
    values.push(id);
  
    try {
      const result = await pool.query(query, values);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: `Product with ID ${id} not found` });
      }
  
      res.status(200).json({ message: `Product with ID ${id} updated successfully` });
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
    

const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await pool.query(queries.deleteProduct, [id]);
        if (results.rowCount === 0) {
            res.status(404).json({ message: `Product with ID ${id} not found` });
        } else {
            res.status(200).send('Product deleted successfully');
        }
    } catch (error) {
        console.error(`Error deleting Product with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getProduct,getProductById,getProductByName,postProduct,putProduct,deleteProduct,
};
