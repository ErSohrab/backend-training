const { getAllProducts } = require("../services/product.service");

async function getProducts(req, res, next) {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      ok: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
};
