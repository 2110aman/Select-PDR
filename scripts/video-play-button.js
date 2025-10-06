// Video Play Button Overlay
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("myVideo");

  if (!video) return;

  // Create play button overlay
  const playButton = document.createElement("div");
  playButton.className = "video-play-overlay";
  playButton.innerHTML = `
    <div class="play-button">
      <img src="playbutton.svg" alt="Play Button" />
    </div>
  `;

  // Style the play button overlay
  playButton.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: rgba(0,0,0,0.3);
    cursor: pointer;
    z-index: 10;
    transition: opacity 0.3s ease;
  `;

  // Style the play button image
  const playBtn = playButton.querySelector(".play-button");
  playBtn.style.cssText = `
    transition: transform 0.3s ease;
  `;

  // Style the play button image
  const playImg = playButton.querySelector("img");
  playImg.style.cssText = `
    width: 80px;
    height: 80px;
    
    transition: transform 0.3s ease;
  `;

  // Add hover effect
  playButton.addEventListener("mouseenter", function () {
    playImg.style.transform = "scale(1.1)";
  });

  playButton.addEventListener("mouseleave", function () {
    playImg.style.transform = "scale(1)";
  });

  // Make video container relative positioned
  const videoContainer = video.parentElement;
  videoContainer.style.position = "relative";

  // Add play button to container
  videoContainer.appendChild(playButton);

  // Click to play video
  playButton.addEventListener("click", function () {
    video.play();
  });

  // Show/hide play button based on video state
  function updatePlayButton() {
    if (video.paused) {
      playButton.style.display = "flex";
    } else {
      playButton.style.display = "none";
    }
  }

  // Update play button on video events
  video.addEventListener("play", updatePlayButton);
  video.addEventListener("pause", updatePlayButton);
  video.addEventListener("ended", updatePlayButton);

  // Initial state - show play button
  updatePlayButton();
});

