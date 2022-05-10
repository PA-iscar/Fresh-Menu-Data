const fs = require("fs");
const express = require("express");
const filename = "recipe.json";
const recipe = require("../recipe.json");
const axios = require("axios");

const PORT = 8000;

let app = express();
app.use(express.json());

const trending = [
  "BEST OFFERS",
  null,
  null,
  null,
  null,
  "HEALTHY",
  null,
  null,
  null,
  null,
];

const trending2 = [null, "DESSERT", null, "DESSERT", null, "DESSERT", null];

app.get("/vegetarian", async (req, res) => {
  let response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian"
  );
  const data = response.data.meals;
  let obj = new Array();
  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let val = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
    );
    let el2 = val.data.meals[0];
    obj[i] = {};
    obj[i].name = el.strMeal;
    obj[i].price = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    obj[i].category = el2.strCategory;
    obj[i].cuisine = el2.strArea;
    obj[i].trending = trending[Math.floor(Math.random() * 10)];
    obj[i].tags = el2.strTags
      ? el2.strTags.split(",").filter((el) => el !== "" && el !== " ")
      : [];
    obj[i].image = el2.strMealThumb;
    obj[i].customizable = true;
    obj[i].details =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    obj[i].ingredients = [];
    for (let j = 1; j <= 20; j++) {
      if (el2[`strIngredient${j}`])
        obj[i].ingredients.push(el2[`strIngredient${j}`]);
    }
    obj[i].type =
      obj[i].ingredients.includes("Eggs") ||
      obj[i].ingredients.includes("eggs") ||
      obj[i].ingredients.includes("Egg Yolks") ||
      obj[i].ingredients.includes("free-range egg, beaten") ||
      obj[i].ingredients.includes("egg") ||
      obj[i].ingredients.includes("Egg")
        ? "Contains Egg"
        : "Veg";
  }
  fs.writeFileSync(filename, JSON.stringify([...obj], null, 2));

  res.json(data);
});

app.get("/dessert", async (req, res) => {
  let response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert"
  );
  const data = response.data.meals;
  let obj = new Array();

  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let val = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
    );
    let el2 = val.data.meals[0];

    obj[i] = {};
    obj[i].name = el.strMeal;
    obj[i].price = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    obj[i].category = el2.strCategory;
    obj[i].cuisine = el2.strArea;
    obj[i].trending = trending2[Math.floor(Math.random() * 7)];
    obj[i].tags = el2.strTags
      ? el2.strTags.split(",").filter((el) => el !== "" && el !== " ")
      : [];
    obj[i].image = el2.strMealThumb;
    obj[i].customizable = false;
    obj[i].details =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    obj[i].ingredients = [];
    for (let j = 1; j <= 20; j++) {
      if (el2[`strIngredient${j}`])
        obj[i].ingredients.push(el2[`strIngredient${j}`]);
    }
    obj[i].type =
      obj[i].ingredients.includes("Eggs") ||
      obj[i].ingredients.includes("eggs") ||
      obj[i].ingredients.includes("Egg Yolks") ||
      obj[i].ingredients.includes("free-range egg, beaten") ||
      obj[i].ingredients.includes("egg") ||
      obj[i].ingredients.includes("Egg")
        ? "Contains Egg"
        : "Veg";
  }

  fs.writeFileSync(filename, JSON.stringify([...recipe, ...obj], null, 2));
  // fs.writeFileSync(filename, JSON.stringify([...obj], null, 2));

  res.json(data);
});

