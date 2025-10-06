// Back to Top Functionality
document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.querySelector(".back-to-top-btn");

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

