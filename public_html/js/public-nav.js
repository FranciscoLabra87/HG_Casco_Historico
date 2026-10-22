(function setupPublicNavigation() {
  const nav = document.querySelector("nav.primary");
  const menu = nav?.querySelector("ul");
  const container = nav?.querySelector(":scope > .container");

  if (!nav || !menu || !container || nav.querySelector(".nav-toggle")) return;

  nav.setAttribute("aria-label", nav.getAttribute("aria-label") || "Navegación principal");
  menu.id = menu.id || "primary-nav-links";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "nav-toggle";
  toggle.setAttribute("aria-controls", menu.id);
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menú principal");
  toggle.innerHTML = `
    <span class="nav-toggle-icon" aria-hidden="true"><span></span></span>
    <span class="nav-toggle-label">Menú</span>`;

  container.insertBefore(toggle, menu);
  nav.classList.add("is-enhanced");

  const mobileQuery = window.matchMedia("(max-width: 900px)");

  function setOpen(open, restoreFocus = false) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú principal" : "Abrir menú principal");
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    if (mobileQuery.matches && event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false, true);
    }
  });

  document.addEventListener("click", (event) => {
    if (mobileQuery.matches && nav.classList.contains("is-open") && !nav.contains(event.target)) {
      setOpen(false);
    }
  });

  mobileQuery.addEventListener("change", () => setOpen(false));
})();

// Botón flotante de WhatsApp (contacto directo con la agrupación).
(function setupWhatsAppButton() {
  const NUMERO = "56982414360";
  const MENSAJE = "Hola, quisiera hacer una consulta a la AG Casco Histórico.";
  if (document.querySelector(".wa-float")) return;

  const link = document.createElement("a");
  link.className = "wa-float";
  link.href = `https://wa.me/${NUMERO}?text=${encodeURIComponent(MENSAJE)}`;
  link.target = "_blank";
  link.rel = "noopener";
  link.setAttribute("aria-label", "Escríbenos por WhatsApp");
  link.innerHTML = `
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M16 3C9.1 3 3.5 8.6 3.5 15.5c0 2.5.7 4.8 1.9 6.8L3 29l6.9-2.3c1.9 1 4.1 1.6 6.1 1.6 6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3zm0 22.6c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.1 1.4 1.4-4-.3-.4c-1.1-1.7-1.6-3.6-1.6-5.6C5.7 9.8 10.3 5.2 16 5.2s10.3 4.6 10.3 10.3S21.7 25.6 16 25.6zm5.8-7.7c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-1.9-.9-3.1-1.7-4.3-3.8-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.5 3.8 6 5.3 2.2 1 3.1 1 4.2.9.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/>
    </svg>`;
  (document.body || document.documentElement).appendChild(link);
})();

// Botón "volver arriba" (aparece al bajar; apilado sobre el de WhatsApp).
(function setupBackToTop() {
  if (document.querySelector(".to-top")) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "to-top";
  btn.setAttribute("aria-label", "Volver arriba");
  btn.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M6 14l6-6 6 6"/></svg>`;
  (document.body || document.documentElement).appendChild(btn);

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  });

  let ticking = false;
  function update() {
    btn.classList.toggle("is-visible", window.scrollY > 400);
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

// Animaciones de entrada al hacer scroll (seguro: si falla, todo queda visible).
(function setupScrollReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !("IntersectionObserver" in window)) return;

  const targets = document.querySelectorAll("body > section > .container");
  if (!targets.length) return;

  const io = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-in");
        obs.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  targets.forEach((el) => { el.classList.add("reveal"); io.observe(el); });

  // Seguridad: pase lo que pase, nada queda oculto tras 3s.
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.reveal-in)").forEach((el) => el.classList.add("reveal-in"));
  }, 3000);
})();

// Fundido de entrada de página + marca de entrada del hero.
(function setupPageEntrance() {
  document.documentElement.classList.add("js-ready");
  const hero = document.querySelector(".hero");
  if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    hero.classList.add("hero-enter");
  }
})();

// Año del copyright: se rellena en el cliente para que no envejezca solo.
(function actualizarAnio() {
  const anio = String(new Date().getFullYear());
  document.querySelectorAll("[data-anio-actual]").forEach((el) => {
    el.textContent = anio;
  });
})();

// La landing no es una PWA: el service worker pertenece al sistema de socios.
// Aqui no se registra nada.
