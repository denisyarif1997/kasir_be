// routes.js
const {Router} = require('express');
const handler = require('./handler');
const router = Router();



router.get('/', handler.getPrice);
router.post('/', handler.postPrice);
router.get('/:id', handler.getPriceById);
router.put('/:id', handler.putPrice);
router.delete('/:id', handler.deletePrice);



// ... Add more routes ...

module.exports = router;