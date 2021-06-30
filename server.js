const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// content-type - application/json
app.use(express.json());

// content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// home test
app.get("/", (req, res) => {
  res.json({ message: "Greeting - agusdwis" });
});

require("./app/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
