// routes.js
const {Router} = require('express');
const handler = require('./handler');
const router = Router();



router.get('/', handler.getCustomer);
router.post('/', handler.postCustomer);
router.get('/:name', handler.getCustomerByName);
router.put('/:id', handler.putCustomer);
router.delete('/:id', handler.deleteCustomer);



// ... Add more routes ...

module.exports = router;