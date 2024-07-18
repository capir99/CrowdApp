const stripe = require("stripe")(
  "sk_test_51PYebbDujtx63ft0NaH5dPimDzkieIebApoZcBUERC3burxbNAU5dZNTLkwVYOkw3mqzeodpuyDY1xSir8yVAVxX00Xhr8giFK"
);

//metodo conectar con pasarela y realizar pago
exports.doPayment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Producto Ejemplo",
            },
            unit_amount: 100, // Monto en centavos (ejemplo: $10.00)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error al crear sesión de checkout en Stripe:", error);
    res.status(500).json({ error: "Error al procesar el pago" });
  }
};
