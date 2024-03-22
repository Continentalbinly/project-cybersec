const Order = require("../models/orderModel");

//createOrder
const createOrderController = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    const order = new Order({
      items,
      totalPrice,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in creating order",
      error: error.message,
    });
  }
};
//fetchOrder
const fetchOrderController = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
//updateOrder
const updateOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { customerName, items, totalPrice } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { customerName, items, totalPrice },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update order",
    });
  }
};

module.exports = {
  createOrderController,
  fetchOrderController,
  updateOrderController,
};
