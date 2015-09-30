$(document).keypress(function (e){
    if(e.which == 13){
        localStorage["input"] = document.getElementById('query').value;
        localStorage["sort"] = "";
        window.location.assign('AJAXSolr.html');
    }
});
