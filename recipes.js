let currentPage = 1;
let recipesPerPage = 9;

async function displayRecipes(page) {
  await fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.recettes;
      const display = document.querySelector("#display");
      const start = (page - 1) * recipesPerPage;
      const end = page * recipesPerPage;
      const paginatedRecipes = recipes.slice(start, end);

      paginatedRecipes.forEach((recipe) => {
        display.innerHTML += `
            <article class="recipe">
                <div class="recipe-banner">
                    <input class="recipeId" type="hidden" value="${recipe.id}"></input>
                    <img class="recipe-image" src="${recipe.image}">
                    <div class="recipe-info">
                        <h2>${recipe.nom}</h2>
                        <p class="recipe-categorie">${recipe.categorie}</p>
                        <p class="recipe-prepa">Temps de préparation : ${
                          recipe.temps_preparation
                        }</p>
                        <ul>
                            ${recipe.ingredients.map(ingredient => `
                                <li class="ingredient">
                                    <span class="nom">${ingredient.nom}</span>
                                    <span class="quantite">${ingredient.quantite}</span>
                                    <button class="addBtn">+</button>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <i class="ri-heart-line addFav"></i>
                </div>
                <ul class="steps">
                    ${recipe.etapes
                      .map((etape) => `<li>${etape}</li><br>`)
                      .join("")}
                </ul>
            </article>
            `;
      });
      checkFavRecipes();
      attachFavEvent();
      attachEventListeners();
    })
    .then(() => {
        if (page === 1) {
            currentPage = 2;
        }
    })
    .then(() => {
      if (currentPage === 2) {
        recipesPerPage = 5;
      }
    });
}

async function checkFavRecipes() {

    const favRecipes = await JSON.parse(localStorage.getItem('favRecipes'));

    if (favRecipes) {
        const addFavBtns = document.querySelectorAll('.addFav');
        addFavBtns.forEach(button => {
            const recipeId = button.parentNode.querySelector('.recipeId').value;
            if (favRecipes.some(recipe => recipe.id === recipeId)) {
                button.classList.add('colored');
            }
        });
    }
}

function initPagination() {
  const paginationControls = document.querySelector("#pagination-controls");
  paginationControls.innerHTML = `
    <button class='paginationBtn' onclick="displayRecipes(1)">Page 1</button>
    <button class='paginationBtn' onclick="displayRecipes(2)">Page 2</button>
    `;
  displayRecipes(1);
}

initPagination();

function attachEventListeners() {
    const addBtns = document.querySelectorAll(".addBtn");
    addBtns.forEach(btn => {
        btn.addEventListener('click', function () {

            const originalContent = this.innerHTML;

            this.innerHTML = '<i class="ri-check-line"></i>';
            setTimeout(() => {
                this.innerHTML = originalContent;
            }, 500);

            const ingredient = this.parentNode;
            const nom = ingredient.querySelector('.nom').textContent;
            const quantite = parseInt(ingredient.querySelector('.quantite').textContent);

            let existingList = localStorage.getItem('List');
            if (!existingList) {
                existingList = [];
            } else {
                existingList = JSON.parse(existingList);
            }

            const existingIngredient = existingList.find(item => item.nom === nom);

            if (existingIngredient) {
                existingIngredient.quantite += quantite;
            } else {
                existingList.push({ nom: nom, quantite: quantite });
            }

            localStorage.setItem('List', JSON.stringify(existingList));
        });
    });
}



attachEventListeners();

function attachFavEvent() {
    let addFavBtn = document.querySelectorAll('.addFav');
    addFavBtn.forEach(button => {
        button.addEventListener('click', function() {

            const parentRecipes = this.parentNode;
            const recipeId = parentRecipes.querySelector('.recipeId').value;
            const recipeImage = parentRecipes.querySelector('.recipe-image').value;
            const recipeNom = parentRecipes.querySelector('.recipe-info h2').textContent;
            const recipeCategorie = parentRecipes.querySelector('.recipe-categorie').textContent;

            const idJson = {
                id : recipeId, 
                image : recipeImage,
                nom : recipeNom,
                categorie : recipeCategorie
            };

            let existingFavList = localStorage.getItem('favRecipes');
            if (!existingFavList) {
                existingFavList = [];
            } else {
                existingFavList = JSON.parse(existingFavList);
            }

            const existingRecipeIndex = existingFavList.findIndex(item => item.id === recipeId);

            if (existingRecipeIndex === -1) {
                existingFavList.push(idJson);
                this.classList.add('colored');
            } else {
                existingFavList.splice(existingRecipeIndex, 1);
                this.classList.remove('colored');
            }

            localStorage.setItem('favRecipes', JSON.stringify(existingFavList));
        });
    });
}