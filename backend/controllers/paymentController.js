require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

//metodo conectar con pasarela y realizar pago
exports.doPayment = async (req, res) => {
  try {
    const { currency, productName, amount } = req.body;

    // console.log("currency  : ", currency);
    // console.log("productName  : ", productName);
    // console.log("amount  : ", amount);

    if (!currency || !productName || !amount) {
      return res.status(400).json({ error: "Faltan datos en la solicitud" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: productName,
            },
            unit_amount: amount, // Monto en centavos (ejemplo: $10.00)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "eur",
    //         product_data: {
    //           name: "Producto Ejemplo",
    //         },
    //         unit_amount: 100, // Monto en centavos (ejemplo: $10.00)
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "payment",
    //   success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${req.headers.origin}/cancel`,
    // });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error al crear sesión de checkout en Stripe:", error);
    res.status(500).json({ error: "Error al procesar el pago" });
  }
};

//metodo verificar el estado del pago
exports.verifyPayment = async (req, res) => {
  const session_id = req.params.session_id;

  // console.log("session_id :", session_id);
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      // Aquí puedes realizar acciones adicionales, como actualizar tu base de datos
      res.status(200).json({ message: "Pago exitoso", session });
    } else {
      res.status(400).json({ message: "El pago no fue exitoso" });
    }
  } catch (error) {
    console.error("Error al recuperar la sesión:", error);
    res.status(500).json({ error: "Error al verificar el pago" });
  }
};
