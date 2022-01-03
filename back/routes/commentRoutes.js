const express = require('express');
const router = express.Router();

const comment = require('../controllers/CommentCtrl');

router.post('/', comment.submitComment)
router.get('/', comment.getAll)
router.get('/:id', comment.findOne)
router.delete('/:id', comment.delete)

module.exports = router;