app.get("/chicken", async (req, res) => {
  let response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=chicken"
  );
  const data = response.data.meals;
  let obj = new Array();

  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let val = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
    );
    let el2 = val.data.meals[0];

    obj[i] = {};
    obj[i].name = el.strMeal;
    obj[i].price = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    obj[i].category = el2.strCategory;
    obj[i].cuisine = el2.strArea;
    obj[i].trending = trending[Math.floor(Math.random() * 10)];
    obj[i].tags = el2.strTags
      ? el2.strTags.split(",").filter((el) => el !== "" && el !== " ")
      : [];
    obj[i].image = el2.strMealThumb;
    obj[i].customizable = true;
    obj[i].details =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    obj[i].ingredients = [];
    for (let j = 1; j <= 20; j++) {
      if (el2[`strIngredient${j}`])
        obj[i].ingredients.push(el2[`strIngredient${j}`]);
    }
    obj[i].type = "Non Veg";
  }

  fs.writeFileSync(filename, JSON.stringify([...recipe, ...obj], null, 2));
  // fs.writeFileSync(filename, JSON.stringify([...obj], null, 2));

  res.json(data);
});

app.get("/seafood", async (req, res) => {
  let response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
  );
  const data = response.data.meals;
  let obj = new Array();

  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let val = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
    );
    let el2 = val.data.meals[0];

    obj[i] = {};
    obj[i].name = el.strMeal;
    obj[i].price = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    obj[i].category = el2.strCategory;
    obj[i].cuisine = el2.strArea;
    obj[i].trending = trending[Math.floor(Math.random() * 10)];
    obj[i].tags = el2.strTags
      ? el2.strTags.split(",").filter((el) => el !== "" && el !== " ")
      : [];
    obj[i].image = el2.strMealThumb;
    obj[i].customizable = true;
    obj[i].details =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    obj[i].ingredients = [];
    for (let j = 1; j <= 20; j++) {
      if (el2[`strIngredient${j}`])
        obj[i].ingredients.push(el2[`strIngredient${j}`]);
    }
    obj[i].type = "Non Veg";
  }

  fs.writeFileSync(filename, JSON.stringify([...recipe, ...obj], null, 2));
  // fs.writeFileSync(filename, JSON.stringify([...obj], null, 2));

  res.json(data);
});

app.get("/breakfast", async (req, res) => {
  let response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=breakfast"
  );
  const data = response.data.meals;
  let obj = new Array();

  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let val = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
    );
    let el2 = val.data.meals[0];

    obj[i] = {};
    obj[i].name = el.strMeal;
    obj[i].price = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    obj[i].category = el2.strCategory;
    obj[i].cuisine = el2.strArea;
    obj[i].trending = trending[Math.floor(Math.random() * 10)];
    obj[i].tags = el2.strTags
      ? el2.strTags.split(",").filter((el) => el !== "" && el !== " ")
      : [];
    obj[i].image = el2.strMealThumb;
    obj[i].customizable = true;
    obj[i].details =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    obj[i].ingredients = [];
    for (let j = 1; j <= 20; j++) {
      if (el2[`strIngredient${j}`])
        obj[i].ingredients.push(el2[`strIngredient${j}`]);
    }
    obj[i].type =
      obj[i].ingredients.includes("Bacon") ||
      obj[i].ingredients.includes("Chicken Stock") ||
      obj[i].ingredients.includes("Smoked Salmon") ||
      obj[i].ingredients.includes("Minced Beef") ||
      obj[i].ingredients.includes("Beef Stock") ||
      obj[i].ingredients.includes("Sardines") ||
      obj[i].ingredients.includes("Tiger Prawns") ||
      obj[i].ingredients.includes("Bround Beef") ||
      obj[i].ingredients.includes("Chicken") ||
      obj[i].ingredients.includes("Beef") ||
      obj[i].ingredients.includes("Ground Pork") ||
      obj[i].ingredients.includes("Smoked Haddock") ||
      obj[i].ingredients.includes("King Prawns") ||
      obj[i].ingredients.includes("Lamb") ||
      obj[i].ingredients.includes("Fish Stock") ||
      obj[i].ingredients.includes("Prawns") ||
      obj[i].ingredients.includes("Pork") ||
      obj[i].ingredients.includes("Sausages") ||
      obj[i].ingredients.includes("Ham") ||
      obj[i].ingredients.includes("Duck Legs") ||
      obj[i].ingredients.includes("Chicken Stock Cube") ||
      obj[i].ingredients.includes("bacon")
        ? "Non Veg"
        : obj[i].ingredients.includes("Eggs") ||
          obj[i].ingredients.includes("eggs") ||
          obj[i].ingredients.includes("Egg Yolks") ||
          obj[i].ingredients.includes("free-range egg, beaten") ||
          obj[i].ingredients.includes("egg") ||
          obj[i].ingredients.includes("Egg")
        ? "Contains Egg"
        : "Veg";
    // obj[i].type = "Non Veg";
  }

  fs.writeFileSync(filename, JSON.stringify([...recipe, ...obj], null, 2));
  // fs.writeFileSync(filename, JSON.stringify([...obj], null, 2));

  res.json(data);
});

