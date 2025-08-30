const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:postId/comments', authMiddleware, commentController.addComment);
router.get('/:postId/comments', commentController.getCommentsByPost);
router.delete('/:postId/comments/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;