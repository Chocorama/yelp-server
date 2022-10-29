require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();
const morgan = require("morgan");

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
// params: { id: '1234' }
app.get("/api/v1/restaurants/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  console.log(id);
  res.status(200).json({
    status: "success",
    data: {
      restaurant: "Mcdonalds",
    },
  });
});

// create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      restaurant: "Mcdonalds",
    },
  });
});

// create restaurants
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  res.status(200).json({
    status: "success",
    data: {
      restaurant: "Mcdonalds",
    },
  });
});

app.delete("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      restaurant: "Mcdonalds",
    },
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up and listening on http://localhost${port}`);
});
