$(function () {

  // ==== existing nav/parallax logic ====
  let nav = document.querySelector('#navbar')
  let startNav = document.querySelector('#projectspace')
  let navHeight = nav ? nav.scrollHeight : 0
  let backtoTop = document.querySelector('#backtotop')

  function moveHeader() {
    if (!startNav || !nav) return
    let transitionDist = startNav.getBoundingClientRect().top - navHeight
    transitionDist < 0 ? nav.classList.add('in-body') : nav.classList.remove('in-body')
    transitionDist < 0 ? backtoTop.classList.add('nav-top') : backtoTop.classList.remove('nav-top')
  }

  addEventListener('scroll', () => {
    requestAnimationFrame(moveHeader);
  });

  requestAnimationFrame(moveHeader);

  // ==== Project carousel logic ====
  (function () {
    function initProjCarousel(containerId, opts) {
      const container = document.getElementById(containerId);
      if (!container) return;
      const viewport = container.querySelector('.carousel-viewport');
      const track = container.querySelector('.carousel-track');
      const slides = Array.from(track.children);
      const prevBtn = container.querySelector('.carousel-button.prev, .carousel-arrow.left');
      const nextBtn = container.querySelector('.carousel-button.next, .carousel-arrow.right');
      const dotsWrap = document.querySelector('.carousel-dots');
      let currentIndex = 0;
      const slideCount = slides.length;
      const autoplayDelay = (opts && opts.delay) || 2500; // milliseconds
      let timer = null;

      // ensure each slide occupies container width (one slide visible)
      function setSlideWidths() {
        const width = viewport.clientWidth;
        slides.forEach(s => {
          s.style.minWidth = width + 'px';
          s.style.maxWidth = width + 'px';
          s.style.marginRight = '0px';
        });

        void track.offsetWidth;
      }

      // create dots
      if (dotsWrap) {
        dotsWrap.innerHTML = '';
        slides.forEach((_, i) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
          if (i === 0) btn.classList.add('active');
          btn.addEventListener('click', () => { goTo(i); resetTimer(); });
          dotsWrap.appendChild(btn);
        });
      }

      function update() {
        const slideRect = slides[0].getBoundingClientRect();
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const slideWidthIncludingGap = slideRect.width + gap;

        const x = - (slideWidthIncludingGap * currentIndex);
        track.style.transform = `translateX(${x}px)`;

        // update dots active state
        if (dotsWrap) {
          Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === currentIndex));
        }
      }

      function goTo(index) {
        currentIndex = ((index % slideCount) + slideCount) % slideCount;
        update();
      }

      function next() {
        goTo(currentIndex + 1);
      }
      function prev() {
        goTo(currentIndex - 1);
      }

      // autoplay controls
      function startTimer() {
        stopTimer();
        timer = setInterval(() => { next(); }, autoplayDelay);
      }
      function stopTimer() {
        if (timer) { clearInterval(timer); timer = null; }
      }
      function resetTimer() { stopTimer(); startTimer(); }

      // wire up buttons
      if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetTimer(); });
      if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

      // pause on hover/focus for accessibility
      container.addEventListener('mouseenter', stopTimer);
      container.addEventListener('mouseleave', startTimer);
      container.addEventListener('focusin', stopTimer);
      container.addEventListener('focusout', startTimer);

      // handle window resizing - recompute widths and translate appropriately
      window.addEventListener('resize', () => {
        setSlideWidths();
        update();
      });

      // initial setup
      // wait a frame for layout to settle
      requestAnimationFrame(() => {
        setSlideWidths();
        goTo(0);
        startTimer();
      });
    }

    // expose a global initializer (if needed elsewhere)
    window.initProjCarousel = initProjCarousel;

    // initialize automatically once DOM ready
    initProjCarousel('projCarousel', { delay: 3500 });

  })();

});
