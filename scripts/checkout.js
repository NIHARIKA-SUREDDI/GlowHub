document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('PhoneNumber').value;  
    const address = document.getElementById('address').value.trim();
    const payment = document.getElementById('payment').value.trim();
    if (name && email && address && payment) {
      alert(`Order placed successfully!\n\nName: ${name}\nEmail: ${email}\nPhoneNumber: ${phoneNumber}\nAddress: ${address}\nPayment Method: ${payment}`);
      window.location.href = 'index.html';
    } else {
      alert('Please fill in all the fields!');
    }
  });
  
