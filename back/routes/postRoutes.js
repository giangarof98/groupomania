const express = require('express');
const router = express.Router();

const post = require('../controllers/postCtrl');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

router.get('/', auth, post.getAll);
router.post('/', auth, multer, post.create);
router.get('/:id', auth, post.findOne);
router.put('/:id', auth, multer, post.update);
router.delete('/:id', auth, post.delete);

module.exports = router;