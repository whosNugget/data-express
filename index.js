const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const pug = require('pug');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const routes = require('./routes/routes');

const app = express();

app.use(cookieParser('This is my passphrase'));

app.use((req, res, next) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(expressSession(
    {
        secret: 'dewoitine',
        saveUninitialized: true,
        resave: true
    }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));

let urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/edit', routes.editPage);
app.post('/edit', routes.edit);
app.get('/create', routes.createPage);
app.post('/create', urlencodedParser, routes.createUser);
app.get('/login', routes.loginPage);
app.post('/login', urlencodedParser, routes.login);
app.get('/index', routes.index);
app.get('/', routes.index);

app.listen(3000);
