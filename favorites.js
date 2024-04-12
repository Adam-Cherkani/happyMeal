document.addEventListener('DOMContentLoaded', displayFavorites);

async function fetchRecipes() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Le chargement des recettes a échoué.');
        }
        const data = await response.json();
        return data.recettes;
    } catch (error) {
        document.getElementById('display').innerHTML = `<p>Erreur lors du chargement des recettes: ${error.message}</p>`;
    }
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favRecipes')) || [];
    return favorites;
}

async function displayFavorites() {
    const favorites = loadFavorites();
    const recipes = await fetchRecipes();

    if (!recipes || favorites.length === 0) {
        document.getElementById('display').innerHTML = '<p>Aucun favori sélectionné.</p>';
        return;
    }

    
    const favoriteRecipes = recipes.filter(recipe => favorites.some(fav => fav.id == recipe.id)); 


    const displaySection = document.getElementById('display');
    displaySection.innerHTML = ''; 

   
    if (favoriteRecipes.length === 0) {
        displaySection.innerHTML = '<p>Aucune recette favorite trouvée.</p>';
        return;
    }

    favoriteRecipes.forEach(recipe => {
        const recipeElement = document.createElement('article');
        recipeElement.className = 'recipe';
        recipeElement.innerHTML = `
        
        <div class="recipe-banner">
        <input class="recipeId" type="hidden" value="${recipe.id}"></input>
            <img class="recipe-image" src="${recipe.image}">
            <div class="recipe-info">
                <h2>${recipe.nom}</h2>
                <p>${recipe.categorie}</p>
                <p>Temps de préparation : ${
                  recipe.temps_preparation
                }</p>
                <ul>
                    ${recipe.ingredients.map(ingredient => `
                        <li class="ingredient">
                            <span class="nom">${ingredient.nom}:</span>
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
        `;
        displaySection.appendChild(recipeElement);
    });
    checkFavRecipes();
    attachFavEvent();
    attachEventListeners();
}

 function checkFavRecipes() {

    const favRecipes = JSON.parse(localStorage.getItem('favRecipes'));

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
            const idJson = {
                id : recipeId
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
