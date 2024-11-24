// Url de la API:  https://api.chucknorris.io/jokes/random

const botonChiste = document.getElementById('fetchJoke');
const listaChistes = document.getElementById('jokeList');
let chistesNum = 0;



// --------------------------------  FUNCION PARA LLAMAR A LA API DE CHUCK NORRIS -----------------------------
function obtenerChiste() {
    fetch('https://api.chucknorris.io/jokes/random')
       .then((response) => {
         if (!response.ok) {
             throw new Error('Error al obtener la respuesta');
         }
         return response.json();
       })
       .then((data) => {
         mostrarChistes(data);
       })
       .catch((error) => {
         console.error('Error:', error);
         alert('Error al obtener el chiste');
       });
}



// --------------------------------  FUNCION PARA MOSTRAR CHISTES EN PANTALLA  -----------------------------
function mostrarChistes(data) {

    // guardo en chiste data.value
    chistesNum ++;
    const chiste = data.value;

    // guardo en localStorage chiste y numero
    localStorage.setItem('chiste' + `${chistesNum}`, chiste);
    localStorage.setItem('numero', chistesNum);

    creaLiChistes(chistesNum, chiste);
}



// --------------------------------  FUNCION PARA CREAR ELEMENTO CHISTE Y AÑADIRLO A LA LISTA  -----------------------------
function creaLiChistes(chistesNum, chiste) {
    // Crear elemento para el chiste y añadirlo a la lista
    const elementoChiste = document.createElement('li');
    elementoChiste.classList.add('chiste');
    elementoChiste.setAttribute('id', 'chiste' + chistesNum);
    elementoChiste.textContent = chiste;
    listaChistes.appendChild(elementoChiste);

   // Añadimos boton para borrar el chiste
    const botonBorrar = document.createElement('button');
    botonBorrar.textContent = 'Borrar';
    botonBorrar.classList.add('boton-borrar');
    elementoChiste.appendChild(botonBorrar);

    // Añadir evento al boton borrar para que al hacer click, se elimine el chiste de la lista
    botonBorrar.addEventListener('click', () => {
        const chisteId = elementoChiste.id;
        localStorage.removeItem(chisteId);
        listaChistes.removeChild(elementoChiste);
    });
}



// --------------------------------  FUNCIONES PARA LOS DIFERENTES BOTONES  -----------------------------
botonChiste.addEventListener('click', () => {
    obtenerChiste();
});

borrarLista.addEventListener('click', () => {
    listaChistes.innerHTML = '';
    localStorage.clear();
    chistesNum = 0;
});



// -----------------------------   RECARGAR PÁGINA Y CARGAR CHISTES ALMACENADOS EN LOCALSTORAGE   -----------------------------
window.addEventListener('DOMContentLoaded', () => {
    const numero = localStorage.getItem('numero');
    if (numero) {
        chistesNum = numero;
        const claves = Object.keys(localStorage).filter((key) => key.startsWith('chiste'));
        claves.forEach((key) => {
            const chiste = localStorage.getItem(key);
            const numeroChiste = key.replace('chiste', '');
            creaLiChistes(numeroChiste, chiste);
        });
    }
});