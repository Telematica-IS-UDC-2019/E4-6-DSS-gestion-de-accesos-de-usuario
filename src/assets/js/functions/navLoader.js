// Import npm and local modules
import '/node_modules/jquery/dist/jquery.js';
import '/node_modules/bootstrap/dist/js/bootstrap.js';
import '/assets/js/functions/loadAndReplace.js';
import user from '/assets/js/functions/user.js';
// Load content
console.log(document.title);
let userInformation;
try {
  userInformation = JSON.parse($(document.body).attr('data-user'))
} catch (error) {
  userInformation = null;
}
await $("#nav").loadAndReplace("/assets/components/nav.ejs");
document.getElementById("btnNavLogIn").hidden = !userInformation ? false : true;
document.getElementById("btnNavLogOut").hidden = userInformation ? false : true;
// Set event listeners
const btnNavLogIn = document.getElementById("btnNavLogIn");
const btnNavLogOut = document.getElementById("btnNavLogOut");
btnNavLogIn.addEventListener("click", () => {
  user.logIn();
});
btnNavLogOut.addEventListener("click", () => {
  user.logOut();
});