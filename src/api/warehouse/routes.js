// routes.js
const {Router} = require('express');
const handler = require('./handler');
const router = Router();



router.get('/', handler.getWarehouse);
router.post('/', handler.postWarehouse);
router.get('/:id', handler.getWarehouseById);
router.put('/:id', handler.putWarehouse);
router.delete('/:id', handler.deleteWarehouse);



// ... Add more routes ...

module.exports = router;