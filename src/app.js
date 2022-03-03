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

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
let port = await (async () => {
  if (!(await isPortReachable(4006, { host: 'localhost' }))) {
    return 4006;
  } else if (!(await isPortReachable(process.env.PORT, { host: 'localhost' }))) {
    return process.env.PORT;
  } else {
    return 0;
  }
})();

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
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(router);

const server = app.listen(port, (req) => {
  let host = process.env.NODE_ENV != 'production' ? `http://localhost:${server.address().port}` : server.address().port
  console.log('Server is running on:', host)
});