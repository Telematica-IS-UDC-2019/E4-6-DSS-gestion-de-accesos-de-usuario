import '/node_modules/jquery/dist/jquery.js';
// Add loadAndReplace function to jQuery
$.fn.loadAndReplace = async function (filePath) {
    let element = $(this);
    await $.get(filePath, async function (newElement) {
        element.replaceWith(newElement);
    });
}