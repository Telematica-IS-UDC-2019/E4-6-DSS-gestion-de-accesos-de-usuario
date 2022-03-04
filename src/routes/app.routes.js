// Import npm and local modules
import { Router } from 'express';
import passport from 'passport';
import fs from 'fs';
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import samlStrategy_ from '../strategy.js';

// Add the paths of the current file
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// Create express router
const router = Router();
// Get the main route
router.get('/', (req, res) => {
  res.render('welcome.ejs', { user: { hostname: process.env.USERDOMAIN, username: process.env.USERNAME } });
});
// Get the login route
router.get('/login', passport.authenticate('saml', { failureRedirect: '/login/fail', failureFlash: true }), (req, res) => res.redirect('/'));
// Get the login callback route
router.post('/login/callback', passport.authenticate('saml', {
  failureRedirect: '/login/fail',
  failureFlash: true
}), (req, res) => {
  req.session.user = req.user
  res.redirect('/information')
});
// Get the information route
router.get('/information', (req, res, next) => {
  if (!req.session.user) res.redirect('/');
  res.render('information.ejs', { user: req.session.user });
});
// Get the logout route
router.get('/logout', (req, res) => {
  if (!req.session.user) res.redirect('/');
  req.session.user = null;
  samlStrategy_.logout(req, (err, request) => {
    return res.redirect(request)
  });
});
// Get the logout callback route
router.post('/logout/callback', (req, res) => {
  req.logout();
  res.redirect('/');
});
// Get the login fail route
router.get('/login/fail', (req, res) => res.status(401).send('Login failed'));
// Get the metadata route
router.get('/Metadata', (req, res) => {
  res.type('application/xml');
  res.status(200).send(samlStrategy_.generateServiceProviderMetadata(fs.readFileSync(__dirname + '/../cert/cert.pem', 'utf8')));
});
//Get general error handler
router.use((err, req, res, next) => {
  console.log("Fatal error: " + JSON.stringify(err));
  next(err);
});

export default router;