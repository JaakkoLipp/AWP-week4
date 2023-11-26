var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//////////////// API ////////////////

router.get("/recipe/:food", (req, res) => {
  const foodname = req.params.food;
  const recipedata = {name: foodname, instructions: ["a","b"], ingredients: ["a","b"]};
  res.json(recipedata);
});

// log new recipes

let recipes = [];

router.post("/recipe/", (req, res) => {
  let recipe = req.body;
  recipes.push(recipe);
  console.log("Received recipe:", recipe);
  res.json(recipe);
});

router.post("/images/", (req, res) => {
  let image = req.body;
  console.log("Received image:", image);
  res.json("Hi");
});

//////////////// API ////////////////

module.exports = router;
