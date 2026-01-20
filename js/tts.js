function speakMessage() {
  const text = document.getElementById("output").innerText;

  if (!text || text.trim() === "") {
    alert("No decoded message to speak");
    return;
  }

  window.speechSynthesis.cancel(); // clear previous speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN"; // Indian accent (optional)
  utterance.rate = 1;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}
