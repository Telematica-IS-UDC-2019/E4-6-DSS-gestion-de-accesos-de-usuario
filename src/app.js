// Import npm and local modules
import fs from 'fs';
import express from "express";
import session from 'express-session';
import passport from 'passport';
import saml from 'passport-saml';
import cors from 'cors';
import isPortReachable from 'is-port-reachable';
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import router from './routes/app.routes.js';
import tools from './functions/tools.js';
// Add the paths of the current file
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// Create express app
const app = express();
// Generate a port
const port = await tools.portCheck();
// Set the port
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
// Set saml strategy
const samlStrategy = new saml.Strategy({
  callbackUrl: `http://localhost:${port}/login/callback`,
  entryPoint: "https://wayf.ucol.mx/saml2/idp/SSOService.php",
  logoutUrl: 'https://wayf.ucol.mx/saml2/idp/SingleLogoutService.php',
  logoutCallbackUrl: `http://localhost:${port}/logout/callback`,
  issuer: "http://localhost/20166932",
  decryptionPvk: fs.readFileSync(__dirname + '/cert/key.pem', 'utf8'),
  cert: fs.readFileSync(__dirname + '/cert/idp.crt', 'utf8')
}, (profile, done) => { const user = Object.assign({}, profile); return done(null, profile) });
// Set the express session
app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  resave: true
}));
// Declare passport to use saml strategy
passport.use(samlStrategy);
// Set the express middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Set the view and routes
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(router);
// Start the server
const server = app.listen(port, (req) => {
  let host = process.env.NODE_ENV != 'production' ? `http://localhost:${server.address().port}` : server.address().port
  console.log('Server is running on:', host)
});