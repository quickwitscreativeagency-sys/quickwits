const section = document.querySelector("#platinum-section");
const stage = section?.querySelector(".platinum-stage");

if (section && stage) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stage.classList.add("animate");
          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.28,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  observer.observe(section);
}
// let stars = document.querySelector('.stars');
// let moon = document.querySelector('.moon');
// let mountains_behind = document.querySelector('.mountains_behind');
// let text = document.querySelector('.text');
// let btn = document.querySelector('.btn');
// let mountains_front = document.querySelector('.mountains_front');
// let header = document.querySelector('header');

// window.addEventListener('scroll', function () {
//   let value = window.scrollY;
//   stars.style.left = value * 0.25 + 'px'
//   moon.style.top = value * 1.05 + 'px'
//   mountains_behind.style.top = value * 0.5 + 'px'
//   mountains_front.style.top = value * 0. + 'px'
//   text.style.marginRight = value * 4 + 'px'
//   text.style.marginTop = value * 1.5 + 'px'
//   btn.style.marginTop = value * 1.5 + 'px'
//   header.style.top = value * 0.5 + 'px'
// })



let stars = document.querySelector('.stars');
let moon = document.querySelector('.moon');
// let mountains_behind = document.querySelector('.mountains_behind');
let text = document.querySelector(
  window.innerWidth > 699 ? '.desktop-text' : '.mobile-text');
let mountains_front = document.querySelector('.mountains_front');
let header = document.querySelector('header');


window.addEventListener('scroll', function () {

  let value = window.scrollY;

  /* =========================================
     DESKTOP
  ========================================= */

  if (window.innerWidth > 699) {

    stars.style.left = value * 0.25 + 'px';

    moon.style.top = value * 1.05 + 'px';

    // mountains_behind.style.top = value * 0.5 + 'px';

    mountains_front.style.top = value * 0 + 'px';

    // text.style.marginRight = value * 4 + 'px';

    // text.style.marginTop = value * 1.5 + 'px';

    // header.style.top = value * 0.5 + 'px';

  }


  /* =========================================
     MOBILE
  ========================================= */

  else {
    stars.style.left = '0px';

    moon.style.top = value * 1.05 + 'px';

    // mountains_behind.style.top = value * 0.15 + 'px';

    mountains_front.style.top = '0px';

    // Moon Light starts off-screen on the right
    // and moves toward the left as you scroll
    text.style.transform = `translateX(-${value * 3}px)`;

    text.style.marginTop = value * 1.9 + 'px';


    header.style.top = '0px';
  }

});


(() => {
  const tabCorporate = document.getElementById('tab-corporate');
  const tabRetail = document.getElementById('tab-retail');
  const panelCorporate = document.getElementById('panel-corporate');
  const panelRetail = document.getElementById('panel-retail');

  if (!tabCorporate || !tabRetail || !panelCorporate || !panelRetail) return;

  function activate(target) {
    const isCorporate = target === 'corporate';
    tabCorporate.classList.toggle('is-active', isCorporate);
    tabRetail.classList.toggle('is-active', !isCorporate);
    tabCorporate.setAttribute('aria-selected', String(isCorporate));
    tabRetail.setAttribute('aria-selected', String(!isCorporate));
    panelCorporate.hidden = !isCorporate;
    panelRetail.hidden = isCorporate;
    panelCorporate.classList.toggle('is-active', isCorporate);
    panelRetail.classList.toggle('is-active', !isCorporate);

    // Refresh carousels in the now-visible panel so slide widths are measured correctly
    const shownPanel = isCorporate ? panelCorporate : panelRetail;
    // Wait a tick to allow layout after hidden->visible, then refresh carousels
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        shownPanel.querySelectorAll('[data-carousel]').forEach((el) => {
          if (el._carousel && typeof el._carousel.refresh === 'function') {
            el._carousel.refresh();
          }
        });
      });
    });
  }

  tabCorporate.addEventListener('click', () => activate('corporate'));
  tabRetail.addEventListener('click', () => activate('retail'));

  // Keyboard support for tabs
  [tabCorporate, tabRetail].forEach((tab, idx, arr) => {
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const next = e.key === 'ArrowRight' ? (idx + 1) % arr.length : (idx - 1 + arr.length) % arr.length;
        arr[next].focus();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tab.click();
      }
    });
  });
})();