app.get("/pasta", async (req, res) => {
  let response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta"
  );
  const data = response.data.meals;
  let obj = new Array();

  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let val = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
    );
    let el2 = val.data.meals[0];

    obj[i] = {};
    obj[i].name = el.strMeal;
    obj[i].price = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    obj[i].category = el2.strCategory;
    obj[i].cuisine = el2.strArea;
    obj[i].trending = trending[Math.floor(Math.random() * 10)];
    obj[i].tags = el2.strTags
      ? el2.strTags.split(",").filter((el) => el !== "" && el !== " ")
      : [];
    obj[i].image = el2.strMealThumb;
    obj[i].customizable = true;
    obj[i].details =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    obj[i].ingredients = [];
    for (let j = 1; j <= 20; j++) {
      if (el2[`strIngredient${j}`])
        obj[i].ingredients.push(el2[`strIngredient${j}`]);
    }
    obj[i].type =
      obj[i].ingredients.includes("Bacon") ||
      obj[i].ingredients.includes("Chicken Stock") ||
      obj[i].ingredients.includes("Smoked Salmon") ||
      obj[i].ingredients.includes("Minced Beef") ||
      obj[i].ingredients.includes("Beef Stock") ||
      obj[i].ingredients.includes("Sardines") ||
      obj[i].ingredients.includes("Tiger Prawns") ||
      obj[i].ingredients.includes("Bround Beef") ||
      obj[i].ingredients.includes("Chicken") ||
      obj[i].ingredients.includes("Beef") ||
      obj[i].ingredients.includes("Ground Pork") ||
      obj[i].ingredients.includes("Smoked Haddock") ||
      obj[i].ingredients.includes("King Prawns") ||
      obj[i].ingredients.includes("Lamb") ||
      obj[i].ingredients.includes("Fish Stock") ||
      obj[i].ingredients.includes("Prawns") ||
      obj[i].ingredients.includes("Pork") ||
      obj[i].ingredients.includes("Sausages") ||
      obj[i].ingredients.includes("Ham") ||
      obj[i].ingredients.includes("Duck Legs") ||
      obj[i].ingredients.includes("Chicken Stock Cube") ||
      obj[i].ingredients.includes("bacon")
        ? "Non Veg"
        : obj[i].ingredients.includes("Eggs") ||
          obj[i].ingredients.includes("eggs") ||
          obj[i].ingredients.includes("Egg Yolks") ||
          obj[i].ingredients.includes("free-range egg, beaten") ||
          obj[i].ingredients.includes("egg") ||
          obj[i].ingredients.includes("Egg")
        ? "Contains Egg"
        : "Veg";
    // obj[i].type = "Non Veg";
  }

  fs.writeFileSync(filename, JSON.stringify([...recipe, ...obj], null, 2));
  // fs.writeFileSync(filename, JSON.stringify([...obj], null, 2));

  res.json(data);
});

