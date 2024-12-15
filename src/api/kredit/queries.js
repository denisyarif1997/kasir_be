const pool = require('../../../db');

// Fungsi untuk menghitung angsuran bulanan
function calculateInstallment(hargaMobil, dpPersen, tenorTahun, bungaTahunan) {
    const dp = hargaMobil * (dpPersen / 100); // Menghitung Down Payment
    const pinjaman = hargaMobil - dp;        // Menghitung jumlah pinjaman
    const tenorBulan = tenorTahun * 12;      // Konversi tenor ke bulan

    // Menghitung bunga per bulan
    const bungaBulanan = bungaTahunan / 12 / 100;

    // Rumus anuitas untuk menghitung angsuran bulanan
    const angsuranBulanan = pinjaman * (bungaBulanan * Math.pow(1 + bungaBulanan, tenorBulan)) /
                            (Math.pow(1 + bungaBulanan, tenorBulan) - 1);

    return angsuranBulanan;
}

// Fungsi untuk menyimpan data angsuran ke database
async function saveInstallment(hargaMobil, dpPersen, tenorTahun, bungaTahunan, angsuranBulanan) {
    const result = await pool.query(
        'INSERT INTO kredit (harga_mobil, dp_persen, tenor_tahun, bunga_tahunan, angsuran_bulanan) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [hargaMobil, dpPersen, tenorTahun, bungaTahunan, angsuranBulanan]
    );
    return result.rows[0];
}

module.exports = {
    calculateInstallment,
    saveInstallment,
};
