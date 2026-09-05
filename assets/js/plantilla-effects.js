// Plantilla effects: preloader fade-out, WOW.js scroll reveal init,
// scroll-to-top button. Fancybox (gallery) self-binds via data-fancybox
// attributes once its script loads, no init call needed here.
document.addEventListener("DOMContentLoaded", function () {

  // Preloader: fade out once the page has loaded
  var loader = document.getElementById("loader-wrapper");
  if (loader) {
    window.addEventListener("load", function () {
      loader.classList.add("is-hidden");
      setTimeout(function () {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 500);
    });
  }

  // WOW.js scroll reveal
  if (window.WOW) {
    new WOW({ offset: 40 }).init();
  }

  // Testimonial slider (fade + auto-advance, no external dependency)
  var slider = document.querySelector(".testimonial-slider");
  if (slider) {
    var slidesWrap = slider.querySelector(".testimonial-slides");
    var slides = Array.prototype.slice.call(slider.querySelectorAll(".testimonial-slide"));
    var dotsWrap = slider.querySelector(".slider-dots");
    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.querySelectorAll(".slider-dot")) : [];
    var current = 0;
    var timer = null;

    function setHeight() {
      slidesWrap.style.height = slides[current].offsetHeight + "px";
    }

    function goTo(index) {
      var next = (index + slides.length) % slides.length;
      if (next === current) return;
      slides[current].classList.remove("is-active");
      if (dots[current]) dots[current].classList.remove("is-active");
      current = next;
      slides[current].classList.add("is-active");
      if (dots[current]) dots[current].classList.add("is-active");
      setHeight();
    }

    function restartAutoplay() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 6000);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { goTo(i); restartAutoplay(); });
    });
    var prevBtn = slider.querySelector(".slider-arrow.prev");
    var nextBtn = slider.querySelector(".slider-arrow.next");
    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(current - 1); restartAutoplay(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(current + 1); restartAutoplay(); });
    slider.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    slider.addEventListener("mouseleave", restartAutoplay);

    setHeight();
    window.addEventListener("resize", setHeight);
    restartAutoplay();
  }

  // Scroll-to-top button
  var scrollBtn = document.querySelector(".scroll-top");
  if (scrollBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        scrollBtn.classList.add("is-visible");
      } else {
        scrollBtn.classList.remove("is-visible");
      }
    });
    scrollBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
