const TypeWriter = function (textElement, words, wait = 3000) {
  this.textElement = textElement;
  console.log(this.textElement);
  this.words = words;
  console.log(this.words);
  this.wait = parseInt(wait, 10);
  console.log(this.wait);
  this.txt = '';
  console.log(this.txt);
  this.wordIndex = 0;
  console.log(this.wordIndex);
  this.type();
  this.isDeleting = false;
};
// Type Method
TypeWriter.prototype.type = function () {
  // console.log('hello');

  // current index of word
  const current = this.wordIndex % this.words.length;
  // console.log(current);

  // get full text of current text
  const fulltext = this.words[current];
  // console.log(fulltext);

  // check if deleting
  if (this.isDeleting) {
    // Remove a character
    this.txt = fulltext.substring(0, this.txt.length - 1);
    // Add a character
  } else {
    this.txt = fulltext.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // initial TypeSpeed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // if word is complete
  if (!this.isDeleting && this.txt === fulltext) {
    // Making it pause at the end
    typeSpeed = this.wait;
    // setting delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;

    // move to next word
    this.wordIndex++;

    // Pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);
// Init app
function init() {
  const textElement = document.querySelector('.txt-type');
  console.log(textElement);
  const words = JSON.parse(textElement.getAttribute('data-words'));
  const wait = textElement.getAttribute('data-wait');
  // Initialize TypeWriter
  new TypeWriter(textElement, words, wait);
}
