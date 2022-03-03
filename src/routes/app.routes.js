import { Router } from 'express';
import passport from 'passport';

const router = Router();
router.get('/', (req, res) => {
  res.render('welcome.ejs', { user: { hostname: process.env.USERDOMAIN, username: process.env.USERNAME } });
});

router.get('/login', passport.authenticate('saml', { failureRedirect: '/login/fail', failureFlash: true }), (req, res) => res.redirect('/'));

router.post('/login/callback', passport.authenticate('saml', {
  failureRedirect: '/login/fail',
  failureFlash: true
}), (req, res) => {
  res.render('information.ejs', { user: req.user });
}
);

router.get('/logout', (req, res) => {

  if (!req.user) res.redirect('/');

  samlStrategy.logout(req, (err, request) => {
    return res.redirect(request)
  });
});

router.post('/logout/callback', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/login/fail', (req, res) => res.status(401).send('Login failed'));

router.get('/Metadata', (req, res) => {
  res.type('application/xml');
  res.status(200).send(samlStrategy.generateServiceProviderMetadata(fs.readFileSync(__dirname + '/cert/cert.pem', 'utf8')));
}
);

//general error handler
router.use((err, req, res, next) => {
  console.log("Fatal error: " + JSON.stringify(err));
  next(err);
});

export default router;