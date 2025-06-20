const db = require('../db');

exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const [result] = await db.query(
      'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
      [title, content, author]
    );
    res.json({ message: 'Post created successfully', postId: result.insertId });
  } catch (err) {
    console.error('Create Post Error:', err);
    res.status(500).json({ message: 'Failed to create post', error: err });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(results);
  } catch (err) {
    console.error('Get All Posts Error:', err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const [results] = await db.query('SELECT * FROM posts WHERE id = ?', [postId]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Get Post By ID Error:', err);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
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

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await db.query('DELETE FROM posts WHERE id = ?', [postId]);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Delete Post Error:', err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
};
