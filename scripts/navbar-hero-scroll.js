// Navbar Hero Section Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".custom-navbar");
  const heroSection = document.querySelector(".hero-section");

  if (!navbar || !heroSection) return;

  function updateNavbarPosition() {
    const heroRect = heroSection.getBoundingClientRect();
    const heroHeight = heroSection.offsetHeight;
    const scrollY = window.scrollY;

    // Calculate how much the navbar should move up based on scroll
    // When hero section is fully visible, navbar stays at top
    // When hero section scrolls up, navbar moves up with it
    const maxScroll = heroHeight;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);

    // Move navbar up as user scrolls
    // When scrollProgress = 0, navbar is at top (translateY = 0)
    // When scrollProgress = 1, navbar is moved up by its height (translateY = -100%)
    const translateY = -scrollProgress * navbar.offsetHeight;

    navbar.style.transform = `translateY(${translateY}px)`;
  }

  // Use requestAnimationFrame for smooth animation
  let ticking = false;

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbarPosition);
      ticking = true;
    }
  }

  function handleScroll() {
    requestTick();
    ticking = false;
  }

  // Update on scroll
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Update on resize
  window.addEventListener("resize", updateNavbarPosition);

  // Initial check
  updateNavbarPosition();
});
