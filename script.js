document.getElementById('donation-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      
      // Get email and donation amount
      const email = document.getElementById('email').value;
      const amount = document.getElementById('amount').value;
    
      // Create PayPal Order
      paypal.Buttons({
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount
              }
            }]
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
            // Payment successful, send email receipt
            sendEmailReceipt(email, amount);
            alert("Transaction completed successfully by " + details.payer.name.given_name);
          });
        }
      }).render('#paypal-buttons');
    });
    function sendEmailReceipt(email, amount) {
      fetch('https://formspree.io/f/xpzvdewk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          amount: amount
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    