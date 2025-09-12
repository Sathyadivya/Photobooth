const video = document.getElementById("video");
const startbtn = document.getElementById("startbtn");
const preview = document.getElementById("preview");
const countdownEl = document.getElementById("countdown");
const downloadbtn = document.getElementById("downloadbtn");

let capturedImages = [];

// Start webcam
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error("Camera access denied:", err);
  });

// Countdown function
function showCountdown(num) {
  return new Promise((resolve) => {
    countdownEl.textContent = num;
    setTimeout(() => {
      countdownEl.textContent = "";
      resolve();
    }, 1000);
  });
}

// Take 4 photos
startbtn.addEventListener("click", async () => {
  if (!video.videoWidth || !video.videoHeight) {
    alert("Video not ready yet. Please wait a moment.");
    return;
  }

  preview.innerHTML = "";
  capturedImages = [];
  downloadbtn.style.display = "none";

  for (let i = 0; i < 4; i++) {
    for (let j = 3; j > 0; j--) {
      await showCountdown(j);
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    img.style.width = "120px"; // small preview size
    img.style.marginBottom = "5px"; // spacing
    preview.appendChild(img);

    capturedImages.push(canvas);
  }

  downloadbtn.style.display = "inline-block";
  preview.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Download as classic vertical strip
downloadbtn.addEventListener("click", () => {
  if (capturedImages.length === 0) return;

  const MAX_CANVAS_HEIGHT = 2500;

  const baseStripWidth = 400;
  const basePhotoHeight = 300;
  const padding = 20;
  const spacing = 20;

  const numPhotos = capturedImages.length;

  const totalHeightUnscaled =
    numPhotos * (basePhotoHeight + padding * 2 + spacing) - spacing;

  const scaleFactor =
    totalHeightUnscaled > MAX_CANVAS_HEIGHT
      ? MAX_CANVAS_HEIGHT / totalHeightUnscaled
      : 1;

  const stripWidth = Math.round(baseStripWidth * scaleFactor);
  const photoHeight = basePhotoHeight * scaleFactor;
  const scaledPadding = padding * scaleFactor;
  const scaledSpacing = spacing * scaleFactor;

  const stripHeight =
    numPhotos * (photoHeight + scaledPadding * 2 + scaledSpacing) -
    scaledSpacing;

  const stripCanvas = document.createElement("canvas");
  stripCanvas.width = stripWidth;
  stripCanvas.height = stripHeight;

  const ctx = stripCanvas.getContext("2d");

  let yOffset = 0;

  capturedImages.forEach((canvas) => {
    // White background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, yOffset, stripWidth, photoHeight + scaledPadding * 2);

    // Draw image keeping aspect ratio, scaled to fit width minus padding
    const drawWidth = stripWidth - scaledPadding * 2;
    const scale = drawWidth / canvas.width;
    const drawHeight = canvas.height * scale;

    ctx.drawImage(
      canvas,
      scaledPadding,
      yOffset + scaledPadding,
      drawWidth,
      drawHeight
    );

    yOffset += drawHeight + scaledPadding * 2 + scaledSpacing;
  });

  // Trigger download
  const a = document.createElement("a");
  a.href = stripCanvas.toDataURL("image/png");
  a.download = "photobooth_strip.png";
  a.click();
});
