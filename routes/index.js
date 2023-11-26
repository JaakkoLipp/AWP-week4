var express = require("express");
var multer = require("multer");
var router = express.Router();
var path = require("path");

// Storage configuration

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

const upload = multer({ storage: storage });

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
router.post("/images", upload.array("images"), (req, res) => {
  console.log("Received files:", req.files);
  res.send("Hi");
});

//////////////// END API ////////////////

module.exports = router;
