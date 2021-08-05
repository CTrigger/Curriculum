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
    return ("./" + path + "/" + el.getAttribute("data-section") + ".html?ver=" + Math.random());
}

//FirstLoad
document.addEventListener('DOMContentLoaded', function () {
    //SectionViews
    var contentList = document.querySelectorAll("[data-content='true']");
    contentList.forEach(
        function (e) {
            fetch(PathBuilder(e, 'Section'))
                .then(response => {
                    //return response.blob();//images
                    return response.text();//html
                })
                .then(content => {
                    e.innerHTML = content;
                })
                /*Substancial improvements is needed at this "then"*/
                .then(content => {
                    if (e.getAttribute("data-section") == 'Curriculum') {
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
                                        console.error(error);
                                    });
                            }
                        );
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    )
})

function MenuRequest(section) {
    var internalContent = document.querySelector('#PageRender');
    internalContent.setAttribute('data-section',section);
    //console.log(PathBuilder(internalContent, section));
    fetch(PathBuilder(internalContent,'Section'))
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
                                console.log(error.text);
                            });
                    }
                );
            }
        })
        .catch(error => {
            console.error(error);
        });

        //after click in menu close the accordion
        document.querySelector('button[data-bs-target="#menu_1"][aria-expanded="true"]').click()
}


//To Do...
function InternalRequest(el, section) {
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
