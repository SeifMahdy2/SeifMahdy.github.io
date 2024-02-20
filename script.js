const stripe = Stripe('pk_test_51OlviYBBJNuvkvoKJLj9hFOyszuDnRKQme0tYLb7IwtLrSlUyu8Kz4R1oKsrWj7uDP42VpZ1Ing6PYE1x8M2pGd400PQSaHQdB');
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    document.getElementById('payment-form').addEventListener('submit', async function(event) {
      event.preventDefault();

      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
      } else {
        // Get the donation amount from the input field
        const donationAmount = document.getElementById('amount').value;
        
        // Open user's email client with prefilled data
        const donorEmail = document.getElementById('email').value;
        sendEmail(donorEmail, donationAmount);
        alert('Thank you for your donation!');
      }
    });

    function sendEmail(email, amount) {
      const subject = encodeURIComponent('Donation Confirmation');
      const body = encodeURIComponent(`Thank you for your donation of $${amount}.`);
      const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
    }