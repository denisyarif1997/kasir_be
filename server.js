const express = require ("express")
const path = require('path');
const cors = require('cors');
const categoriesRoutes = require('./src/api/categories/routes');
const companiesRoutes = require('./src/api/companies/routes');
const officesRoutes = require('./src/api/offices/routes');
const warehouseRoutes = require('./src/api/warehouse/routes');
const unitRoutes = require('./src/api/units/routes');
const productRoutes = require('./src/api/products/routes');
const stockRoutes = require('./src/api/stocks/routes');
const priceRoutes = require('./src/api/price/routes');
const customerRoutes = require('./src/api/customers/routes');
const userRoutes = require('./src/api/users/routes');

//boostraps middleware
// app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));




const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req,res) => {
    res.send('hello user');
});




app.use(cors()); // Menambahkan middleware CORS
app.use('/categories', categoriesRoutes);
app.use('/companies', companiesRoutes);
app.use('/offices', officesRoutes);
app.use('/warehouse', warehouseRoutes);
app.use('/units', unitRoutes);
app.use('/products', productRoutes);
app.use('/stocks', stockRoutes);
app.use('/prices', priceRoutes);
app.use('/customers', customerRoutes);
app.use('/users', userRoutes);







app.listen(port, () => console.log(`APP LISTENING ON PORT ${port}`));