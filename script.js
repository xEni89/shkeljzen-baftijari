// Navbar scroll effect: add .scrolled and .shrink when user scrolls down
(function() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    const scrolled = window.scrollY > 30;
    navbar.classList.toggle('scrolled', scrolled);
    navbar.classList.toggle('shrink', scrolled);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  // initialize on load
  onScroll();
})();

// Vanilla typed animation (no external deps)
(function() {
  const el = document.getElementById('type-it');
  if (!el) return;

  const phrases = [
    'Software Developer (Mid-Level)',
    'C#/.NET & PHP Programmer',
    'Problem Solver',
    'Tech Enthusiast',
    'Lifelong Learner' 
  ];

  const typeSpeed = 70; // ms per char
  const backSpeed = 50; // ms per char when deleting
  const pauseDelay = 1400; // pause at end
  const loop = true;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function clamp(i) {
    if (i < 0) return 0;
    return i;
  }

  function tick() {
    const current = phrases[phraseIndex];

    if (prefersReduced) {
      // If user prefers reduced motion, just show the first phrase (no animation)
      el.textContent = phrases[0];
      return;
    }

    if (!deleting) {
      // typing forward
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex >= current.length) {
        if (loop) {
          deleting = true;
          setTimeout(tick, pauseDelay);
        }
      } else {
        setTimeout(tick, typeSpeed);
      }
    } else {
      // deleting
      charIndex--;
      el.textContent = current.slice(0, clamp(charIndex));
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, typeSpeed);
      } else {
        setTimeout(tick, backSpeed);
      }
    }
  }

  // kick it off
  setTimeout(tick, 300);
})();
