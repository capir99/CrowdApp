const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//**************END POINTS*********************************************
//Listar productos
router.get("/list", productController.getProducts);
//Crear producto
router.post("/add", productController.addProduct);
//Actualizar likes
router.post("/modifyLikes/:id", productController.modifyLikes);
//Consultar producto por parte de su nombre
router.get("/search/:searchText", productController.getProductoByWord);
//Consultar producto por categoria
router.get(
  "/searchCategory/:category",
  productController.getProductoByCategory
);
//Actualizar producto
router.post("/modify/:id", productController.modifyProducto);
//Eliminar producto
router.delete("/remove/:id", productController.removeProducto);
//Consultar producto por Id
router.get("/:id", productController.getProductoById);


// //Listar productos en stock
// router.get("/listStock", productController.getProductosStock);


// //Consultar producto por codigo
// router.get("/search/:code", productController.getProductoByCode);

module.exports = router;
