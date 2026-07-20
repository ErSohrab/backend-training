const Product = require("../models/product.model");

async function getAllProducts() {
  const products = await Product.find()
    .sort({ id: 1, createdAt: 1 })
    .select("id name type -_id")
    .lean();

  return products;
}

module.exports = {
  getAllProducts,
};
