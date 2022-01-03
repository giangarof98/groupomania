const Content = require('../model/content')

exports.submitComment = async(req, res) => {

if (!req.body) {
  res.status(400).send({
    message: "Content can not be empty!"
  });
}
const content = new Content ({
  text_content: req.body.text_content,
  userId: req.body.userId,
  postId: req.body.postId,

})

  Content.create(content,(err,data) => {
    if(err)
    res.status(500).send({message: err.message})
    else res.send(data)
  })
};

exports.getAll = (req, res) => {
  const text_content = req.query.text_content;

  Content.getAll(text_content, (err, data) => {
    if(err){
      res.status(500).send({message: err})
    } else res.send(data)
  })
};

exports.findOne = (req, res) => {
  Content.findOne(req.params.id, (err, data) => {
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
  Content.remove(req.params.id, (err, data) => {
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