app.get("/sides", async (req, res) => {
  let response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Side"
  );
  const data = response.data.meals;
  let obj = new Array();

  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let val = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
    );
    let el2 = val.data.meals[0];

    obj[i] = {};
    obj[i].name = el.strMeal;
    obj[i].price = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    obj[i].category = el2.strCategory;
    obj[i].cuisine = el2.strArea;
    obj[i].trending = trending[Math.floor(Math.random() * 10)];
    obj[i].tags = el2.strTags
      ? el2.strTags.split(",").filter((el) => el !== "" && el !== " ")
      : [];
    obj[i].image = el2.strMealThumb;
    obj[i].customizable = true;
    obj[i].details =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    obj[i].ingredients = [];
    for (let j = 1; j <= 20; j++) {
      if (el2[`strIngredient${j}`])
        obj[i].ingredients.push(el2[`strIngredient${j}`]);
    }
    obj[i].type =
      obj[i].ingredients.includes("Bacon") ||
      obj[i].ingredients.includes("Chicken Stock") ||
      obj[i].ingredients.includes("Smoked Salmon") ||
      obj[i].ingredients.includes("Minced Beef") ||
      obj[i].ingredients.includes("Beef Stock") ||
      obj[i].ingredients.includes("Sardines") ||
      obj[i].ingredients.includes("Tiger Prawns") ||
      obj[i].ingredients.includes("Bround Beef") ||
      obj[i].ingredients.includes("Chicken") ||
      obj[i].ingredients.includes("Beef") ||
      obj[i].ingredients.includes("Ground Pork") ||
      obj[i].ingredients.includes("Smoked Haddock") ||
      obj[i].ingredients.includes("King Prawns") ||
      obj[i].ingredients.includes("Lamb") ||
      obj[i].ingredients.includes("Fish Stock") ||
      obj[i].ingredients.includes("Prawns") ||
      obj[i].ingredients.includes("Pork") ||
      obj[i].ingredients.includes("Sausages") ||
      obj[i].ingredients.includes("Ham") ||
      obj[i].ingredients.includes("Duck Legs") ||
      obj[i].ingredients.includes("Chicken Stock Cube") ||
      obj[i].ingredients.includes("bacon")
        ? "Non Veg"
        : obj[i].ingredients.includes("Eggs") ||
          obj[i].ingredients.includes("eggs") ||
          obj[i].ingredients.includes("Egg Yolks") ||
          obj[i].ingredients.includes("free-range egg, beaten") ||
          obj[i].ingredients.includes("egg") ||
          obj[i].ingredients.includes("Egg")
        ? "Contains Egg"
        : "Veg";
    // obj[i].type = "Non Veg";
  }

  fs.writeFileSync(filename, JSON.stringify([...recipe, ...obj], null, 2));
  // fs.writeFileSync(filename, JSON.stringify([...obj], null, 2));

  res.json(data);
});

app.get("/starter", async (req, res) => {
  let response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter"
  );
  const data = response.data.meals;
  let obj = new Array();

  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let val = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
    );
    let el2 = val.data.meals[0];

    obj[i] = {};
    obj[i].name = el.strMeal;
    obj[i].price = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    obj[i].category = el2.strCategory;
    obj[i].cuisine = el2.strArea;
    obj[i].trending = trending[Math.floor(Math.random() * 10)];
    obj[i].tags = el2.strTags
      ? el2.strTags.split(",").filter((el) => el !== "" && el !== " ")
      : [];
    obj[i].image = el2.strMealThumb;
    obj[i].customizable = true;
    obj[i].details =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    obj[i].ingredients = [];
    for (let j = 1; j <= 20; j++) {
      if (el2[`strIngredient${j}`])
        obj[i].ingredients.push(el2[`strIngredient${j}`]);
    }
    obj[i].type =
      obj[i].ingredients.includes("Bacon") ||
      obj[i].ingredients.includes("Chicken Stock") ||
      obj[i].ingredients.includes("Smoked Salmon") ||
      obj[i].ingredients.includes("Minced Beef") ||
      obj[i].ingredients.includes("Beef Stock") ||
      obj[i].ingredients.includes("Sardines") ||
      obj[i].ingredients.includes("Tiger Prawns") ||
      obj[i].ingredients.includes("Bround Beef") ||
      obj[i].ingredients.includes("Chicken") ||
      obj[i].ingredients.includes("Beef") ||
      obj[i].ingredients.includes("Ground Pork") ||
      obj[i].ingredients.includes("Smoked Haddock") ||
      obj[i].ingredients.includes("King Prawns") ||
      obj[i].ingredients.includes("Lamb") ||
      obj[i].ingredients.includes("Fish Stock") ||
      obj[i].ingredients.includes("Prawns") ||
      obj[i].ingredients.includes("Pork") ||
      obj[i].ingredients.includes("Sausages") ||
      obj[i].ingredients.includes("Ham") ||
      obj[i].ingredients.includes("Duck Legs") ||
      obj[i].ingredients.includes("Chicken Stock Cube") ||
      obj[i].ingredients.includes("bacon")
        ? "Non Veg"
        : obj[i].ingredients.includes("Eggs") ||
          obj[i].ingredients.includes("eggs") ||
          obj[i].ingredients.includes("Egg Yolks") ||
          obj[i].ingredients.includes("free-range egg, beaten") ||
          obj[i].ingredients.includes("egg") ||
          obj[i].ingredients.includes("Egg")
        ? "Contains Egg"
        : "Veg";
    // obj[i].type = "Non Veg";
  }

  fs.writeFileSync(filename, JSON.stringify([...recipe, ...obj], null, 2));
  // fs.writeFileSync(filename, JSON.stringify([...obj], null, 2));

  res.json(data);
});

