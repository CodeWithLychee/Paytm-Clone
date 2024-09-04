// let selectedVoice = null;

// export const initVoice = () => {
//   const voices = window.speechSynthesis.getVoices();

//   selectedVoice = voices.find(
//     (voice) =>
//       voice.name.includes("Google UK English Female") ||
//       voice.name.includes("Google US English Female")
//   );

//   if (!selectedVoice) {
//     window.speechSynthesis.onvoiceschanged = () => {
//       const updatedVoices = window.speechSynthesis.getVoices();
//       selectedVoice = updatedVoices.find(
//         (voice) =>
//           voice.name.includes("Google UK English Female") ||
//           voice.name.includes("Google US English Female")
//       );
//     };
//   }
// };

// export const speakText = (text, rate = 0.8) => {
//   return new Promise((resolve) => {
//     if (!selectedVoice) {
//       initVoice();
//     }

//     const utterance = new window.SpeechSynthesisUtterance(text);

//     if (selectedVoice) {
//       utterance.voice = selectedVoice;
//     }

//     utterance.rate = rate;

//     utterance.onend = () => {
//       resolve();
//     };

//     window.speechSynthesis.speak(utterance);
//   });
// };

// src/voice.js

export const speakTextWithCallback = (text, rate = 0.8, callback) => {
  if (window.responsiveVoice) {
    // Set the rate for speech
    window.responsiveVoice.speak(text, "UK English Female", {
      rate: rate,
      onend: callback, // Callback function after speech ends
    });
  } else {
    console.error("ResponsiveVoice not loaded or available");
    if (callback) callback(); // Call the callback immediately if ResponsiveVoice is not available
  }
};
