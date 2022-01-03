const user = require('../controllers/userCtrl');
const express = require('express');
const router = express.Router();

router.post('/signup', user.signup);
router.post('/login', user.login);
router.get('/', user.getAll);
router.delete('/delete/:id', user.delete);

module.exports = router;