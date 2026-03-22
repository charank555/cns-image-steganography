function decodeMessage() {
  const file = document.getElementById("imgInput").files[0];
  if (!file) { showToast("Select an encoded image", true); return; }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = () => {
    canvas.width = 256;
    canvas.height = 256;
    ctx.drawImage(img, 0, 0, 256, 256);

    const data = ctx.getImageData(0, 0, 256, 256).data;
    let binary = "";
    for (let i = 0; i < data.length; i += 4) {
      binary += (data[i] & 1);
    }

    const message = binaryToText(binary);

    document.getElementById("prevWrap").classList.add("on");

    if (!message || message.trim() === "") {
      showToast("No hidden message found — make sure you're using a PNG encoded by this app", true);
      return;
    }

    document.getElementById("output").textContent = message;
    document.getElementById("outbox").classList.add("on");
    document.getElementById("audioRow").style.display = "flex";
    showToast("✓ Message decoded");
  };

  img.onerror = () => showToast("Could not load image", true);
  img.src = URL.createObjectURL(file);
}
