// Import npm and local modules
import '/node_modules/jquery/dist/jquery.js';
import '/node_modules/bootstrap/dist/js/bootstrap.js';
import '/assets/js/functions/loadAndReplace.js';
import user from '/assets/js/functions/user.js';
// Load content
console.log(document.title);
await $("#nav").loadAndReplace("/assets/components/nav.ejs");
// Check if the user is logged in
let userInformation;
try {
  // Parse the user information into JSON
  userInformation = JSON.parse($(document.body).attr('data-user'))
} catch (error) {
  // If error set the user information to null
  userInformation = null;
}
// Display respective content if user is logged in or not
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