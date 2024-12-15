const { calculateInstallment, saveInstallment } = require('./queries');

// Fungsi handler untuk menghitung dan menyimpan angsuran
async function handleCalculateInstallment(req, res) {
    const { hargaMobil, dpPersen, tenorTahun, bungaTahunan } = req.body;

    // Validasi input
    if (!hargaMobil || !dpPersen || !tenorTahun || !bungaTahunan) {
        return res.status(400).json({ message: 'Mohon lengkapi semua data input.' });
    }

    try {
        // Menghitung angsuran
        const angsuran = calculateInstallment(hargaMobil, dpPersen, tenorTahun, bungaTahunan);

        // Simpan data ke database
        const result = await saveInstallment(hargaMobil, dpPersen, tenorTahun, bungaTahunan, angsuran);

        // Kembalikan hasil
        res.status(201).json({
            message: 'Angsuran berhasil dihitung dan disimpan.',
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
}

module.exports = {
    handleCalculateInstallment,
};
