// Import npm and local modules
import '/node_modules/jquery/dist/jquery.js';
import '/node_modules/bootstrap/dist/js/bootstrap.js';

// Load content
console.log(document.title);
await $("#nav").load("/assets/components/nav.html");
// Set event listeners
document.getElementById("btnLogin").addEventListener("click", () => {
    window.location.href = "/login";
});