import axios from "axios";
import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const Checkout = ({ subtotal }) => {
  function tokenHander(token) {
    console.log(token);
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const apiUrl = "http://localhost:4000/payments";
  useEffect(() => {
    axios("http://localhost:4000/checkout-payment", {
      method: "POST",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:" + error);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <StripeCheckout
        amount={subtotal * 100}
        // shippingAddress
        token={tokenHander}
        stripeKey="pk_test_51NlYS5SHJwGgeB5DuFxYapFSicuLPjMhuFq5SCyqLrieMoJHRCVAErozrZLfI3bJSoHG2cyfBR1Mm9BEdOdOcFkx006or7mnil"
        currency="INR"
      >
        <button>Pay Now</button>
      </StripeCheckout>
      {/* {alert("payment done ... Go to Home")} */}
    </div>
  );
};

export default Checkout;