(() => {
  function slidesPerView() {
    const w = window.innerWidth;
    if (w >= 1024) return 4;
    if (w >= 700) return 2;
    return 1;
  }

  function initCarousel(root) {
    const track = root.querySelector("[data-carousel-track]");
    const prev = root.querySelector("[data-carousel-prev]");
    const next = root.querySelector("[data-carousel-next]");
    if (!track) return;

    let index = 0;

    function maxIndex() {
      return Math.max(0, track.children.length - slidesPerView());
    }

    function updateButtons() {
      const max = maxIndex();
      if (prev) prev.disabled = index <= 0;
      if (next) next.disabled = index >= max;
    }

    function goTo(i) {
      index = Math.min(Math.max(i, 0), maxIndex());
      const card = track.querySelector(".card");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const step = card.getBoundingClientRect().width + gap;
      track.style.transform = `translateX(-${index * step}px)`;
      updateButtons();
    }

    prev?.addEventListener("click", () => goTo(index - 1));
    next?.addEventListener("click", () => goTo(index + 1));
    window.addEventListener("resize", () => goTo(index));

    root._carousel = { refresh: () => goTo(index) };
    goTo(0);
  }

  document.querySelectorAll("[data-carousel]").forEach(initCarousel);
})();


document.addEventListener("DOMContentLoaded", function () {

  const timeline =
    document.querySelector(".moon-qualification-timeline");

  const line =
    document.querySelector(".moon-timeline-line");

  const progress =
    document.querySelector(".moon-timeline-progress");

  const items =
    document.querySelectorAll(".moon-timeline-item");


  if (!timeline || !line || !progress || !items.length) {
    return;
  }


  /* =========================================
     SET LINE HEIGHT TO LAST DOT
  ========================================= */

  function setLineHeight() {

    const lastItem = items[items.length - 1];

    const lastDot =
      lastItem.querySelector(".moon-timeline-dot");

    if (!lastDot) return;


    /*
       Position of the last dot relative
       to the timeline.
    */

    const lineHeight =
      lastDot.offsetTop +
      (lastDot.offsetHeight / 2);


    line.style.height =
      lineHeight + "px";
  }


  /* =========================================
     SCROLL ANIMATION
  ========================================= */

  function updateQualificationTimeline() {

    const triggerPoint =
      window.innerHeight * 0.55;

    let activeIndex = -1;


    items.forEach((item, index) => {

      const dot =
        item.querySelector(".moon-timeline-dot");

      if (!dot) return;

      const dotRect =
        dot.getBoundingClientRect();


      if (dotRect.top <= triggerPoint) {
        activeIndex = index;
      }

    });


    /* Activate reached items */

    items.forEach((item, index) => {

      if (index <= activeIndex) {

        item.classList.add("active");

      } else {

        item.classList.remove("active");

      }

    });


    /* =====================================
       GLOWING LINE
    ===================================== */

    if (activeIndex >= 0) {

      const activeDot =
        items[activeIndex]
          .querySelector(".moon-timeline-dot");

      const timelineRect =
        timeline.getBoundingClientRect();

      const dotRect =
        activeDot.getBoundingClientRect();


      /*
         Position of active dot relative
         to timeline.
      */

      const position =
        dotRect.top -
        timelineRect.top +
        (dotRect.height / 2);


      /*
         Set actual pixel height rather
         than percentage.
      */

      progress.style.height =
        position + "px";


    } else {

      progress.style.height = "0px";
    }
  }


  /* =========================================
     INITIAL SETUP
  ========================================= */

  setLineHeight();
  updateQualificationTimeline();


  /* =========================================
     EVENTS
  ========================================= */

  window.addEventListener(
    "scroll",
    updateQualificationTimeline,
    { passive: true }
  );


  window.addEventListener(
    "resize",
    function () {

      setLineHeight();
      updateQualificationTimeline();

    }
  );

});
