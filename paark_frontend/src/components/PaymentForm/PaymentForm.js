import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import PrimaryButton from "../../components/Button/PrimaryButton/PrimaryButton";
import "./PaymentForm.scss";

const PaymentForm = ({ setMessage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "processing":
          setMessage("Votre paiement est en cours de traitement.");

          break;
        case "requires_payment_method":
          setMessage("Votre paiement n'a pas abouti, veuillez réessayer.");

          break;
        default:
          setMessage("Un probleme est survenue, veuillez réessayer.");

          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/payment-confirmed",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("Un probleme est survenue, veuillez réessayer.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <PaymentElement />
      <Form.Group className="payment-group">
        <PrimaryButton
          variant="blue-paark"
          size="large"
          disabled={isLoading ? true : false}
          text={
            isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Réserver"
            )
          }
          onClick={handleSubmit}
        />
      </Form.Group>
    </>
  );
};

export default PaymentForm;
