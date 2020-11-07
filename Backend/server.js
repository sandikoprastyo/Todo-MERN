const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const postModels = require('./model/model-post');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

//router post
const routerPost = require('./router/post.js');
app.use('/post', routerPost);

//get /
app.get('/', (req, res) => {
  res.end('tes');
});

// post todo
app.post('/', (req, res) => {
  var obj = {
    todo: req.body.todo,
  };
  postModels.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      obj.save();
      res.redirect('/');
    }
  });
});

/* app.get('/', (req, res) => {
  dataPost.find({}, (err, items) => {
    if (err) {
      res.json(err);
      console.log(err);
      res.send();
    } else {
      res.render('app', { items: items });
    }
  });
}); */

//connect mongo db
mongoose.connect(
  process.env.CONNECT_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connect to db success');
  },
);

//app listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('====================================');
  console.log(`server running in port http://localhost:${PORT}`);
  console.log('====================================');
});
