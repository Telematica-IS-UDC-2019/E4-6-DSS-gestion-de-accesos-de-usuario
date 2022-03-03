const fs = require('fs');
const express = require("express");
const session = require('express-session');
const passport = require('passport');
const saml = require('passport-saml');
const cors = require('cors');
const path = require('path');
const router = require('./routes/app.routes.js');

const app = express();
const port = 4006 || process.env.PORT || 0

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const samlStrategy = new saml.Strategy({
  callbackUrl: `http://localhost:${port}/login/callback`,
  entryPoint: "https://wayf.ucol.mx/saml2/idp/SSOService.php",
  logoutUrl: 'https://wayf.ucol.mx/saml2/idp/SingleLogoutService.php',
  logoutCallbackUrl: `http://localhost:${port}/logout/callback`,
  issuer: "http://localhost/20166932",
  decryptionPvk: fs.readFileSync(__dirname + '/cert/key.pem', 'utf8'),
  cert: fs.readFileSync(__dirname + '/cert/idp.crt', 'utf8')
}, (profile, done) => { const user = Object.assign({}, profile); return done(null, profile) });

app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  resave: true
}));

passport.use(samlStrategy);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/bootstrap', express.static(__dirname + '/../node_modules/bootstrap'));
app.use('/jquery', express.static(__dirname + '/../node_modules/jquery'));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(router);

const server = app.listen(port, (req) => {
  let host = process.env.NODE_ENV = 'production' ? `http://localhost:${server.address().port}`: server.address().port
  console.log('Server is running on:', host)
});