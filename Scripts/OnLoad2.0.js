/*
    Dear technical interviewer / recruiter
    Thanks for reaching this point
    This is the controller...
    There is a band aid solution regarding the second level SPA load which I
    pretend solve soon as a possible.
    Thanks!

    Changed the way of how to load the page
    https://stackoverflow.com/questions/65801616/execute-javascript-inside-xmlhttprequest-response
*/

function PathBuilder(el, path) {
    return ("./" + path + "/" + el.getAttribute("data-section") + ".html?ver=" + Math.floor(Math.random() * 100000));
}

//FirstLoad
document.addEventListener('DOMContentLoaded', function () {
    InternalRequest(document.querySelector("header>[data-content='true']"), 'Section');
    MenuRequest('Curriculum');
    InternalRequest(document.querySelector("footer[data-content='true']"), 'Section');

})

function MenuRequest(section) {
    var internalContent = document.querySelector('#PageRender');
    internalContent.setAttribute('data-section', section);
    //console.log(PathBuilder(internalContent, section));
    fetch(PathBuilder(internalContent, 'Section'))
        .then(response => {
            //return response.blob();//images
            return response.text();//html
        })
        .then(content => {
            internalContent.innerHTML = content;
        })
        /*Substancial improvements is needed at this "then"*/
        .then(content => {
            if (internalContent.getAttribute("data-section") == 'Curriculum') {
                var contentList = document.querySelectorAll(".container > [data-content='true']");
                contentList.forEach(
                    function (e) {
                        fetch(PathBuilder(e, 'View/Curriculum'))
                            .then(response => {
                                //return response.blob();//images
                                return response.text();//html
                            })
                            .then(content => {
                                e.innerHTML = content;
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                );
            }
            if (internalContent.getAttribute("data-section") == 'FAQs') {
                FAQsRequest();
            }
            if (internalContent.getAttribute("data-section") == 'Certificates') {
                CertificatesRequest();
            }
        })
        .catch(error => {
            console.error(error.text);
        });

    //after click in menu close the accordion
    var responsiveToogle = document.querySelector('button[data-bs-target="#menu_1"][aria-expanded="true"]');
    if (responsiveToogle) {
        responsiveToogle.click();
    }
}

async function InternalRequest(el, section) {
    fetch(PathBuilder(el, section))
        .then(response => {
            //return response.blob();//images
            return response.text();//html
        })
        .then(content => {
            el.innerHTML = content;
        })
        .catch(error => {
            console.error(error);
        });
}

/*JSON DataLoader */
function GetJsonData(data) {
    return fetch('./jsonData/' + data + '.json')
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.error(err);
            return null;
        });

}

/*FAQs DataControl */
async function FAQsRequest() {
    var AccordionMain = document.querySelector('div#accordionFAQs');
    const Faqs = await GetJsonData('FAQs');
    var i = 0;
    if (Faqs) {
        Faqs.forEach(f => {
            AccordionMain.innerHTML += BuildAccordionFAQs(f.Q, f.A, i++);
        });
    }

}


function BuildAccordionFAQs(question, answer, i) {
    var DivElement =
        '<div class="accordion-item">' +
        '    <h2 class="accordion-header" id="flush-{heading}">' +
        '        <button class="bg-light accordion-button collapsed" type="button" data-bs-toggle="collapse"' +
        '            data-bs-target="#flush-{collapse}" aria-expanded="false" aria-controls="flush-{collapse}">' +
        '            <h5 style="font-weight: bold">' +
        '               {heading-data}' +
        '            </h5>' +
        '        </button>' +
        '    </h2>' +
        '</div>' +
        '<div id="flush-{collapse}" class="accordion-collapse collapse" aria-labelledby="flush-{heading}"' +
        '    data-bs-parent="#accordionFAQs">' +
        '    <div class="accordion-body">' +
        '       {body-data}' +
        '    </div>' +
        '</div>';

    DivElement = DivElement
        .replace(/{heading-data}/g, question)
        .replace(/{body-data}/g, answer)
        .replace(/{heading}/g, 'heading_' + i)
        .replace(/{collapse}/g, 'collapse_' + i);

    return DivElement;
}


/* Certificates */
async function CertificatesRequest() {
    var DivCertificates = document.querySelector('div#Certificates');
    const Certificates = await GetJsonData('Certificates');
    DivCertificates.innerHTML = '';

    //Build Columns
    var columns = []
    var i = 0;
    if (Certificates) {
        Certificates.forEach(f => {
            columns.push(BuildCertificatesColumn(f.title, f.description, f.image, f.link, f.mins));
        });
    }

    //Build Rows
    var div = '';
    for (let i = 0; i < columns.length; i++) {
        div += columns[i];
        if ((i % 3) == 2 || i == columns.length - 1) {
            DivCertificates.innerHTML += BuildCertificatesRow(div);
            div = '';
        }
    }
}

function BuildCertificatesRow(content) {
    var divRow =
        '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 pb-3">' +
        '   {content}' +
        '</div>';

    return divRow.replace(/{content}/g, content);
}

function BuildCertificatesColumn(title, description, image, link, mins) {
    var divCol =
        '<div class="col">' +
        '    <div class="card shadow-sm">' +
        '        <div class="card-header">' +
        '            <img class="img-fluid" src="{img}" title="{title}" />' +
        '        </div>' +
        '        <div class="card-body">' +
        '            <p class="card-text" style="display: none;">' +
        '                   {description}' +
        '            </p>' +
        '            <div class="d-flex justify-content-between align-items-center">' +
        '                <div class="btn-group">' +
        '                    <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal"' +
        '                        data-bs-target="#staticBackdrop" onclick="ModalDataLoad(this)">' +
        '                        Details' +
        '                    </button>';
    if (link) {
        divCol = divCol +
            '               <button type="button" onclick="OpenUrl(\'{link}\')"' +
            '                   class="btn btn-sm btn-outline-secondary">View</button>';
    }
    divCol = divCol +
        '                </div>';
    if (mins) {
        divCol = divCol +
            '            <small class="text-muted">{mins}</small>';
    }
    divCol = divCol +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
    return divCol
        .replace(/{title}/g, title)
        .replace(/{description}/g, description)
        .replace(/{img}/g, image + '?v=' + Math.floor(Math.random() * 100))
        .replace(/{link}/g, link)
        .replace(/{mins}/g, mins);
}