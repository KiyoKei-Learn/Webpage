document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSummary = document.getElementById('cartSummary');
    const orderTotal = document.getElementById('orderTotal');
    const cartDataInput = document.getElementById('cartData');
    const form = document.querySelector('form');

    if (cart.length === 0) {
        cartSummary.innerHTML = '<p>Your cart is empty.</p>';
        orderTotal.textContent = '₱0.00';
        cartDataInput.value = '';
        return;
    }

    let total = 0;
    let summaryText = '';

    cartSummary.innerHTML = cart.map(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        summaryText += `${item.item} x${item.quantity} - ₱${subtotal}\n`;
        return `<p>${item.item} x${item.quantity} - ₱${subtotal}</p>`;
    }).join('');

    orderTotal.textContent = `₱${total.toFixed(2)}`;
    cartDataInput.value = summaryText.trim();

    // Clear cart after successful submission
    if (form) {
        form.addEventListener('submit', () => {
            localStorage.removeItem('cart');
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('pickup-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
    dateInput.max = today;
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (e) {
      const confirmed = confirm("Are you sure you want to place this order?");
      if (!confirmed) {
        e.preventDefault(); // Cancel form submission
      }
    });
  });
  const form = document.getElementById('orderForm');

  // Dynamically add cart content to hidden field before submit
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent normal submit

    // Get cart summary
    const cartSummary = document.getElementById('cartSummary').innerText;
    document.getElementById('cartData').value = cartSummary;

    const formData = new FormData(form);

    fetch("https://formspree.io/f/xoveyvpk", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        window.location.href = "thankyou.html";
      } else {
        alert("There was a problem submitting your order.");
      }
    }).catch(error => {
      console.error("Error:", error);
      alert("There was an error. Please try again.");
    });
  });
