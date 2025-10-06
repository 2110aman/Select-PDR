// Mobile Menu JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Functionality
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileMenuClose = document.getElementById("mobileMenuClose");
  const mobileNav = document.querySelector(".mobile-nav");

  function openMobileMenu() {
    hamburgerMenu.classList.add("active");
    hamburgerMenu.style.opacity = "0";
    hamburgerMenu.style.pointerEvents = "none";
    mobileMenuOverlay.classList.add("active");
    mobileNav.classList.add("mobile-nav-header-open");
  }

  function closeMobileMenu() {
    hamburgerMenu.classList.remove("active");
    hamburgerMenu.style.opacity = "1";
    hamburgerMenu.style.pointerEvents = "auto";
    mobileMenuOverlay.classList.remove("active");
    mobileNav.classList.remove("mobile-nav-header-open");
  }

  hamburgerMenu.addEventListener("click", openMobileMenu);

  mobileMenuClose.addEventListener("click", closeMobileMenu);

  // Close menu when clicking on links
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close menu when clicking on buttons
  document.querySelectorAll(".mobile-menu-buttons button").forEach((button) => {
    button.addEventListener("click", closeMobileMenu);
  });

  // Close menu when clicking outside
  mobileMenuOverlay.addEventListener("click", (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMobileMenu();
    }
  });
});
