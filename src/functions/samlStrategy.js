// Import npm and local modules
import saml from 'passport-saml';
import fs from 'fs';
// Create samlStrategy function
const samlStrategy = ({ port, __dirname }) => {
  return new saml.Strategy({
    callbackUrl: `http://localhost:${port}/login/callback`,
    entryPoint: "https://wayf.ucol.mx/saml2/idp/SSOService.php",
    logoutUrl: 'https://wayf.ucol.mx/saml2/idp/SingleLogoutService.php',
    logoutCallbackUrl: `http://localhost:${port}/logout/callback`,
    issuer: "http://localhost/20166932",
    decryptionPvk: fs.readFileSync(__dirname + '/cert/key.pem', 'utf8'),
    cert: fs.readFileSync(__dirname + '/cert/idp.crt', 'utf8')
  }, (profile, done) => { const user = Object.assign({}, profile); return done(null, profile) });
}

export default samlStrategy;