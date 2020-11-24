const express = require('express');
const router = express.Router();
const Posts = require('../model/model-post');

//! Endpoint get all post data
router.get('/', async (req, res) => {
  try {
    const getPost = await Posts.find();
    res.json(getPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//! Endpoint post data
router.post('/', async (req, res) => {
  const dataPost = new Posts({
    todo: req.body.todo,
    desc: req.body.desc,
  });
  try {
    const savePost = await dataPost.save();
    res.json(savePost);
  } catch (err) {
    res.json({ message: err });
  }
});

//! Endpoint delete data post by id
router.delete('/:postId', async (req, res) => {
  try {
    const deletePost = await Posts.remove({ _id: req.params.postId });
    res.json(deletePost);
  } catch (err) {
    res.json({ message: err });
  }
});

//! Endpoint delete all data post
router.delete('/', async (req, res) => {
  try {
    const deletePost = await Posts.remove();
    res.json(deletePost);
  } catch (err) {
    res.json({ message: err });
  }
});

//! Endpoint Update post
router.patch('/:postId', async (req, res) => {
  try {
    const updatePost = await Posts.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          todo: req.body.todo,
        },
      },
    );
    res.send({ message: 'ok' });
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
