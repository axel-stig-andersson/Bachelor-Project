      // This is your test publishable API key.
      const stripe = Stripe("pk_test_51KjKbEJUONbJrLV52LD0CBvUDLCT16Zy3q4Mxve1quZ21Ah7TSLVNyJkH3yU8XQurGRdNU38gfrNe69FmcPV2sLF006ebVZEhR");

      // The items the customer wants to buy
      
      let elements;
      async function initialize(userId) {
        const items = userId;
        const response = await fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });
        document
        .querySelector("#payment-form")
        .addEventListener("#submit", handleSubmit);

        const { clientSecret } = await response.json();
      
        const appearance = {
          theme: 'stripe',
        };
        elements = stripe.elements({ appearance, clientSecret });
      
        const paymentElement = elements.create("payment");
        paymentElement.mount("#payment-element");
      }
      
      async function handleSubmit(e) {
        setLoading(true);
      
        await stripe.confirmPayment({
          elements,
            redirect:'if_required',
        })

        .then(function(result) {
          if (result.error) {
            showMessage(result.error.message);
          } else {
            addSneakersToOrder();
            showReceipt();
          }
          });
        
        setLoading(false);
        checkStatus();
      }
      
      // Fetches the payment intent status after payment submission
      async function checkStatus() {
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
      
        if (!clientSecret) {
          return;
        }
      
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      
        switch (paymentIntent.status) {
          case "succeeded":
            showMessage("Payment succeeded!");
            break;
          case "processing":
            showMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            showMessage("Your payment was not successful, please try again.");
            break;
          default:
            showMessage("Something went wrong.");
            break;
        }
      }
      
      // ------- UI helpers -------
      
      function showMessage(messageText) {
        const messageContainer = document.querySelector("#payment-message");
      
        messageContainer.classList.remove("hidden2");
        messageContainer.textContent = messageText;
      
        setTimeout(function () {
          messageContainer.classList.add("hidden2");
          messageText.textContent = "";
        }, 4000);
      }
      
      // Show a spinner on payment submission
      function setLoading(isLoading) {
        if (isLoading) {
          // Disable the button and show a spinner
          document.querySelector("#submit").disabled = true;
          document.querySelector("#spinner").classList.remove("hidden2");
          document.querySelector("#button-text").classList.add("hidden2");
        }
      }