// Url de la API:  https://api.chucknorris.io/jokes/random

const botonChiste = document.getElementById('fetchJoke');
const listaChistes = document.getElementById('jokeList');

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
      
         listaChistes.appendChild(elementoChiste);
       })
       .catch((error) => {
         console.error('Error:', error);
         alert('Error al obtener el chiste');
       });
}

// FUNCIONES PARA LOS DIFERENTES BOTONES
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