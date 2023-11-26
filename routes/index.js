var express = require("express");
var multer = require("multer");
var router = express.Router();
var upload = multer({ dest: "public/images/" });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//////////////// API ////////////////

router.get("/recipe/:food/", (req, res) => {
  const foodname = req.params.food;
  res.json({
    name: foodname,
    instructions: ["a", "b"],
    ingredients: ["a", "b"],
  });
});

// log new recipes

let recipes = [];

router.post("/recipe/", (req, res) => {
  let recipe = req.body;
  recipes.push(recipe);
  console.log("Received recipe:", recipe);
  res.json(recipe);
});

// image route
router.post("/images/", (req, res) => {
  console.log("Received files:");
  res.send("Hi");
});

//////////////// END API ////////////////

module.exports = router;
