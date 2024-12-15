const pool = require('../../../db'); // Import the database configuration
const queries =  require('./queries')

const getJurnal = (req, res) => {
    pool.query(queries.getJurnal, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getJurnalById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getJurnalById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const postJurnal = (req, res) => {
    const { title, content, date } = req.body;

    pool.query(queries.postJurnal, [title, content, date], 
    (error, results) => {
        if (error) throw error;
        res.status(201).json({ "message": "Jurnal berhasil dibuat.", "body": req.body });
    });
};

const putJurnal = (req, res) => {
    const jurnal_id = req.params.id;
    const { title, content, date } = req.body;
    pool.query(queries.putJurnal, [title, content, date,jurnal_id],
    (error, results) => {
        if (error) {
            console.error('Error Update jurnal', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.rowCount === 0) {
                res.status(404).json({ message: `Jurnal dengan ID ${jurnal_id} tidak ditemukan` });
            } else {
                res.status(200).json({ message: `Jurnal dengan ID ${jurnal_id} berhasil diupdate` });
            }
        }
    });
};

const deleteJurnal = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteJurnal, [id], (error, results) => {
        if (error) {
            console.error('Error pada saat hapus:', error);
            res.status(500).send('An error occurred.');
        } else {
            res.status(200).send(`Jurnal dengan id ${id} berhasil di hapus`);
        }
    });
};

module.exports = {
  getJurnal,
  getJurnalById,  
  postJurnal,
  putJurnal,
  deleteJurnal,
}