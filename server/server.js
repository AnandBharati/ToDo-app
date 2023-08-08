const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors({ origin: '*' }));

const str = process.env.CONNECTON_STR;
const db = process.env.DATABASE;
const con = mongoose.connect(`${str}/${db}`);

con.then((res) => {
    if (!res) return;
    console.log('connected')
})

app.listen(process.env.PORT, () => {
    console.log('server started');
})

app.get('/', (_, res) => {
    console.log('called')
    res.json('working')
})

app.use('/todo', todoRoutes)
app.use('/auth', authRoutes)
