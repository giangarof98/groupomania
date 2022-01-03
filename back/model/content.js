const sql = require('./db');

const Content = function(content){
    this.text_content = content.text_content;
    this.userId = content.userId;
    this.postId = content.postId;
}
Content.create = (newContent, result) => {
    sql.query("INSERT INTO comments SET ?", newContent, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created comment: ", { id: res.insertId, ...newContent });
      result(null, { id: res.insertId, ...newContent });
    });
};

Content.getAll = (text_content, result) => {
    let query = "SELECT * FROM comments"

    if(text_content){
        query += `WHERE text_content LIKE '%${text_content}`
    }

    sql.query(query, (err, res) => {
        if(err){
            console.log('error', err);
            result(null, err);
            return;
        }
        console.log('comments', res)
        result(null, res)
    })
}

Content.findOne = (id, result) => {
    sql.query(`SELECT * FROM comments WHERE id = ${id}`, (err, res) => {
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
}

Content.remove = (id, result) => {
    sql.query("DELETE FROM comments WHERE id = ?", id, (err, res) => {
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
}

module.exports= Content;