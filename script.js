    // Toggle navbar for mobile
    function toggleNavbar() {
        const navbarMenu = document.getElementById('navbar-menu');
        navbarMenu.classList.toggle('show');
    }
    
    // Show selected category only
    function showCategory(category) {
        document.querySelectorAll('.menu-section').forEach(section => {
        section.classList.remove('active');
        });
        document.getElementById(category).classList.add('active');
    }
    
    // Menu button active toggle
    const menuButtons = document.querySelectorAll('.category-buttons button');
    menuButtons.forEach(btn => {
        btn.addEventListener('click', () => {
        menuButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showCategory(btn.dataset.category);
        });
    });
    
    // Cart logic
    let cart = [];
    
    function addToCart(item, price) {
        const existing = cart.find(product => product.item === item);
        if (existing) {
        existing.quantity++;
        } else {
        cart.push({ item, price, quantity: 1 });
        }
        updateCart();
    }
    
    function removeOne(item) {
        const index = cart.findIndex(product => product.item === item);
        if (index !== -1) {
        cart[index].quantity--;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
        updateCart();
        }
    }
    
    function clearCart() {
        cart = [];
        updateCart();
    }
    
    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const cartCountSpan = document.querySelector('.cart-count');
        localStorage.setItem('cart', JSON.stringify(cart));
    
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.textContent = totalItems;
    
        if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        } else {
        cartItems.innerHTML = cart.map(cartItem => `
            <p>
            ${cartItem.item} x${cartItem.quantity} - ₱${(cartItem.price * cartItem.quantity).toFixed(2)}
            <button class="btn-remove" onclick="removeOne('${cartItem.item}')">❌</button>
            </p>
        `).join('');
        }
    }
    
    function checkoutCart() {
        if (cart.length === 0) {
        alert("Your cart is empty!");
        } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'checkout.html';
        }
    }
    
    function toggleCartPopup() {
        const popup = document.getElementById('cartPopup');
        popup.classList.toggle('show');
    }
    
    // Prevent popup from closing when clicking remove button
    let ignoreOutsideClick = false;
    
    // Close popup if click outside (except on remove buttons or inside popup)
    window.addEventListener('click', (e) => {
        const cartPopup = document.getElementById('cartPopup');
        const cartIcon = document.querySelector('.cart-icon');
    
        if (!ignoreOutsideClick && !cartPopup.contains(e.target) && !cartIcon.contains(e.target)) {
        cartPopup.classList.remove('show');
        }
    
        ignoreOutsideClick = false;
    });
    
    // Mark remove button clicks to prevent popup from closing
    window.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('btn-remove')) {
        ignoreOutsideClick = true;
        }
    });
    
    // Restore cart on page load
    window.addEventListener('DOMContentLoaded', () => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (savedCart.length > 0) {
        cart = savedCart;
        updateCart();
        } else {
        document.querySelector('.cart-count').textContent = 0;
        }
    
        // Default category
        showCategory('milktea');
    });
    document.getElementById('hamburger-icon').addEventListener('click', () => {
        document.getElementById('nav-links').classList.toggle('show');
      });
      const hamburger = document.getElementById('hamburger-icon');
      const navLinks = document.getElementById('navLinks');
    
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });   
