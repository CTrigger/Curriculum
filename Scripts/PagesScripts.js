/* Section/Certificates */
//udemy Hyperlink redirect
function OpenUdemy(url){
    url = 'https://ude.my/' + url;
    window.open(
        url,
        '_blank'
    )
}

function OpenIconURL(url){
    window.open(
        url,
        '_blank'
    )
}

function ModalDataLoad(el) {
    fetch(el)
    .then(()=>{
        var root = el.parentElement.parentElement.parentElement.parentElement;
        var title = root.querySelector('.card-header > img ').getAttribute('title');
        var content = root.querySelector('.card-body > .card-text ').innerText;

        var modal = document.querySelector(el.getAttribute('data-bs-target'));
        modal.querySelector('.modal-header > .modal-title').innerText = title;
        modal.querySelector('.modal-body').innerText = content;
    })

}

function CleanModal(el) {
    var modal = el.parentElement.parentElement;
        modal.querySelector('.modal-header > .modal-title').innerText = '';
        modal.querySelector('.modal-body').innerText = '';
    // fetch(el)
    // .then(()=>{

        
    // })
}