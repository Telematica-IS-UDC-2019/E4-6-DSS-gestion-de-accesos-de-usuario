import '/node_modules/jquery/dist/jquery.js';
import '/node_modules/bootstrap/dist/js/bootstrap.js';

console.log(document.title);
$(function () {
    $("#nav").load("/assets/components/nav.html");
});
document.getElementById("btnLogin").addEventListener("click", () => {
    window.location.href = "/login";
});