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