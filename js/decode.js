function decodeMessage() {
  const file = document.getElementById("imageInput").files[0];
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (!file) {
    alert("Please select an encoded image");
    return;
  }

  const img = new Image();

  img.onload = () => {
    // Set standard size
    canvas.width = 256;
    canvas.height = 256;

    // Draw image on canvas
    ctx.drawImage(img, 0, 0, 256, 256);

    // Read pixel data
    const imageData = ctx.getImageData(0, 0, 256, 256).data;

    let binary = "";

    // Extract LSB from red channel
    for (let i = 0; i < imageData.length; i += 4) {
      binary += (imageData[i] & 1);
    }

    // Convert binary to text
    const message = binaryToText(binary);

    // Display decoded message
    document.getElementById("output").innerText = message;
  };

  img.src = URL.createObjectURL(file);
}
