// import React from 'react';
// import Button from "react-bootstrap/Button";
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';

// const BotonApoyo = ({ producto }) => {

//   const stripePromise = loadStripe('pk_test_51PYebbDujtx63ft0eF7xGn86AtB6MkXeQE5QSFmlTrrDA0mWJEQ3HSBOu1hudKkVrTjB3pnYFz1Wd80e7PpiMqlU00sGIgxCga');
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleApoyoClick = async () => {

//     alert("redireccionando");

//     try {
//       // Lógica para crear la sesión de checkout o la intención de pago en Stripe
//       const config = {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const response = await fetch(
//         "http://localhost:3001/api/payment/session",
//         config
//       );

//       console.log("Respuesta recibida:", response);

//       const session = await response.json();
//       if (session) {
//         console.log("entree:", session.id);
//         // Redirigir al flujo de pago de Stripe
//         const result = await stripe.redirectToCheckout({
//           sessionId: session.id,
//         });

//         if (result.error) {
//           // Manejar errores en la redirección a Stripe
//           console.error(result.error.message);
//         }
//       } else {
//         console.log("No entree:");
//       }
//     } catch (error) {
//       console.error("Error al iniciar el flujo de pago:", error);
//     }
//   };

//   return (
//     <Button variant="primary" onClick={handleApoyoClick}>
//       Apoya a {producto.name}
//     </Button>
//   );
// };
// export default BotonApoyo;

import React from "react";
import { useState } from "react";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "react-bootstrap";
import CheckoutForm from "./CheckoutForm"; 

const stripePromise = loadStripe(
  "pk_test_51PYebbDujtx63ft0eF7xGn86AtB6MkXeQE5QSFmlTrrDA0mWJEQ3HSBOu1hudKkVrTjB3pnYFz1Wd80e7PpiMqlU00sGIgxCga"
);


// Componente principal para el botón de pago
const BotonApoyo = ({ producto }) => {
  const [sessionId, setSessionId] = useState(null);

  const handleApoyoClick = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Llamada a la API para obtener la sesión de pago desde el backend
      const response = await fetch(
        "http://localhost:3001/api/payment/session",
        config
      );
      const session = await response.json();

      if (session && session.id) {
        console.log("ID de sesión recibido:", session.id);
        setSessionId(session.id); // Guarda el ID de sesión en el estado local
      } else {
        console.error("No se recibió el ID de sesión de pago.");
      }
    } catch (error) {
      console.error("Error al iniciar el flujo de pago:", error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleApoyoClick}>
        Apoyar a {producto.name}
      </Button>
      {sessionId && (
        <Elements stripe={stripePromise}>
          <CheckoutForm sessionId={sessionId} />
        </Elements>
      )}
    </div>
  );
};

export default BotonApoyo;