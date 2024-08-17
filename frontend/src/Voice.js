let selectedVoice = null;

export const initVoice = () => {
  const voices = window.speechSynthesis.getVoices();

  selectedVoice =
    voices.find(
      (voice) =>
        voice.name.includes("Google UK English Female") ||
        voice.name.includes("Google US English Female")
    ) || voices[0];
};

export const speakText = async (text) => {
  if (!selectedVoice) {
    initVoice();
  }

  const utterance = new window.SpeechSynthesisUtterance(text);

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  window.speechSynthesis.speak(utterance);
};
