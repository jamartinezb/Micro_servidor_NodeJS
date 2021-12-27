const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;


app.use(express.urlencoded({extended:true}));
app.use(cookieParser('pass'))
app.use(session({
secret: 'pass',
resave: true,
saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username, password, done) {	
  if(username=="username" && password=="12354hdfnb63ybcxbrthy")
  return done(null, {id:1, name:"username22"});
  done(null,false);
}));

passport.serializeUser(function(user, done) {
  done(null,user.id);
})

passport.deserializeUser(function(id,done) {
  done(null,{id:1, name:"username2"});
})
app.set ('view engine', 'ejs');

app.get('/', (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
}, (req, res) => {

res.send("Logado exitosamente");
})

app.get("/login", (req, res) => {
  res.render("login");
  })

app.post("/login",passport.authenticate('local',{
  successRedirect:"/", 
  failureRedirect:"/login"
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})