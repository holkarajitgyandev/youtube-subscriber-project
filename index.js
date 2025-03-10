//index.js
const express = require('express')
const app = require('./src/app.js')
const mongoose = require('mongoose')
const port = 3000

// Parse JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



// Connect to DATABASE
const DATABASE_URL = "mongodb+srv://holkarajitgyandev:Hgfe9dcba@cluster0.wwtpzs9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
