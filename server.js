require("dotenv").config();
const express = require("express");

const app = express();
const morgan = require("morgan");

app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
  });
  next();
});

// get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
  console.log("route handler ran");
  res.status(200).json({
    status: "success",
    data: {
      restaurant: ["Mcdonalds, 'Wendys"],
    },
  });
});

// get a restaurant
// params: { id: '1234' }
app.get("/api/v1/restaurants/:restaurantid", (req, res) => {
  const {
    params: { restaurantid },
  } = req;

  console.log(req);
});

// create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(Object.keys(req));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up and listening on http://localhost${port}`);
});
