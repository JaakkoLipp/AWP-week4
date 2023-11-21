document.getElementById('input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const recipe = document.getElementById("recipe-input").value;
    const recipeDiv = document.getElementById("recipe-div");

    // get recipe data
    fetch(`/recipe/${recipe}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('fetch failed');
            } 
            return response.json();
        })
        .then(recipedata => {
            console.log(recipedata);
            recipeDiv.innerHTML = ""; //empty div

            // Display recipe name
            const nameH3 = document.createElement('h3');
            nameH3.textContent = "Name";
            recipeDiv.appendChild(nameH3);

            const name = document.createElement('ul');
            const nameLi = document.createElement('li');
            nameLi.textContent = recipedata.name;
            name.appendChild(nameLi);
            recipeDiv.appendChild(name);

            // Display instructions
            const instructionsH3 = document.createElement('h3');
            instructionsH3.textContent = "Instructions";
            recipeDiv.appendChild(instructionsH3);

            const instructionsUl = document.createElement('ul');
            recipeDiv.appendChild(instructionsUl);

            recipedata.instructions.forEach(element => {
                const li = document.createElement('li');
                li.textContent = element;
                instructionsUl.appendChild(li);
            });

            // Display ingredients
            const ingredientsH3 = document.createElement('h3');
            ingredientsH3.textContent = "Ingredients";
            recipeDiv.appendChild(ingredientsH3);

            const ingredientsUl = document.createElement('ul');
            recipeDiv.appendChild(ingredientsUl);

            recipedata.ingredients.forEach(element => {
                const li = document.createElement('li');
                li.textContent = element;
                ingredientsUl.appendChild(li);
            });
        });
});

// new recipe
var newRecipeIngredients = [];
var newRecipeInstructions = [];

/////////// Fix it so that it pushes to list on button press?? ////////////////

// save ingredients
document.getElementById('add-ingredient').addEventListener('click', () => {
    console.log("ingredients saved");
    let textareaContent = document.getElementById('ingredients-text').value;
    newRecipeIngredients = textareaContent.split('\n').filter(function(item) {
        return item.trim() !== '';
    });
});

// save instructions
document.getElementById('add-instruction').addEventListener('click', () => {
    console.log("instructions saved");
    let textareaContent = document.getElementById('instructions-text').value;
    newRecipeInstructions = textareaContent.split('\n').filter(function(item) {
        return item.trim() !== '';
    });
});

// finally send all in json form
document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newRecipeName = document.getElementById('name-text').value.trim();

    let recipe = {
        name: newRecipeName,
        ingredients: newRecipeIngredients,
        instructions: newRecipeInstructions
    };

    fetch('/recipe/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(recipeResponse => {
        console.log('Recipe submitted:', recipeResponse);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});



// Image handling
document.getElementById('image-upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const imagesInput = document.getElementById('image-input');
    const formData = new FormData();
    for(let i=0; i<imagesInput.isDefaultNamespace.length; i++){
        formData.append('images', imagesInput.files[i]);
    }
    fetch('/images', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        imagesInput.value = '';
        // Handle success
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors
    });
});
