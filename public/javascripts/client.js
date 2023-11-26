document.getElementById("input-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const recipe = document.getElementById("recipe-input").value;
  const recipeDiv = document.getElementById("recipe-div");

  // get recipe data
  fetch(`/recipe/${recipe}/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("fetch failed");
      }
      return response.json();
    })
    .then((recipedata) => {
      const recipeElement = document.getElementById("recipe-div");
      recipeElement.innerHTML = `
            <h2>${recipedata.name}</h2>
            <h4>Ingredients:</h4>
            <ul>${recipedata.ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}</ul>
            <h4>Instructions:</h4>
            <ol>${recipedata.instructions
              .map((step) => `<li>${step}</li>`)
              .join("")}</ol>
        `;
    })
    .catch((error) => console.error("Error:", error));
});

// new recipe
var newRecipeIngredients = [];
var newRecipeInstructions = [];

/////////// Fix it so that it pushes to list on button press?? ////////////////

// save ingredients
document.getElementById("add-ingredient").addEventListener("click", () => {
  console.log("ingredients saved");
  let textareaContent = document.getElementById("ingredients-text").value;
  newRecipeIngredients = textareaContent.split("\n").filter(function (item) {
    return item.trim() !== "";
  });
});

// save instructions
document.getElementById("add-instruction").addEventListener("click", () => {
  console.log("instructions saved");
  let textareaContent = document.getElementById("instructions-text").value;
  newRecipeInstructions = textareaContent.split("\n").filter(function (item) {
    return item.trim() !== "";
  });
});

// finally send all in json form
document
  .getElementById("recipe-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const newRecipeName = document.getElementById("name-text").value.trim();

    let recipe = {
      name: newRecipeName,
      ingredients: newRecipeIngredients,
      instructions: newRecipeInstructions,
    };

    fetch("/recipe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((recipeResponse) => {
        console.log("Recipe submitted:", recipeResponse);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Image handling
document
  .getElementById("image-upload-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const imagesInput = document.getElementById("image-input");
    const formData = new FormData();

    for (let i = 0; i < imagesInput.isDefaultNamespace.length; i++) {
      formData.append("images", imagesInput.files[i]);
    }
    fetch("/images", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        imagesInput.value = "";
        // Handle success
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  });
