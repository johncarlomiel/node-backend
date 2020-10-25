const pool = require('../configs/mysql-database');


const createPost = async (content, fileName, createdBy) => {
    let body = { userId: createdBy };

    if (content) body.content = content;

    if (fileName) body.filePath = fileName;

    const [post] = await pool.query('INSERT INTO posts SET ?', body);

    return post.insertId;
};


const getPosts = async (cursor, limit) => {
    const params = [];
    let query = `SELECT postId, content, filePath, username FROM posts INNER JOIN users ON posts.userId = users.userId`;

    if (cursor) {
        query += ' WHERE postId < ?'
        params.push(cursor);
    }

    query += ' ORDER BY postId DESC LIMIT ?';
    params.push(Number(limit));

    const [posts] = await pool.query(query, params);

    if (posts.length > 0) {
        return { posts, cursor: posts[posts.length - 1].postId }
    }

    return { posts, cursor: 0 };
};


const getPostById = async (postId) => {
    const query = 'SELECT postId, content, filePath FROM posts WHERE postId = ?'

    const [posts] = await pool.query(query, postId);

    return posts[0];
};


const updatePostById = async (content, fileName, postId, updatedBy) => {

    const fields = ['updatedBy = ?'];
    const params = [updatedBy];

    if (content) {
        fields.push('content = ?');
        params.push(content);
    };

    if (fileName) {
        fields.push('filePath = ?');
        params.push(fileName);
    };

    // Add Post Id
    params.push(postId);

    const [post] = await pool.query(`UPDATE posts SET ${fields.join(',')} WHERE postId = ?`, params);

    return post;
};

const deletePostById = async (postId) => {
    const query = 'DELETE FROM posts WHERE postId = ?';
    return await pool.query(query, postId);
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePostById,
    deletePostById
}