app.get("/rice", async (req, res) => {
  let response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=Rice"
  );
  const data = response.data.meals;
  let obj = new Array();

  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let val = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
    );
    let el2 = val.data.meals[0];

    obj[i] = {};
    obj[i].name = el.strMeal;
    obj[i].price = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    obj[i].category = el2.strCategory;
    obj[i].cuisine = el2.strArea;
    obj[i].trending = trending[Math.floor(Math.random() * 10)];
    obj[i].tags = el2.strTags
      ? el2.strTags.split(",").filter((el) => el !== "" && el !== " ")
      : [];
    obj[i].image = el2.strMealThumb;
    obj[i].customizable = true;
    obj[i].details =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    obj[i].ingredients = [];
    for (let j = 1; j <= 20; j++) {
      if (el2[`strIngredient${j}`])
        obj[i].ingredients.push(el2[`strIngredient${j}`]);
    }
    obj[i].type =
      obj[i].ingredients.includes("Bacon") ||
      obj[i].ingredients.includes("Chicken Stock") ||
      obj[i].ingredients.includes("Smoked Salmon") ||
      obj[i].ingredients.includes("Minced Beef") ||
      obj[i].ingredients.includes("Beef Stock") ||
      obj[i].ingredients.includes("Sardines") ||
      obj[i].ingredients.includes("Tiger Prawns") ||
      obj[i].ingredients.includes("Bround Beef") ||
      obj[i].ingredients.includes("Chicken") ||
      obj[i].ingredients.includes("Beef") ||
      obj[i].ingredients.includes("Ground Pork") ||
      obj[i].ingredients.includes("Smoked Haddock") ||
      obj[i].ingredients.includes("King Prawns") ||
      obj[i].ingredients.includes("Lamb") ||
      obj[i].ingredients.includes("Fish Stock") ||
      obj[i].ingredients.includes("Prawns") ||
      obj[i].ingredients.includes("Pork") ||
      obj[i].ingredients.includes("Sausages") ||
      obj[i].ingredients.includes("Ham") ||
      obj[i].ingredients.includes("Duck Legs") ||
      obj[i].ingredients.includes("Chicken Stock Cube") ||
      obj[i].ingredients.includes("bacon")
        ? "Non Veg"
        : obj[i].ingredients.includes("Eggs") ||
          obj[i].ingredients.includes("eggs") ||
          obj[i].ingredients.includes("Egg Yolks") ||
          obj[i].ingredients.includes("free-range egg, beaten") ||
          obj[i].ingredients.includes("egg") ||
          obj[i].ingredients.includes("Egg")
        ? "Contains Egg"
        : "Veg";
    // obj[i].type = "Non Veg";
  }

  fs.writeFileSync(filename, JSON.stringify([...recipe, ...obj], null, 2));
  // fs.writeFileSync(filename, JSON.stringify([...obj], null, 2));

  res.json(data);
});

