document.addEventListener('DOMContentLoaded', () => {
  const yearElements = document.querySelectorAll('#year');
  yearElements.forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  const cartCount = document.querySelector('#cart-count');
  const cartSummary = document.querySelector('#cart-summary');
  const cartItemsList = document.querySelector('#cart-items');
  const checkoutMessage = document.querySelector('#checkout-message');

  let cartItems = JSON.parse(localStorage.getItem('heal-thy-locs-cart') || '[]');

  const updateCart = () => {
    if (cartCount) {
      cartCount.textContent = cartItems.length;
    }

    if (cartItemsList && cartSummary) {
      cartItemsList.innerHTML = '';
      if (cartItems.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
      } else {
        cartItems.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = `${item.name} — KSh ${item.price}`;
          cartItemsList.appendChild(li);
        });
      }

      const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
      cartSummary.textContent = `Subtotal: KSh ${subtotal}`;
    }

    localStorage.setItem('heal-thy-locs-cart', JSON.stringify(cartItems));
  };

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.product;
      const price = Number(button.dataset.price || 0);
      cartItems.push({ name, price });
      updateCart();
      button.textContent = 'Added';
      button.disabled = true;
    });
  });

  document.querySelectorAll('.pay-now-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const product = button.dataset.product;
      const price = button.dataset.price;
      const amountField = document.querySelector('#payment-amount');
      if (amountField) {
        amountField.textContent = price;
      }
      if (checkoutMessage) {
        checkoutMessage.textContent = `Selected: ${product} — KSh ${price}`;
      }
      document.querySelector('#payment-amount').scrollIntoView({ behavior: 'smooth' });
    });
  });

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = contactForm.querySelector('input[name="name"]').value.trim();
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();
      const service = contactForm.querySelector('select[name="service"]').value;

      if (!name || !message) {
        alert('Please fill in your name and message.');
        return;
      }

      const whatsappMessage = `Hello Heal Thy Locs, my name is ${name}. I am interested in ${service}. Message: ${message}`;
      const encoded = encodeURIComponent(whatsappMessage);
      window.open(`https://wa.me/254700000000?text=${encoded}`, '_blank');
    });
  }

  updateCart();
});
