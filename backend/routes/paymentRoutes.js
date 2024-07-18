const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

//**************END POINTS*********************************************
//Checkout a la pasarela de pagos
router.get("/session", paymentController.doPayment);

module.exports = router;
