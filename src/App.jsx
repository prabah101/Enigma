import React, { useState } from 'react'
import './App.css'

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const rotor1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"; // Rotor 1 configuration
const rotorOffset = 3; // Rotor starting position
const reflector = "YRUHQSLDPXNGOKMIEBFZCWVJAT"; // Reflector configuration

function encodeMessage(message) {
  // Convert message to uppercase and remove any non-alphabetic characters
  message = message.toUpperCase().replace(/[^A-Z]/g, "");
  
  let encodedMessage = "";
  let rotorIndex = rotorOffset;
  
  for (let i = 0; i < message.length; i++) {
    const letterIndex = alphabet.indexOf(message[i]);
    const encodedLetterIndex = alphabet.indexOf(rotor1[(letterIndex + rotorIndex) % 26]);
    const reflectedIndex = alphabet.indexOf(reflector[encodedLetterIndex]);
    const decodedLetterIndex = alphabet.indexOf(rotor1[(reflectedIndex - rotorIndex + 26) % 26]);
    const encodedLetter = alphabet[decodedLetterIndex];
    encodedMessage += encodedLetter;
    rotorIndex = (rotorIndex + 1) % 26;
  }
  
  return encodedMessage;
}

function App() {
  const [message, setMessage] = useState("");
  const [encodedMessage, setEncodedMessage] = useState("");
  
  function handleInputChange(event) {
    setMessage(event.target.value);
  }
  
  function handleEncodeButtonClick() {
    setEncodedMessage(encodeMessage(message));
  }
  
  return (
    <div>
      <input type="text" value={message} onChange={handleInputChange} />
      <button onClick={handleEncodeButtonClick}>Encode</button>
      <p>{encodedMessage}</p>
    </div>
  );
}

export default App;
