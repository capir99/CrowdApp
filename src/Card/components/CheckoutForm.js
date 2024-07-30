import React from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import { Button } from "react-bootstrap";

// const stripePromise = loadStripe(
//     "pk_test_51PYebbDujtx63ft0eF7xGn86AtB6MkXeQE5QSFmlTrrDA0mWJEQ3HSBOu1hudKkVrTjB3pnYFz1Wd80e7PpiMqlU00sGIgxCga"
//   );

const CheckoutForm = ({ sessionId }) => {
  console.log("Entree");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js no está cargado correctamente.");
      return;
    }

    try {
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        console.error(
          "Error al redirigir a la página de pago:",
          result.error.message
        );
      }
    } catch (error) {
      console.error("Error al redirigir a la página de pago:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button variant="primary" type="submit">
        Pagar
      </Button>
    </form>
  );
};

export default CheckoutForm;
