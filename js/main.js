(function () {
  'use strict';

  var sidebar = document.getElementById('sidebar');
  var menuBtn = document.getElementById('menu-btn');
  var overlay = document.getElementById('mobile-overlay');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('.section');
  var expTabs = document.querySelectorAll('.exp-tab');
  var expPanels = document.querySelectorAll('.exp-panel');
  var fadeElements = document.querySelectorAll('.fade-in');

  function toggleMenu() {
    menuBtn.classList.toggle('open');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    menuBtn.classList.remove('open');
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  expTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('data-tab');
      expTabs.forEach(function (t) { t.classList.remove('active'); });
      expPanels.forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      document.querySelector('[data-panel="' + target + '"]').classList.add('active');
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  function updateActiveNav() {
    var scrollPos = window.scrollY + window.innerHeight / 3;
    var currentSection = '';
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentSection = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
})();
