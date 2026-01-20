function encodeMessage() {
  const file = document.getElementById("imageInput").files[0];
  const message = document.getElementById("messageInput").value;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (!file || !message) {
    alert("Please select image and enter message");
    return;
  }

  const img = new Image();
  img.onload = () => {
    canvas.width = 256;
    canvas.height = 256;
    ctx.drawImage(img, 0, 0, 256, 256);

    let imageData = ctx.getImageData(0, 0, 256, 256);
    let data = imageData.data;

    // ✅ FORCE TRUE GRAYSCALE
    for (let i = 0; i < data.length; i += 4) {
      let gray = (data[i] + data[i+1] + data[i+2]) / 3;
      data[i] = data[i+1] = data[i+2] = gray;
    }

    let binary = textToBinary(message);

    for (let i = 0; i < binary.length; i++) {
      data[i * 4] = (data[i * 4] & 254) | parseInt(binary[i]);
    }

    ctx.putImageData(imageData, 0, 0);
    document.getElementById("output").innerText =
      "Message encoded successfully";
  };

  img.src = URL.createObjectURL(file);
}
function downloadImage() {
  const canvas = document.getElementById("canvas");
  const link = document.createElement("a");
  link.download = "encoded_image.png";
  link.href = canvas.toDataURL();
  link.click();
}
