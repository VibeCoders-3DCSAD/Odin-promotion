(function () {
  'use strict';

  /* ── Scroll-based nav glass ── */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = window.scrollY;
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Mobile nav toggle ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('nav__links--open');
    navToggle.classList.toggle('nav__toggle--active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /* ── Nav link smooth scroll & close mobile menu ── */
  document.querySelectorAll('[data-section]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const sectionId = btn.getAttribute('data-section');
      const section = document.getElementById(sectionId);
      if (section) {
        e.preventDefault();
        section.scrollIntoView({ behavior: 'smooth' });
      }
      navLinks.classList.remove('nav__links--open');
      navToggle.classList.remove('nav__toggle--active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Scroll animations (Intersection Observer) ── */
  const animEls = document.querySelectorAll('.animate');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    animEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animEls.forEach(function (el) {
      el.classList.add('animate--visible');
    });
  }
})();
