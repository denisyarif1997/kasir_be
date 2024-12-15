const { Router } = require('express');
const { handleCalculateInstallment } = require('./handler');

const router = Router();

// Route untuk menghitung dan menyimpan angsuran
router.post('/hitung-angsuran', handleCalculateInstallment);

module.exports = router;
