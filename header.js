document.addEventListener("DOMContentLoaded", function() {
    const dropdownMenu = document.querySelector("#dropdownMenu");
    const dropdownList = document.querySelector("#dropdownList");

    document.querySelector(".svgRight").addEventListener("click", function() {
  
      const ingredients = JSON.parse(localStorage.getItem("List", "nom", "quantite")) || [];

      dropdownList.innerHTML = "";

      ingredients.forEach(function(ingredient) {
        const listIngredient = document.createElement("li");
        listIngredient.innerHTML = `<li>${ingredient.nom} ${ingredient.quantite}</li>`;
        dropdownList.appendChild(listIngredient);
      });
  
      dropdownMenu.classList.toggle("show");
    });
});

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById('search-input');
  const suggestionsPanel = document.createElement('div');
  suggestionsPanel.id = 'suggestions';
  document.querySelector('.search-container').appendChild(suggestionsPanel);

  searchInput.addEventListener('input', function() {
      const input = searchInput.value;
      suggestionsPanel.innerHTML = '';
      if (input.length >= 1) {
          fetch('data.json')
              .then(response => response.json())
              .then(data => {
                  const suggestions = data.recettes.filter(function(recette) {
                      return recette.nom.toLowerCase().includes(input.toLowerCase()) ||
                             recette.ingredients.some(ing => ing.nom.toLowerCase().includes(input.toLowerCase()));
                  });
                  suggestions.forEach(function(suggested) {
                      const div = document.createElement('div');
                      div.innerHTML = suggested.nom;
                      div.addEventListener('click', function() {
                          window.location.href = `recipes.html#${suggested.id}`;
                      });
                      suggestionsPanel.appendChild(div);
                  });
                  if (suggestions.length === 0) {
                      suggestionsPanel.innerHTML = '<div>Aucun résultat trouvé</div>';
                  }
              });
      }
  });

  document.addEventListener('click', function(e) {
      if (e.target.id !== 'search-input') {
          suggestionsPanel.innerHTML = '';
      }
  });
});

