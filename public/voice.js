let synth = window.speechSynthesis;
let voices = [];

function populateVoices() {
  voices = synth.getVoices();
  const select = document.getElementById("voice-select");
  voices.forEach((v,i) => select.options[i] = new Option(v.name, i));
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = populateVoices;

function speak(text) {
  const voiceIndex = document.getElementById("voice-select")?.value || 0;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voices[voiceIndex];
  synth.speak(utterance);
}

function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();
  recognition.onresult = function(event) {
    document.getElementById("input").value = event.results[0][0].transcript;
    send();
  };
}