const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const app = express()
const port = 3000

const tempUserPass = [{id: 1, username: "test", password: "test"}, {id: 2, username: "test1", password: "1234"}]

app.use('/', express.static('frontend'))
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

function findById(id){
    return tempUserPass.find((i)=>{i.id == id })
}

passport.use(new LocalStrategy(
  function(username, password, done) {
      console.log("got here 1")
      let found = tempUserPass.find((i)=>{i.username == username && i.password == password})
      if(found){
          return done(null, found)
      }else{
          done(null, false)
      }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    let found = findById(id)
    if(found){
        done(null, found)
    }
    else{done("error", false)}
});

const redirect_to_home_page = function(req, res) {
    // Successful authentication, redirect home.
    console.log("got here 2")
    res.redirect('/');
  }

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.post('/login-user-pass',
  passport.authenticate('local', { failureRedirect: '/login-failure.html' }),
  redirect_to_home_page);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failure.html' }),
  redirect_to_home_page
  );

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})