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
