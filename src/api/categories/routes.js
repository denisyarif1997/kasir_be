// routes.js
const {Router} = require('express');
const handler = require('./handler');
const router = Router();



router.get('/', handler.getCategories);
router.post('/', handler.postCategories);
router.get('/:id', handler.getCategoriesById);
router.put('/:id', handler.putCategories);
router.delete('/:id', handler.deleteCategories);





// ... Add more routes ...

module.exports = router;