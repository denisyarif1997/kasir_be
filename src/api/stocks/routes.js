// routes.js
const {Router} = require('express');
const handler = require('./handler');
const router = Router();



router.get('/', handler.getStock);
router.post('/', handler.postStock);
router.get('/:id', handler.getStockById);
router.put('/:id', handler.putStock);
router.delete('/:id', handler.deleteStock);



// ... Add more routes ...

module.exports = router;