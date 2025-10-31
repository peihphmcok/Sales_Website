import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress } = req.body;
    const order = new Order({
      userId: req.user.id,
      items,
      totalPrice,
      shippingAddress,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
