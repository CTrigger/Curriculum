function LoadJsonRequest(el) {
    var response = "";
    var xhttp = new XMLHttpRequest();
    xhttp.overrideMimeType("application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(xhttp.responseText);
            r = r.list;

            var tableContent = "";
            for (var index = 0; index < r.length; index++) {
                tableContent = tableContent +
                    "<tr>" +
                    "<td>" + r[index].tool + "</td>" +
                    "<td>" + r[index].level + "</td>" +
                    "<td>" + r[index].experience + "</td>" +
                    "<td>" + r[index].observations + "</td>" +
                    "</tr>"
            }
            el.innerHTML = tableContent;
        }
    }
    xhttp.open("GET", "./jsonData/Dossie.json");
    xhttp.send();
}

function LoadData() {
    var jsonList = document.querySelectorAll("tbody#skillsContent");
    jsonList.forEach(
        function (e) {
            LoadJsonRequest(e)
        }
    );
}
//LoadData();
// setTimeout(function () {
//     LoadData();
// }, 100);