// Craftsmanship Slider Animation
document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");

  if (!sliderTrack || slides.length === 0) return;

  // Add alternating height classes to slides
  slides.forEach((slide, index) => {
    if (index % 2 === 0) {
      slide.classList.add("slide-down");
    } else {
      slide.classList.add("slide-up");
    }
  });

  // Animation variables
  let currentPosition = 0;
  const slideWidth = slides[0].offsetWidth + 20; // width + margin
  const totalSlides = slides.length / 2; // We have duplicates, so divide by 2
  const animationDuration = 20000; // 20 seconds
  const frameRate = 60; // 60 FPS
  const frameDuration = 1000 / frameRate; // ~16.67ms
  const totalFrames = animationDuration / frameDuration;
  const distancePerFrame = (slideWidth * totalSlides) / totalFrames;

  // Smooth animation function
  function animateSlider() {
    currentPosition -= distancePerFrame;

    // Reset position when we've moved through all original slides
    if (Math.abs(currentPosition) >= slideWidth * totalSlides) {
      currentPosition = 0;
    }

    sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    requestAnimationFrame(animateSlider);
  }

  // Start the animation
  requestAnimationFrame(animateSlider);

  // Pause animation on hover
  const imageSlider = document.querySelector(".image-slider");
  if (imageSlider) {
    imageSlider.addEventListener("mouseenter", function () {
      sliderTrack.style.animationPlayState = "paused";
    });

    imageSlider.addEventListener("mouseleave", function () {
      sliderTrack.style.animationPlayState = "running";
    });
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    // Recalculate dimensions on resize
    const newSlideWidth = slides[0].offsetWidth + 20;
    if (newSlideWidth !== slideWidth) {
      // Restart animation with new dimensions
      currentPosition = 0;
    }
  });
});

