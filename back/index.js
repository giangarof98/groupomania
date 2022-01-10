require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const exp = require('constants');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes')
const commentRoutes = require('./routes/commentRoutes')

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comment', commentRoutes);

app.listen(3000, () => {
    console.log('connected with server')
})
