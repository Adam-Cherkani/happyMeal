// ------------------  Afficher la liste avec dropdownMenu -------------------- //

document.addEventListener("DOMContentLoaded", function() {
  const dropdownMenu = document.querySelector("#dropdownMenu");
  const dropdownList = document.querySelector("#dropdownList");

  document.querySelector(".svgRight").addEventListener("click", function() {
    
      const ingredients = JSON.parse(localStorage.getItem("List")) || [];

      dropdownList.innerHTML = "";

      ingredients.forEach(function(ingredient) {
          const listIngredient = document.createElement("li");
          listIngredient.style="width:100%;";
          listIngredient.innerHTML = `
              <div style='display:flex; align-items:center; justify-content:space-between; gap:2rem;'>
                  <span>${ingredient.nom} ${ingredient.quantite}</span>
                  <button class='delBtn'><i class="ri-delete-bin-line"></i></button>
              </div>
          `;
          dropdownList.appendChild(listIngredient);
      });

      dropdownMenu.classList.toggle("show");
  });

  // ------------------  Fonction de suppression item par item -------------------- //

  dropdownList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delBtn')) {
          const index = Array.from(event.target.parentNode.parentNode.parentNode.children).indexOf(event.target.parentNode.parentNode);
          const ingredients = JSON.parse(localStorage.getItem("List")) || [];
          ingredients.splice(index, 1);
          localStorage.setItem('List', JSON.stringify(ingredients));
          displayIngredients();
      }
  });
});

// ------------------  Affichage de la liste avec dropdownMenu pour mise à jour après suppression d'un élément -------------------- //

function displayIngredients() {
  const dropdownList = document.querySelector("#dropdownList");
  const ingredients = JSON.parse(localStorage.getItem("List")) || [];

  dropdownList.innerHTML = "";

  ingredients.forEach(function(ingredient) {
      const listIngredient = document.createElement("li");
      listIngredient.style="width:100%;";
      listIngredient.innerHTML = `
          <div style='display:flex; align-items:center; justify-content:space-between; gap:2rem;'>
              <span>${ingredient.nom} ${ingredient.quantite}</span>
              <button class='delBtn'><i class="ri-delete-bin-line"></i></button>
          </div>
      `;
      dropdownList.appendChild(listIngredient);
  });
}

displayIngredients();


// ------------------ SearchBar dynamique -------------------- //

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
                  
                  suggestions.forEach(function(suggested, event) {

                      const suggestionsDiv = document.createElement('div');
                      suggestionsDiv.innerHTML = `
                      <a href="recipes.html#_${suggested.id}">${suggested.nom}</a>
                      <input type="hidden" value=${suggested.id}></input>
                      `;
                      suggestionsPanel.appendChild(suggestionsDiv);
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

// ------------------  redirection au clic sur l'icone loupe sur toute autre page que recipes.html -------------------- //

let searchIcon = document.querySelector(".search-icon");

searchIcon.addEventListener('click', function() {
    window.location.href = 'recipes.html';
});
