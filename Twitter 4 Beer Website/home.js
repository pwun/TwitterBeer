$(document).keypress(function (e){
    if(e.which == 13){
        localStorage["input"] = document.getElementById('query').value;
        window.location.assign('AJAXSolr.html');
    }
});