function LoadPageRequest(el) {
    var response = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            el.innerHTML = xhttp.responseText;
        }
    }
    xhttp.open("GET", "./Section/" + el.getAttribute("id") + ".html");
    xhttp.send();
}

var contentList = document.querySelectorAll("[data-content='true']");
contentList.forEach(
    function (e) {
        LoadPageRequest(e);
    }
);




