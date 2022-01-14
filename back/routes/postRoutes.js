const express = require('express');
const router = express.Router();

const post = require('../controllers/postCtrl');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

router.get('/', post.getAll);
router.post('/', multer, post.create);
router.get('/:id', post.findOne);
router.put('/:id', multer, post.update);
router.delete('/:id', post.delete);

module.exports = router;