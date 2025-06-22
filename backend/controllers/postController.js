const db = require('../db');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const [result] = await db.query(
      'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
      [title, content, userId]
    );

    res.json({ message: 'Post created successfully', postId: result.insertId });
  } catch (err) {
    console.error('Create Post Error:', err);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

// Get all posts (with author name)
exports.getAllPosts = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT p.id, p.title, p.content, p.created_at, u.username AS author
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(results);
  } catch (err) {
    console.error('Get All Posts Error:', err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

// Get single post by ID (with author name)
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const [results] = await db.query(`
      SELECT p.*, u.username AS author
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `, [postId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(results[0]); // includes user_id and author
  } catch (err) {
    console.error('Get Post By ID Error:', err);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};


// Update a post
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;

    const [rows] = await db.query('SELECT user_id FROM posts WHERE id = ?', [postId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Post not found' });

    const post = rows[0];
    if (post.user_id !== userId) {
      return res.status(403).json({ message: 'You do not have permission to update this post.' });
    }

    await db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [
      title,
      content,
      postId
    ]);

    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error('Update Post Error:', err);
    res.status(500).json({ message: 'Failed to update post' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const [rows] = await db.query('SELECT user_id FROM posts WHERE id = ?', [postId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Post not found' });

    const post = rows[0];
    if (post.user_id !== userId) {
      return res.status(403).json({ message: 'You do not have permission to delete this post.' });
    }

    await db.query('DELETE FROM posts WHERE id = ?', [postId]);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Delete Post Error:', err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
};

// Get posts of the currently logged-in user
exports.getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const [results] = await db.query(
      'SELECT id, title, content, created_at FROM posts WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    res.json(results);
  } catch (err) {
    console.error('Get My Posts Error:', err);
    res.status(500).json({ message: 'Failed to fetch your posts' });
  }
};
