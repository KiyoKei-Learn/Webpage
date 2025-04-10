// Get the hamburger icon and the nav links
const hamburgerIcon = document.getElementById('hamburger-icon');
const navLinks = document.getElementById('nav-links');

// Add click event to the hamburger icon to toggle the menu
hamburgerIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
document.addEventListener("DOMContentLoaded", () => {
    const inner = document.querySelector(".carousel-inner");
    const images = document.querySelectorAll(".carousel-img");
    const nextBtn = document.querySelector(".carousel-btn.next");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    let current = 0;
    let interval;
  
    function updateCarousel() {
      inner.style.transform = `translateX(-${current * 100}%)`;
    }
  
    function nextImage() {
      current = (current + 1) % images.length;
      updateCarousel();
    }
  
    function prevImage() {
      current = (current - 1 + images.length) % images.length;
      updateCarousel();
    }
  
    function startAutoSlide() {
      interval = setInterval(nextImage, 4000);
    }
  
    function stopAutoSlide() {
      clearInterval(interval);
    }
  
    nextBtn.addEventListener("click", () => {
      nextImage();
      stopAutoSlide();
      startAutoSlide();
    });
  
    prevBtn.addEventListener("click", () => {
      prevImage();
      stopAutoSlide();
      startAutoSlide();
    });
  
    startAutoSlide();
  });
  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger-icon");
    const navLinks = document.getElementById("nav-links");
  
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  });
    
  