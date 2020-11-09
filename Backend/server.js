const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

//router post
const routerPost = require('./router/post.js');
app.use('/post', routerPost);

//get /
app.get('/', (req, res) => {
  res.json({ message: 'Ok!' });
});

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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('====================================');
  console.log(`server running in port http://localhost:${PORT}`);
  console.log('====================================');
});
