// routes.js
const {Router} = require('express');
const handler = require('./handler');
const router = Router();



router.get('/', handler.getUnits);
router.post('/', handler.postUnits);
router.get('/:id', handler.getUnitsById);
router.put('/:id', handler.putUnits);
router.delete('/:id', handler.deleteUnits);



// ... Add more routes ...

module.exports = router;