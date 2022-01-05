const Post = require('../model/post');
const auth = require('../middleware/auth')
const fs = require('fs');

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
      // req.body.thing = JSON.parse(req.body.thing);
      const url = req.protocol + '://' + req.get('host');
      const post = new Post ({
          title: req.body.title,
          content: req.body.content,
          imageUrl: url + '/images/' + req.file.filename,
          user_id: req.body.user_id
      });
      
      Post.create(post, (err, data) => {
          if(err)
          res.status(500).send({
              message: err.message || "error creating the post!"
          });
          else res.send(data)
      })
};

exports.getAll = (req, res) => {
    const title = req.query.title;

    Post.getAll(title, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "something went wrong"
            })
        }
        else res.send(data);
    })
}

exports.update = (req, res) => {
  if(!req.body){
    res.status(400).send({message: 'post dont found!'});
  }
  console.log(req.body)

  const url = req.protocol + '://' + req.get('host');
      const post = {
          title: req.body.title,
          content: req.body.content,
          imageUrl: url + '/images/' + req.file.filename,
          // user_id: req.body.user_id
      };

  Post.updateById(req.params.id, post, (err,data) => {
    if(err) {
      if(err.kind === 'not found'){
        res.status(404).send({message: "post not found"});
        } else { res.status(500).send({message: 'error while updating!'}); 
      }
    } else res.send(data)
  })
}

exports.findOne = (req, res) => {
    Post.findOne(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Post with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Post.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found post with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete post with id " + req.params.id
          });
        }
      } else res.send({ message: `Post was deleted successfully!` });
    });
};