// Select the plaintext and ciphertext containers
const plaintextContainer = document.querySelector('.plaintext');
const ciphertextContainer = document.querySelector('.ciphertext');

// Iterate through the alphabet from 'a' to 'z'
for (let index = 0; index < 26; index++) {
  const letter = String.fromCharCode(97 + index).toUpperCase(); // Convert index to character ('a' to 'z')

  // Create a span element for plaintext
  const plaintextSpan = document.createElement('span');
  plaintextSpan.className = `letter-plaintext-${index}`;
  plaintextSpan.dataset.rotation = index * 13.8461538462;
  plaintextSpan.textContent = letter;

  // Create a span element for ciphertext
  const ciphertextSpan = document.createElement('span');
  ciphertextSpan.className = `letter-ciphertext-${index}`;
  ciphertextSpan.dataset.rotation = index * 13.8461538462;
  ciphertextSpan.textContent = letter;

  // Append the spans to their respective containers
  plaintextContainer.appendChild(plaintextSpan);
  ciphertextContainer.appendChild(ciphertextSpan);
}
