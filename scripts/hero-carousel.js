// Hero Carousel JavaScript
class HeroCarousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 3;
    this.slides = document.querySelectorAll(".hero-slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.getElementById("prevSlide");
    this.nextBtn = document.getElementById("nextSlide");
    this.slideCounter = document.querySelector(".current-slide");
    this.progressFill = document.querySelector(".progress-fill");
    this.autoSlideInterval = null;
    this.progressInterval = null;
    this.progress = 0;

    this.init();
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    this.startAutoSlide();
    this.updateSlideCounter();
    this.startProgressAnimation();
  }

  showSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    this.slides[index].classList.add("active");
    this.dots[index].classList.add("active");

    this.currentSlide = index;
    this.updateSlideCounter();
    this.resetProgress();
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.totalSlides;
    this.showSlide(next);
  }

  prevSlide() {
    const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(prev);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  updateSlideCounter() {
    this.slideCounter.textContent = this.currentSlide + 1;
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 8000);
  }

  resetProgress() {
    this.progress = 0;
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    this.startProgressAnimation();
  }

  startProgressAnimation() {
    this.progressInterval = setInterval(() => {
      this.progress += 1;
      this.progressFill.style.transform = `rotate(${this.progress * 3.6}deg)`;

      if (this.progress >= 100) {
        clearInterval(this.progressInterval);
      }
    }, 80); // 8 seconds = 8000ms, 8000ms / 100 = 80ms
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroCarousel();
});

