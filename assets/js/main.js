(() => {
  "use strict";

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  const header = $(".site-header");
  const backToTop = $("#backTop");
  const currentYear = $("#currentYear");
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const handleScroll = () => {
    const y = window.scrollY || 0;
    header?.classList.toggle("scrolled", y > 24);
    backToTop?.classList.toggle("visible", y > 600);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  // Motion is progressive enhancement. If JS fails, all content remains visible.
  const revealElements = $$(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    revealElements.forEach((element) => element.classList.add("reveal-init"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    requestAnimationFrame(() => revealElements.forEach((element) => observer.observe(element)));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  // Preserve layout if a legacy Wix image is temporarily unavailable.
  const markBrokenImage = (image) => {
    image.classList.add("is-broken");
    const host = image.closest(
      ".story-card,.gallery-card,.structure-tile,.clinic-photo,.content-image,.team-mosaic figure"
    );
    host?.classList.add("image-fallback");
  };

  $$("img").forEach((image) => {
    if (image.complete && image.naturalWidth === 0) markBrokenImage(image);
    else image.addEventListener("error", () => markBrokenImage(image), { once: true });
  });

  // Footer location: useful on every page without duplicating markup across 30+ routes.
  const footer = $(".site-footer");
  const footerContainer = footer?.querySelector(".container");
  const footerBottom = footer?.querySelector(".footer-bottom");

  if (footerContainer && footerBottom && !footer.querySelector(".footer-map-section")) {
    const location = document.createElement("section");
    location.className = "footer-map-section";
    location.setAttribute("aria-label", "Localização da Clínica Studio");
    location.innerHTML = `
      <div class="footer-map-grid">
        <div class="footer-map-frame">
          <iframe
            title="Mapa da Clínica Studio em Juiz de Fora"
            src="https://www.google.com/maps?q=Av.%20Rui%20Barbosa%20689%20Santa%20Terezinha%20Juiz%20de%20Fora%20MG&output=embed"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="footer-location-card">
          <span class="footer-location-kicker">Onde estamos</span>
          <h3>Clínica Studio<br>em Juiz de Fora</h3>
          <p>Atendimento em Santa Terezinha, com acesso pela Avenida Rui Barbosa.</p>
          <div class="footer-location-meta">
            <div><i class="bi bi-geo-alt"></i><span>Av. Rui Barbosa, 689 · Santa Terezinha<br>Juiz de Fora · MG · CEP 36045-410</span></div>
            <div><i class="bi bi-clock"></i><span>Segunda a sexta · 09h às 19h</span></div>
            <div><i class="bi bi-telephone"></i><span>(32) 3224-7851</span></div>
            <div><i class="bi bi-whatsapp"></i><span>(32) 98855-0005</span></div>
          </div>
          <div class="footer-map-actions">
            <a class="btn btn-light" href="https://www.google.com/maps/search/?api=1&query=Av.+Rui+Barbosa+689+Santa+Terezinha+Juiz+de+Fora+MG" target="_blank" rel="noopener">
              <i class="bi bi-map me-2"></i>Abrir no Google Maps
            </a>
            <a class="btn btn-outline-light" href="https://wa.me/5532988550005?text=Olá%2C%20vim%20pelo%20site%20da%20Clínica%20Studio." target="_blank" rel="noopener">
              <i class="bi bi-whatsapp me-2"></i>WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;
    footerContainer.insertBefore(location, footerBottom);
  }

  // WhatsApp lead forms.
  $$(".lead-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = new FormData(form);
      const nome = String(data.get("nome") || "").trim();
      const telefone = String(data.get("telefone") || "").trim();
      const interesse = String(data.get("interesse") || "uma avaliação").trim();
      const mensagem = String(data.get("mensagem") || "").trim();

      const body = [
        "Olá! Vim pelo site da Clínica Studio.",
        `Meu nome é ${nome}.`,
        `Meu WhatsApp é ${telefone}.`,
        `Tenho interesse em ${interesse}.`,
        mensagem ? `Mensagem: ${mensagem}` : "",
        "Gostaria de saber os próximos horários disponíveis."
      ].filter(Boolean).join("\n");

      window.open(
        "https://wa.me/5532988550005?text=" + encodeURIComponent(body),
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  // Phone mask without third-party dependency.
  $$('input[name="telefone"]').forEach((phone) => {
    phone.addEventListener("input", (event) => {
      let value = event.target.value.replace(/\D/g, "").slice(0, 11);
      if (value.length > 10) value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      else if (value.length > 6) value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      else if (value.length > 2) value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
      else if (value.length) value = value.replace(/(\d{0,2})/, "($1");
      event.target.value = value;
    });
  });
})();