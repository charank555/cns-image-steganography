function autoSpeak(text) {
  if (!text || text.trim() === "") {
    alert("No decoded message to speak");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 0.8;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

function playDecodedAudio() {
  const text = document.getElementById("output").innerText;
  autoSpeak(text);
}
