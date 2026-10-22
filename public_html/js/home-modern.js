(function setupModernHomeMotion() {
  const body = document.querySelector("body.site-2026");
  const progress = document.querySelector(".page-progress span");
  const nav = document.querySelector("nav.primary");

  if (!body || !progress || !nav) return;

  let frame = 0;

  function updateScrollState() {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, window.scrollY / scrollable));
    progress.style.transform = `scaleX(${ratio})`;
    nav.classList.toggle("has-scrolled", window.scrollY > 24);
    frame = 0;
  }

  function requestUpdate() {
    if (!frame) frame = window.requestAnimationFrame(updateScrollState);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  updateScrollState();
})();
