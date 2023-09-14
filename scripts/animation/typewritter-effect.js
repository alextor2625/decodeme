document.addEventListener('DOMContentLoaded',function(event){

function typeWriter(text,i,id){

    if (i < (text.length)) {
        // add next character to h1
        document.querySelector(`#${id}`).innerHTML = text.substring(0, i+1) +'<span aria-hidden="true" class="caret"></span>';
        setTimeout(function() {
            typeWriter(text, i + 1)
        }, 100);
    }
}


})