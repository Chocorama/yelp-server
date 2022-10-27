require("dotenv").config();
const express = require("express");

const app = express();

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
app.get("/api/v1/restaurants/:restaurantid", (req, res) => {
  const {
    params: { restaurantid },
  } = req;

  console.log(restaurantid);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
