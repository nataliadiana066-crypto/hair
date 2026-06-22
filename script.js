document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const interest = document.getElementById('interest').value;
      const message = document.getElementById('message').value.trim();

      const whatsappText = `Hello Heal Thy Locs, my name is ${name}. I am interested in ${interest}. ${message}`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=254700000000&text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappUrl, '_blank');
    });
  }
});
