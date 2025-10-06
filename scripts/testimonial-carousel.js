// Testimonial Carousel Animation
document.addEventListener("DOMContentLoaded", function () {
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".testimonial-dots .dot");
  let currentSlide = 0;
  let autoSlideInterval;

  // Function to show specific slide
  function showSlide(slideIndex) {
    // Remove active and prev classes from all cards
    testimonialCards.forEach((card) => {
      card.classList.remove("active", "prev");
    });
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add prev class to current slide before changing
    if (testimonialCards[currentSlide]) {
      testimonialCards[currentSlide].classList.add("prev");
    }

    // Add active class to new slide
    testimonialCards[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");

    // Remove prev class after transition
    setTimeout(() => {
      testimonialCards.forEach((card) => card.classList.remove("prev"));
    }, 600); // Match transition duration

    currentSlide = slideIndex;
  }

  // Function to go to next slide
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % testimonialCards.length;
    showSlide(nextIndex);
  }

  // Function to start auto-sliding
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 10000); // 10 seconds
  }

  // Function to stop auto-sliding
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Add click event listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      stopAutoSlide();
      showSlide(index);
      startAutoSlide(); // Restart auto-sliding after manual navigation
    });
  });

  // Pause auto-sliding on hover
  const carousel = document.querySelector(".testimonial-carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
  }

  // Initialize carousel
  showSlide(0);
  startAutoSlide();

  // Handle visibility change (pause when tab is not visible)
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  // Handle window focus/blur
  window.addEventListener("focus", startAutoSlide);
  window.addEventListener("blur", stopAutoSlide);
});
