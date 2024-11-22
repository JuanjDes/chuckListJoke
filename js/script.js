// Url de la API:  https://api.chucknorris.io/jokes/random

const botonChiste = document.getElementById('fetchJoke');
const listaChistes = document.getElementById('jokeList');

// --------------------------------  FUNCIONES PARA OBTENER EL CHISTE -----------------------------
function obtenerChiste() {
    fetch('https://api.chucknorris.io/jokes/random')
       .then((response) => {
         if (!response.ok) {
             throw new Error('Error al obtener la respuesta');
         }
         return response.json();
       })
       .then((data) => {

        // Crear elemento para el chiste y añadirlo a la lista
         const elementoChiste = document.createElement('li');
         elementoChiste.classList.add('chiste');
         elementoChiste.textContent = data.value;

        // Añadimos boton para borrar el chiste
         const elementoBorrar = document.createElement('button');
         elementoBorrar.textContent = 'Borrar';
         elementoBorrar.classList.add('boton-borrar');
         elementoChiste.appendChild(elementoBorrar);

        // Añadir evento al elemento para que al hacer click, se elimine el chiste de la lista
         elementoChiste.addEventListener('click', () => {
            elementoChiste.remove();
         });
      
        listaChistes.appendChild(elementoChiste);
       })
       .catch((error) => {
         console.error('Error:', error);
         alert('Error al obtener el chiste');
       });
}

// --------------------------------  FUNCIONES PARA LOS DIFERENTES BOTONES -----------------------------
botonChiste.addEventListener('click', () => {
    /* listaChistes.innerHTML = ''; */
    obtenerChiste();
});

borrarLista.addEventListener('click', () => {
    listaChistes.innerHTML = '';
});

borrarUltimo.addEventListener('click', () => {
    const ultimoChiste = listaChistes.lastElementChild;
    if (ultimoChiste) {
        listaChistes.removeChild(ultimoChiste);
    }
});

// Recargar página y cargar chistes almacenados en localStorage
 /* window.addEventListener('load', () => {
    const chistesGuardados = localStorage.getItem('chistes');
    if (chistesGuardados) {
        const chistesArray = chistesGuardados.split(',');
        chistesArray.forEach((chiste) => {
            const elementoChiste = document.createElement('li');
            elementoChiste.classList.add('chiste');
            elementoChiste.textContent = chiste;
            elementoChiste.addEventListener('click', () => {
                elementoChiste.remove();
            });
            listaChistes.appendChild(elementoChiste);
        });
    }
}); */