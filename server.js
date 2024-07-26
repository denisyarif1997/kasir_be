const express = require ("express")
const cors = require('cors');
const categoriesRoutes = require('./src/api/categories/routes');
const companiesRoutes = require('./src/api/companies/routes');
const officesRoutes = require('./src/api/offices/routes')



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



app.listen(port, () => console.log(`APP LISTENING ON ${port}`));