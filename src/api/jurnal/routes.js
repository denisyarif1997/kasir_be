// routes.js
const {Router} = require('express');
const handler = require('./handler');
const router = Router();



router.get('/', handler.getJurnal);
router.post('/', handler.postJurnal);
router.get('/:id', handler.getJurnalById);
router.put('/:id', handler.putJurnal);
router.delete('/:id', handler.deleteJurnal);





// ... Add more routes ...

module.exports = router;