// Set your publishable key
const stripe = Stripe('pk_test_51OlviYBBJNuvkvoKJLj9hFOyszuDnRKQme0tYLb7IwtLrSlUyu8Kz4R1oKsrWj7uDP42VpZ1Ing6PYE1x8M2pGd400PQSaHQdB');

// Create an instance of elements
const elements = stripe.elements();

// Create an instance of card Element
const cardElement = elements.create('card');

// Add an instance of the card Element into the `card-element` div
cardElement.mount('#card-element');

// Handle form submission
document.getElementById('payment-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Disable the submit button to prevent multiple submissions
  this.querySelector('button').disabled = true;

  const { token, error } = await stripe.createToken(cardElement);

  if (error) {
    // Display error message to user
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = error.message;

    // Re-enable the submit button
    this.querySelector('button').disabled = false;
  } else {
    // Send the token to your server
    // Here you would typically use fetch() or XMLHttpRequest to send the token to your server
    console.log(token);
    alert('Payment successful!');
  }
});
