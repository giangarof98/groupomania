const sql = require('./db');

const Post = function(post) {
    this.title = post.title;
    this.content = post.content;
    this.imageUrl = post.imageUrl;
    this.user_id = post.user_id;
}

Post.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created post: ", { id: res.insertId, ...newPost });
      result(null, { id: res.insertId, ...newPost });
    });
};

Post.getAll = (title, result) => {
    let query = "SELECT * FROM posts";

    if(title){
        query += `WHERE title LIKE '%${title}'`;
    }

    sql.query(query, (err, res) => {
        if(err){
            console.log("error", err);
            result(null, err);
            return;
        }
        console.log("posts", res);
        result(null, res);
    })
};

Post.updateById = (id, post, result ) => {
  sql.query("UPDATE posts SET title = ?, content = ?, imageUrl = ? WHERE id = ?", 
  [post.title, post.content, post.imageUrl, id], 
  (err, res) => {
    if(err) {
      console.log("err", err)
      result(null, err);
      return;
    }
    if(res.affectedRows == 0){
      result({kind: "not found"}, null);
      return;
    }
    console.log('post updated!', {id: id, ...post});
    result(null,{id: id, ...post})
  })
}

Post.findOne = (id, result) => {
    sql.query(`SELECT * FROM posts WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found post: ", res[0]);
          result(null, res[0]);
          return;
        }
    
        // not found post with the id
        result({ kind: "not_found" }, null);
      });
};

Post.remove = (id, result) => {
    sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found post with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted post with id: ", id);
      result(null, res);
    });
};

module.exports = Post;

