// connect to databash
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://amit917480:hOtHsQP7mQfpralq@cluster0.rymrybp.mongodb.net/Employee_Review_system`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function(){
    console.log('connected to Database: Mongodb')
});

module.exports = db;