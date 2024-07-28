// routes.js
const {Router} = require('express');
const handler = require('./handler');
const router = Router();



router.get('/', handler.getProduct);
router.post('/', handler.postProduct);
router.get('/:id', handler.getProductById);
router.put('/:id', handler.putProduct);
router.delete('/:id', handler.deleteProduct);



// ... Add more routes ...

module.exports = router;