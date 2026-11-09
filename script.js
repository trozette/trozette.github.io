// ROZETTE - scroll interactions and entrance animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .specialties"
  );

  // Reveal elements as they enter the viewport.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: "0px 0px -45px 0px"
    });

    animatedElements.forEach((element) => observer.observe(element));
  } else {
    // Fallback for older browsers.
    animatedElements.forEach((element) => element.classList.add("is-visible"));
  }

  // Smooth-scroll for all in-page links.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        event.preventDefault();
        return;
      }

      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start"
        });
      }
    });
  });
});
