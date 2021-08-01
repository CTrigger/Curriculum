//SPA_Request
function LoadPageRequest(el, path) {
    var response = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            el.innerHTML = xhttp.responseText;
        }
    }
    xhttp.open("GET", "./" + path + "/" + el.getAttribute("data-section") + ".html?ver=" + Math.random());
    xhttp.send();
}

//PageRender
function containerNavigationOnChange() {
    var contentList = document.querySelectorAll(".container > [data-content='true']");
    contentList.forEach(
        function (e) {
            LoadPageRequest(e, 'View/Curriculum');
        }
    );
}


//wait document be ready
document.addEventListener('DOMContentLoaded', function () {
    //SectionViews
    var contentList = document.querySelectorAll("[data-content='true']");
    contentList.forEach(
        function (e) {
            LoadPageRequest(e, 'Section');
        }
    );
})