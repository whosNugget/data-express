const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://Unlikeplatypus:GkrB98JzriDkoLVI@cluster0.2dtjh.mongodb.net/Users?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => { });

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
    res.render('create', {
        "title": "Create User",
        "config": req.session,
        "lastVisited": req.cookies.lastVisited
    });
};

//This is a post for site/create
exports.createUser = (req, res) =>
{
    //Values here are up to date as to what's on master (8/17/2020, 3:29PM)

    //email     - req.body.email
    //username  - req.body.username
    //password  - req.body.password
    let userExists = false;
    Account.findOne({ username: req.body.username }, (err, account) =>
    {
        if (err) return console.error(err);

        if (account)
        {
            res.redirect('/create');
            return;
        }

        let salt = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(req.body.password, salt);
        //let hashQ1 = bcrypt.hashSync(req.body.favoriteColor, salt);
        //let hashQ2 = bcrypt.hashSync(req.body.betterVideogame, salt);
        //let hashQ3 = bcrypt.hashSync(req.body.preferredPhrase, salt);

        let newAccount = new Account({
            email: req.body.email,
            username: req.body.username,
            password: hashPassword,
            age: req.body.age,
            securityQuestion1: req.body.favoriteColor,
            securityQuestion2: req.body.betterVideogame,
            securityQuestion3: req.body.preferredPhrase
        });

        newAccount.save((err, newAccount) =>
        {
            if (err) return console.error(err);
            console.log(req.body.username + 'added');
        });

        req.session.user =
        {
            isAuthenticated: true,
            username: req.body.username
        }

        res.redirect('/');

    });
};

//This is a get for site/edit
exports.editPage = (req, res) =>
{
    console.log(req.session);
    Account.findOne({ username: req.session.user.username }, (err, account) =>
    {
        if (err) return console.error(err);

        if (account)
        {
            console.log(account);

            res.render('edit', {
                "title": "Edit User",
                "config": req.session,
                "lastVisited": req.cookies.lastVisited
            });
        }
        else res.send("There was an error accessing your account");
    });
};

exports.edit = (req, res) =>
{
    //Logic for editing user
    Account.findOne({ username: req.session.user.username }, (err, account) =>
    {
        if (err) return console.error(err);

        //going to have to do the unique username check still
        account.username = req.body.username;
        //Save the salted password if it exists, and if it matches the confirm
        account.email = req.body.email;
        account.age = req.body.age;
        //Save the new options for each question if they are selected

        account.save((err, account) =>
        {
            if (err) console.error(err);
            console.log(`${account.username} was updated`);
        });
    });
    res.redirect('/');
};

//This is a get for site/login
exports.loginPage = (req, res) =>
{
    res.render('login', {
        "title": "Login",
        "config": req.session,
        "lastVisited": req.cookies.lastVisited
    });
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

    Account.findOne({ username: req.body.username }, (err, data) => 
    {
        if (data)
        {
            let password = data.password;
            bcrypt.compare(req.body.password, password, (err, success) =>
            {
                if (err) return console.error(err);
                if (success)
                {
                    req.session.user =
                    {
                        isAuthenticated: true,
                        username: req.body.username
                    }
                    res.redirect('/');
                }
            });
        } else
        {
            res.redirect('/login');
        }
    });
};

exports.index = (req, res) =>
{
    let date = new Date().toLocaleString();

    res.cookie('lastVisited', date, { maxAge: 9999999999999999 });

    res.render('index', {
        "title": "Index",
        "config": req.session,
        "lastVisited": req.cookies.lastVisited
    });
};

exports.logout = (req, res) =>
{
    req.session.destroy(err =>
    {
        if (err)
        {
            return console.log(err);
        }
        else
        {
            res.redirect('/');
        }
    });
};