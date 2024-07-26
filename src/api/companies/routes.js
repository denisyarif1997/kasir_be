// routes.js
const {Router} = require('express');
const handler = require('./handler');
const router = Router();



router.get('/', handler.getCompanies);
router.post('/', handler.postCompanies);
router.get('/:id', handler.getCompaniesById);
router.put('/:id', handler.putCompanies);
router.delete('/:id', handler.deleteCompanies);





// ... Add more routes ...

module.exports = router;