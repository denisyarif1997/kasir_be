// routes.js
const {Router} = require('express');
const handler = require('./handler');
const router = Router();



router.get('/', handler.getOffice);
router.post('/', handler.postOffice);
router.get('/:id', handler.getOfficeById);
router.put('/:id', handler.putOffice);
router.delete('/:id', handler.deleteOffice);





// ... Add more routes ...

module.exports = router;