// routes.js
const {Router} = require('express');
const handler = require('./handler');
const router = Router();



router.get('/', handler.getUser);
router.post('/', handler.postUser);
router.get('/:id', handler.getUserById);
router.put('/:id', handler.putUser);
router.delete('/:id', handler.deleteUser);
router.post('/login', handler.loginUser); // Add the login route




// ... Add more routes ...

module.exports = router;