document.getElementById('input-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const recipe = document.getElementById("recipe-input").value;
    fetch(`/recipe/${recipe}`)
        .then(response =>{
            if(!response.ok){
                throw new Error('fetch failed');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            
        })
});
