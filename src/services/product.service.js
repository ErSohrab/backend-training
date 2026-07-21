const Product = require("../models/product.model");

async function getAllProducts() {
  return Product.data.map((product) => ({
    id: product.id,
    name: product.name,
    type: product.type,
  }));
}

module.exports = {
  getAllProducts,
};
