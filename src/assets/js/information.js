import '/jquery/dist/jquery.js';
import '/bootstrap/dist/js/bootstrap.js';

console.log(document.title);
$(function () {
    $("#nav").load("/assets/components/nav.html");
});