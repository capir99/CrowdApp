const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//**************END POINTS*********************************************
//Listar productos
router.get("/list", productController.getProducts);
//Crear producto
router.post("/add", productController.addProduct);
//Consultar producto por Id
router.get("/:id", productController.getProductoById);

// //Listar productos en stock
// router.get("/listStock", productController.getProductosStock);
// //Eliminar producto
// router.delete("/remove/:id", productController.removeProducto);
// //Actualizar producto
// router.post("/modify/:id", productController.modifyProducto);
// //Consultar producto por codigo
// router.get("/search/:code", productController.getProductoByCode);

module.exports = router;
