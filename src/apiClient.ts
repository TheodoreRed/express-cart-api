import axios from "axios";
import Product from "./models/Product";

let products: Product[] = [];

axios
  .get("http://localhost:3000/cart-item")
  .then((response) => {
    // handle success
    products = response.data;
    console.log(response.data); // Axios automatically parses the JSON
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
  .finally(() => {
    // always executed
    console.log("The request has finished, whether successful or not.");
  });
