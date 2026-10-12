(() => {
  "use strict";

  const nav = document.querySelector(".fixed-nav");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("currentYear");
  const leadForm = document.getElementById("leadForm");

  if (year) year.textContent = new Date().getFullYear();

  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle("scrolled", y > 30);
    backToTop?.classList.toggle("visible", y > 650);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 82;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  leadForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!leadForm.checkValidity()) {
      leadForm.reportValidity();
      return;
    }

    const data = new FormData(leadForm);
    const nome = String(data.get("nome") || "").trim();
    const telefone = String(data.get("telefone") || "").trim();
    const interesse = String(data.get("interesse") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();

    const text = [
      "Olá! Vim pelo site da Clínica Studio.",
      "",
      `Meu nome é ${nome}.`,
      `Meu WhatsApp é ${telefone}.`,
      `Tenho interesse em ${interesse}.`,
      mensagem ? `Mensagem: ${mensagem}` : "",
      "",
      "Gostaria de saber os próximos horários disponíveis para avaliação."
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/5532988550005?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  });

  const tel = document.getElementById("telefone");
  tel?.addEventListener("input", (event) => {
    let v = event.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    else if (v.length) v = v.replace(/(\d{0,2})/, "($1");
    event.target.value = v;
  });
})();