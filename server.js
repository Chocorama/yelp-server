require("dotenv").config();
const express = require("express");

const app = express();
const morgan = require("morgan");

app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurant: ["Mcdonalds, 'Wendys"],
    },
  });
});

// get a restaurant
// params: { id: '1234' }
app.get("/api/v1/restaurants/:id", (req, res) => {
  const {
    params: { id },
  } = req;
});

// create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body);
});

// create restaurants
app.put("/api/v1/restaurants/:id", () => {});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up and listening on http://localhost${port}`);
});
