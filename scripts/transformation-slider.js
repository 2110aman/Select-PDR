// Transformation Gallery Interactive Sliders
document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".before-after-wrapper");

  sliders.forEach((slider) => {
    const handle = slider.querySelector(".slider-handle");
    const afterImage = slider.querySelector(".after-image");
    const sliderButton = slider.querySelector(".slider-button");
    const container = slider.closest(".before-after-container");

    let isDragging = false;
    let startX = 0;
    let startWidth = 0;

    // Mouse events
    handle.addEventListener("mousedown", startDrag);
    sliderButton.addEventListener("mousedown", startDrag);

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);

    // Touch events for mobile
    handle.addEventListener("touchstart", startDragTouch);
    sliderButton.addEventListener("touchstart", startDragTouch);

    document.addEventListener("touchmove", dragTouch);
    document.addEventListener("touchend", stopDrag);

    function startDrag(e) {
      isDragging = true;
      startX = e.clientX;
      startWidth = parseFloat(afterImage.style.width) || 50;
      e.preventDefault();
    }

    function startDragTouch(e) {
      isDragging = true;
      startX = e.touches[0].clientX;
      startWidth = parseFloat(afterImage.style.width) || 50;
      e.preventDefault();
    }

    function drag(e) {
      if (!isDragging) return;

      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const currentX = e.clientX;
      const deltaX = currentX - startX;
      const deltaPercent = (deltaX / containerWidth) * 100;

      let newWidth = startWidth + deltaPercent;
      newWidth = Math.max(0, Math.min(100, newWidth));

      updateSlider(newWidth);
    }

    function dragTouch(e) {
      if (!isDragging) return;

      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      const deltaPercent = (deltaX / containerWidth) * 100;

      let newWidth = startWidth + deltaPercent;
      newWidth = Math.max(0, Math.min(100, newWidth));

      updateSlider(newWidth);
    }

    function stopDrag() {
      isDragging = false;
    }

    function updateSlider(width) {
      // Update slider handle position
      handle.style.left = width + "%";

      // Update before image (left half) - increases as slider goes right
      const beforeImage = slider.querySelector(".before-image");

      if (width >= 100) {
        // Slider at 100% right - left image fills container, no filter
        beforeImage.style.width = "100%";
        beforeImage.style.clipPath = "inset(0 0 0 0)";
        beforeImage.style.background = "transparent";
        beforeImage.style.left = "0%";
      } else {
        // Show left image with filter overlay
        beforeImage.style.width = width + "%";
        beforeImage.style.clipPath = "inset(0 0 0 0)";
        beforeImage.style.background = "rgba(0, 0, 0, 0.7)"; // #000000B2 equivalent
        beforeImage.style.left = "0%";
      }

      // Update after image (right half) - increases as slider goes left
      const rightWidth = Math.max(0, 100 - width);

      if (width <= 0) {
        // Slider at 0% - right image fills container
        afterImage.style.width = "100%";
        afterImage.style.clipPath = "inset(0 0 0 0)";
        afterImage.style.left = "0%";
      } else {
        // Show right image
        afterImage.style.width = rightWidth + "%";
        afterImage.style.clipPath = "inset(0 0 0 0)";
        afterImage.style.left = width + "%";
      }

      // Update ARIA value for accessibility
      handle.setAttribute("aria-valuenow", Math.round(width));
    }

    // Click to set position
    container.addEventListener("click", function (e) {
      if (
        e.target === handle ||
        e.target === sliderButton ||
        e.target.closest(".slider-button")
      ) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const clickX = e.clientX - containerRect.left;
      const clickPercent = (clickX / containerRect.width) * 100;

      updateSlider(clickPercent);
    });

    // Keyboard support
    handle.addEventListener("keydown", function (e) {
      const currentWidth = parseFloat(afterImage.style.width) || 50;
      let newWidth = currentWidth;

      switch (e.key) {
        case "ArrowLeft":
          newWidth = Math.max(0, currentWidth - 5);
          break;
        case "ArrowRight":
          newWidth = Math.min(100, currentWidth + 5);
          break;
        case "Home":
          newWidth = 0;
          break;
        case "End":
          newWidth = 100;
          break;
        default:
          return;
      }

      e.preventDefault();
      updateSlider(newWidth);
    });

    // Make slider focusable
    handle.setAttribute("tabindex", "0");
    handle.setAttribute("role", "slider");
    handle.setAttribute("aria-valuemin", "0");
    handle.setAttribute("aria-valuemax", "100");
    handle.setAttribute("aria-valuenow", "50");
    handle.setAttribute("aria-label", "Before and after image slider");

    // Initialize slider at center position (50%)
    updateSlider(50);
  });
});
