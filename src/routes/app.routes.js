// Import npm and local modules
import { Router } from 'express';
import passport from 'passport';
import fs from 'fs';
import tools from '../functions/tools.js';
import { samlStrategy } from '../app.js';
// Add the paths of the current file
const __filename = tools.path.__filename({ url: import.meta.url });
const __dirname = tools.path.__dirname({ url: import.meta.url });
// Create express router
const router = Router();
// Get the main route
router.get('/', (req, res) => {
  res.render('welcome.ejs', { user: req.session.user });
});
// Get the login route
router.get('/login', passport.authenticate('saml', { failureRedirect: '/login/fail', failureFlash: true }), (req, res) => res.redirect('/'));
// Get the login callback route
router.post('/login/callback', passport.authenticate('saml', {
  failureRedirect: '/login/fail',
  failureFlash: true
}), (req, res) => {
  if (req.user) {
    req.session.user = req.user;
    res.redirect('/information');
  }
});
// Get the login fail route
router.get('/login/fail', (req, res) => res.status(401).send('Login failed'));
// Get the login missing route
router.get('/login/missing', (req, res) => res.status(401).send('You are not logged in'));
// Get the logout route
router.get('/logout', (req, res) => {
  if (req.session.user) {
    req.session.user = null;
    samlStrategy.logout(req, (err, request) => {
      return res.redirect(request);
    });
  } else {
    res.redirect('/');
  }
});
// Get the logout callback route
router.post('/logout/callback', (req, res) => {
  req.logout();
  res.redirect('/');
});
// Get the information route
router.get('/information', (req, res, next) => {
  if (req.session.user) {
    res.render('information.ejs', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});
// Get the metadata route
router.get('/Metadata', (req, res) => {
  res.type('application/xml');
  res.status(200).send(samlStrategy.generateServiceProviderMetadata(fs.readFileSync(__dirname + '/../cert/cert.pem', 'utf8')));
});
//Get general error handler
router.use((err, req, res, next) => {
  console.log("Fatal error: " + JSON.stringify(err));
  next(err);
});

export default router;