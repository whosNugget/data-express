const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/data', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {

});

let accountSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    securityQuestion1: String,
    securityQuestion2: String,
    securityQuestion3: String
});

let Account = mongoose.model('Account_Collection', accountSchema);