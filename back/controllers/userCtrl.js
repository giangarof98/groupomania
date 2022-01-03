const User = require('../model/user');
const sql = require('../model/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashPsw = await bcrypt.hash(req.body.password, salt);

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashPsw
    });

    User.create(user, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "error creating the user!"
        });
        else res.send(data)
        console.log('account created')
    })
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    sql.query("SELECT * FROM user WHERE email = ?", [email], async (err, results) => {
        if(err){
            res.send({"failed": "ocurred"})
        }
        if(results.length){
            const comparision = await bcrypt.compare(password, results[0].password)

            const token = jwt.sign({id: results[0].id}, "SECRET_TOKEN");
            res.header('Authorization', token);

            if(comparision){
                res.send({
                    "name": results[0].name,
                    "email": results[0].email,
                    "id": results[0].id,
                    "sucess": "login sucessfull!",
                    "token": token
                })
            }
            else{
                res.status(400).json("password doesnt match");
            }
        }
        else{
            res.status(400).send("email doesnt exist")
        }
    })
}

exports.getAll = async (req, res) => {
    const name = req.query.name;

    User.getAll(name, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "something went wrong"
            })
        }
        else res.send(data);
    })
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    sql.query("DELETE FROM user WHERE id=?", id, (error, results) => {
    if (error) {
      res.send(error)
    }
    if (results) {
      res.send({
        message: "account deleted successfully!"

      })
      console.log(results)
    }
  })
    // User.remove(req.params.id, (err, data) => {
    //     if (err) {
    //       if (err.kind === "not_found") {
    //         res.status(404).send({
    //           message: `Not found user with id ${req.params.id}.`
    //         });
    //       } else {
    //         res.status(500).send({
    //           message: "Could not delete post with id " + req.params.id
    //         });
    //       }
    //     } else res.send({ message: `Post was deleted successfully!` });
    //   });
}