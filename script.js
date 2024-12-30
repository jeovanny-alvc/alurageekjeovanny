document.addEventListener('DOMContentLoaded', () => {
    const characterContainer = document.getElementById('character-container');
    const characterForm = document.getElementById('character-form');
  
    // Función para obtener y mostrar los personajes
    const fetchCharacters = async () => {
      try {
        const response = await fetch('http://localhost:3000/characters');
        const characters = await response.json();
        characterContainer.innerHTML = '';
        characters.forEach(character => {
          const characterCard = document.createElement('div');
          characterCard.className = 'character-card';
          characterCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>${character.description}</p>
          `;
          characterContainer.appendChild(characterCard);
        });
      } catch (error) {
        console.error('Error al obtener los personajes:', error);
      }
    };
  
    // Manejo del envío del formulario
    characterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const image = document.getElementById('image').value;
      const description = document.getElementById('description').value;
  
      const newCharacter = { name, image, description };
  
      try {
        const response = await fetch('http://localhost:3000/characters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCharacter)
        });
        if (response.ok) {
          fetchCharacters();
          characterForm.reset();
        } else {
          console.error('Error al agregar el personaje');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    });
  
    // Cargar los personajes al cargar la página
    fetchCharacters();
  });
  