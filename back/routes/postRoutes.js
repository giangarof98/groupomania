const express = require('express');
const router = express.Router();

const post = require('../controllers/postCtrl');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

router.post('/', multer, post.create);
router.get('/', post.getAll);
router.get('/:id', post.findOne);
router.delete('/:id', post.delete)

module.exports = router;