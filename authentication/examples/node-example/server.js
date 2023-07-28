const express = require('express')
const passport = require('passport')

const app = express()
const port = 3000

app.use('/', express.static('frontend'))
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const redirect_to_home_page = function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.post('/login-user-pass',
  passport.authenticate('local', { failureRedirect: '/login' }),
  redirect_to_home_page);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  redirect_to_home_page
  );

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})