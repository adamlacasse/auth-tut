const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('./passport-config');
initializePassport(passport, email => users.find(user => user.email === email));

const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index.ejs', { user: { name: 'Adam' } });
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.post('/login', (req, res) => {

});

app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log({ password, hashedPassword })
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        res.redirect('/login');
    } catch (e) {
        res.redirect('/register');
        console.error(e);
    }
    console.log(users);
});

app.listen(3000, () => console.log('Express server started at http://localhost:3000'));
