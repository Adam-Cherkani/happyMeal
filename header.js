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

