function sendMail(){
      let parms = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
      }
      emailjs.send("service_4jqjxbu","template_nooygqv", parms).then(alert("Email Sent!"))
}