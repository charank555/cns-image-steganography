function decodeMessage() {
  const file = document.getElementById("imageInput").files[0];
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (!file) {
    alert("Please select encoded image");
    return;
  }

  const img = new Image();
  img.onload = () => {
    canvas.width = 256;
    canvas.height = 256;
    ctx.drawImage(img, 0, 0, 256, 256);

    const imageData = ctx.getImageData(0, 0, 256, 256).data;

    let binary = "";
    for (let i = 0; i < imageData.length; i += 4) {
      binary += (imageData[i] & 1);
    }

    const message = binaryToText(binary);
    document.getElementById("output").innerText = message;
  };

  img.src = URL.createObjectURL(file);
}
