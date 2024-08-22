import React from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";

const CheckoutForm = ({ sessionId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
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
