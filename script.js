const phrases = ["I'm Website Developer", "I'm Software Developer", "I'm Programmer"];
const textElement = document.getElementById("text");

function typeWriter(text, i, cb) {
  if (i < text.length) {
    textElement.innerHTML += text.charAt(i);
    setTimeout(function() {
      typeWriter(text, i + 1, cb)
    }, 100);
  } else {
    setTimeout(cb, 250);
  }
}

function eraseText() {
  let text = textElement.innerHTML;
  return new Promise(resolve => {
    const eraseInterval = setInterval(function() {
      if (text.length > 0) {
        text = text.substring(0, text.length - 1);
        textElement.innerHTML = text;
      } else {
        clearInterval(eraseInterval);
        resolve();
      }
    }, 50);
  });
}

function startTyping() {
  let currentIndex = 0;

  function loop() {
    typeWriter(phrases[currentIndex], 0, function() {
      eraseText().then(function() {
        currentIndex = (currentIndex + 1) % phrases.length;
        loop();
      });
    });
  }

  loop();
}

startTyping();






// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollToTopBtn").style.display = "block";
  } else {
    document.getElementById("scrollToTopBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
