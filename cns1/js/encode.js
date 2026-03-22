function encodeMessage() {
  const file = document.getElementById("imgInput").files[0];
  const message = document.getElementById("msgInput").value;

  if (!file) { showToast("Select an image first", true); return; }
  if (!message.trim()) { showToast("Enter a message", true); return; }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = () => {
    canvas.width = 256;
    canvas.height = 256;
    ctx.drawImage(img, 0, 0, 256, 256);

    let imageData = ctx.getImageData(0, 0, 256, 256);
    let data = imageData.data;

    // Force grayscale
    for (let i = 0; i < data.length; i += 4) {
      let g = Math.round((data[i] + data[i+1] + data[i+2]) / 3);
      data[i] = data[i+1] = data[i+2] = g;
    }

    let binary = textToBinary(message);
    const maxBits = data.length / 4;
    if (binary.length > maxBits) {
      showToast("Message too long", true);
      return;
    }

    for (let i = 0; i < binary.length; i++) {
      data[i * 4] = (data[i * 4] & 0xFE) | parseInt(binary[i]);
    }

    ctx.putImageData(imageData, 0, 0);

    document.getElementById("prevWrap").classList.add("on");
    document.getElementById("prevLbl").style.display = "block";
    document.getElementById("dlRow").style.display = "flex";
    showToast("✓ Message hidden — save as PNG");
  };

  img.onerror = () => showToast("Could not load image", true);
  img.src = URL.createObjectURL(file);
}

function downloadImage() {
  const canvas = document.getElementById("canvas");

  // Blob-based download — works better on Android Chrome
  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "stego_encoded.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("PNG saved — send this file to decode");
  }, "image/png");
}
