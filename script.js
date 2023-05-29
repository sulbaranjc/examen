const pokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=6";
const container = document.getElementById("pokemon-cards");

fetch(pokeAPI)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemon => {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(pokeData => {
                    const pokemonDiv = document.createElement('div');
                    pokemonDiv.classList.add('card');
                    pokemonDiv.style.width = '10rem';
                    pokemonDiv.innerHTML = `
                        <img src="${pokeData.sprites.front_default}" class="card-img-top" alt="${pokeData.name}">
                        <div class="card-body">
                            <h5 class="card-title">${pokeData.name}</h5>
                        </div>
                    `;
                    container.appendChild(pokemonDiv);
                });
        });
    });

const toggleButton = document.getElementById('toggle-button');

const originalPositions = [];

let isMoving = false;

toggleButton.addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');

    if (isMoving) {
        cards.forEach((card, index) => {
            card.style.transform = originalPositions[index];
            card.classList.remove('floating');
        });

        toggleButton.textContent = 'Start';

        isMoving = false;
    } else {
        cards.forEach((card, index) => {
            originalPositions[index] = card.style.transform;

            const randomX = Math.floor(Math.random() * 200) - 100;
            const randomY = Math.floor(Math.random() * 200) - 100;
            card.style.transform = `translate(${randomX}px, ${randomY}px)`;
            card.classList.add('floating');
        });

        toggleButton.textContent = 'Stop';

        isMoving = true;
    }
});
