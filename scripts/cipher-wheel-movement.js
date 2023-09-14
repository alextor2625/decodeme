function moveCipher(offset) {
    document.querySelectorAll('.ciphertext span').forEach((v) => {
      const rotation = parseFloat(v.getAttribute('data-rotation'));
      const newRotation = rotation + 13.8461538462 * offset;
      const rule = `rotate(${newRotation}deg)`;
      v.style.transform = rule;
    });
  }
  let slider = document.querySelector('.slider');
  slider.addEventListener('input', function () {
    const offset = parseInt(this.value);
    document.querySelector('.text').value = offset;
    moveCipher(offset);
  });