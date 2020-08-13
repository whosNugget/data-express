const express = require('express');
const bodyParser = require('body-parser');
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

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));

let urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/', routes.index);

app.listen(3000);