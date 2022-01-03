const sql = require('./db');

const User = function(user) {
    this.id = user.id
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
};

User.getAll = (name, result) => {
    let query = "SELECT * FROM user";

    if(name){
        query += `WHERE name LIKE '%${name}'`;
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
}

User.remove = (id, result) => {
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
}

module.exports = User;