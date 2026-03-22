function playDecodedAudio() {
  const text = document.getElementById("output").textContent;
  if (!text.trim()) { showToast("Nothing to read", true); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-IN";
  u.rate = 0.8;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
  showToast("Reading aloud…");
}
