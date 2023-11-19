const mongoose = require('mongoose')


const connection = mongoose.connect('mongodb://127.0.0.1:27017/devquest')
console.log('mongodb connection established on port 27017')

connection.catch(err => console.log(err))

module.exports = connection;