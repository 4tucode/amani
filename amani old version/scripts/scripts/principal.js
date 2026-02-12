function ShowAbout(){
    var redes = document.getElementById('redes');
    var about = document.getElementById('about');
    var row = document.getElementById('row');
    var row2 = document.getElementById('row2');
    var caja_logo = document.getElementById('caja-logo');
    about.classList.toggle("open");
    row.classList.toggle("open");
    row2.classList.toggle("open");
    caja_logo.classList.toggle("open");
    redes.classList.toggle("open");
}

function ShowBlog(){
    var contacto = document.getElementById('contacto');
    var caja_logo = document.getElementById('caja-blog');
    contacto.classList.toggle("open");
    caja_logo.classList.toggle("open");
}