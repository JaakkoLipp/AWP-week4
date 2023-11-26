var express = require("express");
var router = express.Router();

//var multer = require("multer");
//var path = require("path");

/* Storage configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });*/

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

router.post("/recipe/", upload.array("images"), (req, res) => {
  let recipe = req.body;
  recipes.push(recipe);
  console.log("Received recipe:", recipe);
  res.json(recipe);
});

// image route
router.post("/new_images", (req, res) => {
  console.log("/images hit, responding with Hi");
  res.send("Hi");
});

//////////////// END API ////////////////

module.exports = router;
