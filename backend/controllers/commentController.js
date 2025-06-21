const db = require('../db');

exports.addComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { content } = req.body;
        const author = req.user.username;

        const [results] = await db.query(
            'INSERT INTO comments (post_id, author, content) VALUES (?, ?, ?)',
            [postId, author, content]
        );

        res.json({ message: 'Commend added', commentId: results.insertId });
    } catch (err) {
        console.error('Add Comment Error:', err);
        res.status(500).json({ message: 'Failed to add comment' });
    }
};

exports.getCommentsByPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const [results] = await db.query(
            'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC',
            [postId]
        );

        res.json(results);
    } catch (err) {
        console.error('Get Comments Error:', err);
        res.status(500).json({ message: 'Failed to fetch comments' });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const username = req.user.username;

        const [results] = await db.query('SELECT * FROM comments WHERE id = ?', [commentId]);
        console.log(username);
        console.log(results[0].author)
        if(!results.length || results[0].author !== username) {
            return res.status(403).json({ message: 'Unauthorized to delete this comment' });
        }

        await db.query('DELETE FROM comments WHERE id = ?', [commentId]);
        res.json( { message: 'Comment deleted' });
    } catch (err) {
        console.error('Delete Comment Error:', err);
        res.status(500).json({ message: 'Failed to delete comment' });
    }
};