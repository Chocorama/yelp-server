require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
// const morgan = require("morgan");

app.use(cors());
app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  // id = $1 we want to prevent using template strings for safety so we pass an array
  // $1 represents first item in array

  const text = {
    restaurant: "SELECT * FROM restaurants WHERE id = $1",
    review: "SELECT * FROM reviews WHERE restaurant_id = $1",
  };
  const values = [req.params.id];

  try {
    const restaurantResults = await db.query(text.restaurant, values);

    const reviewsResults = await db.query(text.review, values);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurantResults.rows[0],
        reviews: reviewsResults.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  const { name, location, price_range } = req.body;

  const text =
    "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *";
  const values = [name, location, price_range];

  try {
    const results = await db.query(text, values);

    res.status(201).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// update restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
  const { name, location, price_range } = req.body;

  const text =
    "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *";
  const values = [name, location, price_range, req.params.id];

  try {
    const results = await db.query(text, values);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  const text = "DELETE FROM restaurants WHERE id = $1";
  const values = [req.params.id];

  try {
    const result = await db.query("SELECT * FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);

    await db.query(text, values);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }

  console.log(req.params.id);
});

//add a review
app.post("/api/v1/restaurants/:id/add-review", async (req, res) => {
  const { name, review, rating } = req.body;

  const text =
    "INSERT INTO reviews (name, review, rating, restaurant_id) VALUES ($1, $2, $3, $4) returning *";
  const values = [name, review, rating, req.params.id];

  try {
    const response = await db.query(text, values);

    res.status(201).json({
      status: "success",
      data: {
        review: response.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Server is up and listening on http://localhost:${port}`);
});
