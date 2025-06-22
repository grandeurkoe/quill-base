const db = require('../db');

// Add a new comment
exports.addComment = async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;
  const user_id = req.user.id;

  if (!postId || !content) {
    return res.status(400).json({ message: 'Post ID and content are required' });
  }

  try {
    await db.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [postId, user_id, content]
    );
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    console.error('Add Comment Error:', err);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};


// Get all comments for a post with author info
exports.getCommentsByPost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const [comments] = await db.query(
      `SELECT c.id, c.content, c.created_at, u.username AS author
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.created_at DESC`,
      [postId]
    );

    res.json(comments);
  } catch (err) {
    console.error('Get Comments Error:', err);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

// Delete a comment if user owns it
exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;

  try {
    const [result] = await db.query(
      'SELECT user_id FROM comments WHERE id = ?',
      [commentId]
    );

    if (!result.length) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (result[0].user_id !== userId) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }

    await db.query('DELETE FROM comments WHERE id = ?', [commentId]);
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Delete Comment Error:', err);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
};
