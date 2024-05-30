const Product = require("../models/productModel");

//metodo para listar los productos
exports.getProducts = (req, res) => {
  // res.status(200).json("HOLAAAAAAA");
  Product.find()
    .then((postResult) => {
      if (postResult) {
        res.status(200).json(postResult);
      } else {
        res.status(404).json("Sin productos");
      }
    })
    .catch((err) => {
      console.log("error:", err);
    });
};

//metodo para crear un nuevo producto
exports.addProduct = (req, res) => {
  const product = new Product({
    imag: req.body.imag,
    name: req.body.name,
    title: req.body.title,
    location: req.body.location,
    invitation: req.body.invitation,
    details: req.body.details,
    helpways: req.body.helpways,
    likes: req.body.likes,
  });
  product.save().then((createdProduct) => {
    res.status(201).json("Producto creado satisfactoriamente");
  });
};

//metodo para consultar un producto por su ID
exports.getProductoById = (req, res) => {
  Product.findById(req.params.id).then((productResult) => {
    if (productResult) {
      res.status(200).json(productResult);
    } else {
      res.status(404).json("Producto no encontrado");
    }
  });
};

// //metodo para listar los productos en Stock
// exports.getProductosStock = (req, res) => {
//   const filter = { quantity: { $gt: 0 } };
//   Producto.find(filter)
//     .then((postResult) => {
//       if (postResult) {
//         res.status(200).json(postResult);
//       } else {
//         res.status(404).json("Sin productos");
//       }
//     })
//     .catch((err) => {
//       console.log("error:", err);
//     });
// };

// //metodo para eliminar un producto
// exports.removeProducto = (req, res) => {
//   const filter = { _id: req.params.id };
//   Producto.deleteOne(filter).then(() => {
//     res.status(201).json("Producto eliminado satisfactoriamente");
//   });
// };

// //metodo para consultar un producto por su codigo
// exports.getProductoByCode = (req, res) => {
//   const filter = { code: { $regex: "^" + req.params.code, $options: "i" } };

//   Producto.find(filter).then((productResult) => {
//     if (productResult) {
//       res.status(200).json(productResult);
//     } else {
//       res.status(404).json("Producto no encontrado");
//     }
//   });
// };

// //metodo para modificar un producto existente
// exports.modifyProducto = (req, res) => {
//   const filter = { _id: req.params.id };

//   Producto.findOne(filter).then((productResult) => {
//     if (productResult) {
//       productResult.code = req.body.code;
//       productResult.name = req.body.name;
//       productResult.desc = req.body.desc;
//       productResult.value = req.body.value;
//       productResult.quantity = req.body.quantity;
//       productResult.save().then(() => {
//         res.status(201).json("Producto actualizado satisfactoriamente");
//       });
//     } else {
//       res.status(404).json("Producto no encontrado");
//     }
//   });
// };
