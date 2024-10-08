const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const recipeDetailsContent = document.querySelector('.recipe-details-content');

// Function to get recipe
const fetchRecipes = async (query) => {

    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>"
    try {

        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const response = await data.json();

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            // console.log(meal);
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <img src ="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);
            recipeContainer.appendChild(recipeDiv);

            // Adding EventListener to recipe button
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            })
            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>"
    }
    // console.log(response.meals[0]);
}

// function to fetch ingredents and measurement
const fetchIngredents = (meal) => {
    // console.log(meal);
    let ingredentsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredent = meal[`strIngredient${i}`];
        if (ingredent) {
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${measure} ${ingredent}</li>`
        } else {
            break;
        }
    }
    return ingredentsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h2>Ingredents:</h2>
    <ul class="ingredentsList">${fetchIngredents(meal)}</ul>
    <div class="recipeInstructions">
        <h3 class="recipeInst">Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Please type the meal name in the searchbox...</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    // console.log("Button Clicked");
})


