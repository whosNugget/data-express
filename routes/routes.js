const mongoose = require('mongoose');
const expressSession = require('express-session');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://Unlikeplatypus:GkrB98JzriDkoLVI@cluster0.2dtjh.mongodb.net/Users?retryWrites=true&w=majority', {
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

//This is a get for site/create
exports.createPage = (req, res) =>
{
    res.render('create');
};

//This is a post for site/create
exports.createUser = (req, res) =>
{
    //Values here are up to date as to what's on master (8/17/2020, 3:29PM)

    //email     - req.body.email
    //username  - req.body.username
    //password  - req.body.password

    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(req.body.password, salt);
    let hashQ1 = bcrypt.hashSync(req.body.favoriteColor, salt);
    let hashQ2 = bcrypt.hashSync(req.body.betterVideogame, salt)
    let hashQ3 = bcrypt.hashSync(req.body.preferredPhrase, salt)

    console.log('hash for password: ' + hashPassword);
    console.log('hash for Q1: ' + hashQ1);
    console.log('hash for Q2: ' + hashQ2);
    console.log('hash for Q3: ' + hashQ3);
    console.log('matches?:' + bcrypt.compareSync(req.body.password, hash));
};

//This is a get for site/login
exports.loginPage = (req, res) =>
{
    res.render('login');
};

//This is a post for site/login
exports.login = (req, res) =>
{
    //pull from database and compare with req values
    /*
    
    example for password
    if (bcrypt.compareSync(req.body.password, HASH FROM DATABASE));
        login, create cookie?

    */
};

exports.index = (req, res) =>
{
    res.render('index');
};