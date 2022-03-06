// Import npm and local modules
import express from "express";
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import morgan from "morgan";
import router from './routes/app.routes.js';
import tools from './functions/tools.js';
// Add the paths of the current file
const __filename = tools.path.__filename({ url: import.meta.url });
const __dirname = tools.path.__dirname({ url: import.meta.url });
// Create express app
const app = express();
// Generate a port
const port = await tools.portCheck();
// Set the passport
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
// Set and export saml strategy
export const samlStrategy = tools.samlStrategy({ port: port, __dirname: __dirname });
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
if (process.env.NODE_ENV?.toLocaleLowerCase() != 'production') app.use(morgan("dev"));
// Set the view and routes
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(router);
// Start the server
const server = app.listen(port, () => {
  let host = process.env.NODE_ENV != 'production' ? `http://localhost:${server.address().port}` : server.address().port;
  console.log('Server is running on:', host);
});