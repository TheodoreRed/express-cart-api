"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var products = [];
axios_1.default
  .get("http://localhost:3000/cart-item")
  .then(function (response) {
    // handle success
    products = response.data;
    console.log(response.data); // Axios automatically parses the JSON
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    console.log("The request has finished, whether successful or not.");
  });
