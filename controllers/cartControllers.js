const Cart = require("../models/cartModel");

// Controller to add a service to the cart
const addServiceToCart = async (req, res) => {
  const { id_service, quantity, price, remarks, created_at, finished_date } =
    req.body;

  try {
    // Add service to the cart (transaction_details table)
    const result = await Cart.addServiceToCart({
      id_service,
      quantity,
      price,
      remarks,
      created_at,
      finished_date,
    });

    res
      .status(201)
      .json({ message: "Service added to cart successfully", result });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  addServiceToCart,
};
