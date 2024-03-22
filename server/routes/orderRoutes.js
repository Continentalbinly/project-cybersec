const express = require("express");
const router = express.Router();
const {
  createOrderController,
  fetchOrderController,
  updateOrderController,
} = require("../controllers/orderController");

// CreateOrder
router.post("/createorder", createOrderController);
router.get("/fetchorder", fetchOrderController);
router.put("/updateorder/:orderId", updateOrderController);

module.exports = router;