app.get("/misc", async (req, res) => {
  let response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=miscellaneous"
  );
  const data = response.data.meals;
  let obj = new Array();

  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let val = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
    );
    let el2 = val.data.meals[0];

    obj[i] = {};
    obj[i].name = el.strMeal;
    obj[i].price = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    obj[i].category = "Specials";
    obj[i].cuisine = el2.strArea;
    obj[i].trending = trending[Math.floor(Math.random() * 10)];
    obj[i].tags = el2.strTags
      ? el2.strTags.split(",").filter((el) => el !== "" && el !== " ")
      : [];
    obj[i].image = el2.strMealThumb;
    obj[i].customizable = true;
    obj[i].details =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    obj[i].ingredients = [];
    for (let j = 1; j <= 20; j++) {
      if (el2[`strIngredient${j}`])
        obj[i].ingredients.push(el2[`strIngredient${j}`]);
    }
    obj[i].type =
      obj[i].ingredients.includes("Bacon") ||
      obj[i].ingredients.includes("Chicken Stock") ||
      obj[i].ingredients.includes("Smoked Salmon") ||
      obj[i].ingredients.includes("Minced Beef") ||
      obj[i].ingredients.includes("Beef Stock") ||
      obj[i].ingredients.includes("Sardines") ||
      obj[i].ingredients.includes("Tiger Prawns") ||
      obj[i].ingredients.includes("Bround Beef") ||
      obj[i].ingredients.includes("Chicken") ||
      obj[i].ingredients.includes("Beef") ||
      obj[i].ingredients.includes("Ground Pork") ||
      obj[i].ingredients.includes("Smoked Haddock") ||
      obj[i].ingredients.includes("King Prawns") ||
      obj[i].ingredients.includes("Lamb") ||
      obj[i].ingredients.includes("Fish Stock") ||
      obj[i].ingredients.includes("Prawns") ||
      obj[i].ingredients.includes("Pork") ||
      obj[i].ingredients.includes("Sausages") ||
      obj[i].ingredients.includes("Ham") ||
      obj[i].ingredients.includes("Duck Legs") ||
      obj[i].ingredients.includes("Chicken Stock Cube") ||
      obj[i].ingredients.includes("bacon")
        ? "Non Veg"
        : obj[i].ingredients.includes("Eggs") ||
          obj[i].ingredients.includes("eggs") ||
          obj[i].ingredients.includes("Egg Yolks") ||
          obj[i].ingredients.includes("free-range egg, beaten") ||
          obj[i].ingredients.includes("egg") ||
          obj[i].ingredients.includes("Egg")
        ? "Contains Egg"
        : "Veg";
    // obj[i].type = "Non Veg";
  }

  fs.writeFileSync(filename, JSON.stringify([...recipe, ...obj], null, 2));
  // fs.writeFileSync(filename, JSON.stringify([...obj], null, 2));

  res.json(data);
});

app.get("/beef", async (req, res) => {
  let response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=beef"
  );
  const data = response.data.meals;
  let obj = new Array();

  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let val = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
    );
    let el2 = val.data.meals[0];

    obj[i] = {};
    obj[i].name = el.strMeal;
    obj[i].price = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    obj[i].category = "Specials";
    obj[i].cuisine = el2.strArea;
    obj[i].trending = trending[Math.floor(Math.random() * 10)];
    obj[i].tags = el2.strTags
      ? el2.strTags.split(",").filter((el) => el !== "" && el !== " ")
      : [];
    obj[i].image = el2.strMealThumb;
    obj[i].customizable = true;
    obj[i].details =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    obj[i].ingredients = [];
    for (let j = 1; j <= 20; j++) {
      if (el2[`strIngredient${j}`])
        obj[i].ingredients.push(el2[`strIngredient${j}`]);
    }
    obj[i].type = "Non Veg";
  }

  fs.writeFileSync(filename, JSON.stringify([...recipe, ...obj], null, 2));
  // fs.writeFileSync(filename, JSON.stringify([...obj], null, 2));

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
