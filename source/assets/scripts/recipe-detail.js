// recipe-detail.js
/** @module recipe-detail */

window.addEventListener('DOMContentLoaded', init);

import * as backend from './backend.js';



/**
 * Initialize and call other function
 */
async function init() {

  const recipe = backend.get_recipe(backend.get_selected());

  // Create a recipe card with mock data
  let expandedRecipeCard = document.createElement('expanded-recipe-card');
  expandedRecipeCard.data = recipe;
  document.querySelector('.recipe-detail__wrapper').appendChild(expandedRecipeCard);

  saveOrSaved(recipe);
  goDashboard();
  goSearch();
  goAdd();
  goSettings();
  populateUI(recipe);
}

function populateUI(recipe) {
  console.log(recipe);
  document.getElementById('cooking-time-input').textContent = `${recipe.readyInMinutes} mins`;
  document.getElementById('serving-size-input').textContent = `${recipe.servings} servings`;

  const ingredientsWrapper = document.querySelector('.specific-ingredients');
  recipe.ingredients.forEach(function(ingredient) {
    const ingredientElem = document.createElement('p');
    ingredientElem.textContent = ingredient.original;
    ingredientsWrapper.appendChild(ingredientElem);
  });

  const stepsWrapper = document.querySelector('.specific-instructions');
  recipe.steps.forEach(function(step) {
    const stepElem = document.createElement('p');
    stepElem.textContent = `${step.step}`; 
    stepsWrapper.appendChild(stepElem);
  });
}

/**
 * Click to change to save or saved
 */
function saveOrSaved(recipe) {
  const btn = document.querySelector('.save');
  const heart = document.getElementById('heart');
  const text = document.getElementById('save-or-not');

  if (backend.get_favorite().includes(recipe.hash)) {
    text.textContent = 'SAVED';
    heart.src = 'assets/images/heart1.svg';
  }

  btn.addEventListener('click', () => {
    if (text.textContent === 'SAVE') {
      text.textContent = 'SAVED';
      heart.src = 'assets/images/heart1.svg';
      backend.add_favorite(recipe.hash);
    } else {
      text.textContent = 'SAVE';
      heart.src = 'assets/images/heart0.svg';
      backend.remove_favorite(recipe.hash);
    }
  });
}

/**
 * Click to go back to dashboard
 */
function goDashboard() {
  const btn = document.getElementsByClassName('nav-dashboard');

  btn[0].addEventListener('click', () => {
    window.location.replace('index.html');
  });
}


/**
 * Click to go to search
 */
function goSearch() {
  const btn = document.getElementsByClassName('nav-search');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-search.html');
  });
}

/**
 * Click to add the recipe card
 */
function goAdd() {
  const btn = document.getElementsByClassName('nav-add');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-add.html');
  });
}

/**
 * Click to go to settings
 */
function goSettings() {
  const btn = document.getElementsByClassName('nav-settings');

  btn[0].addEventListener('click', () => {
    window.location.replace('settings.html');
  });
}
