(() => {
  "use strict";
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const header=$(".site-header"), back=$("#backTop");
  const onScroll=()=>{const y=window.scrollY;header?.classList.toggle("scrolled",y>24);back?.classList.toggle("visible",y>600)};
  addEventListener("scroll",onScroll,{passive:true});onScroll();
  back?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
  $("#currentYear")?.replaceChildren(document.createTextNode(new Date().getFullYear()));
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.1,rootMargin:"0px 0px -35px 0px"});
  $$(".reveal").forEach(el=>observer.observe(el));
  const phone=$("#telefone");
  phone?.addEventListener("input",e=>{let v=e.target.value.replace(/\D/g,"").slice(0,11);if(v.length>10)v=v.replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3");else if(v.length>6)v=v.replace(/(\d{2})(\d{4})(\d{0,4})/,"($1) $2-$3");else if(v.length>2)v=v.replace(/(\d{2})(\d{0,5})/,"($1) $2");else if(v.length)v=v.replace(/(\d{0,2})/,"($1");e.target.value=v});
  $$(".lead-form").forEach(form=>form.addEventListener("submit",e=>{
    e.preventDefault(); if(!form.checkValidity()){form.reportValidity();return}
    const d=new FormData(form), nome=String(d.get("nome")||"").trim(), tel=String(d.get("telefone")||"").trim(), interesse=String(d.get("interesse")||"uma avaliação").trim(), msg=String(d.get("mensagem")||"").trim();
    const body=[`Olá! Vim pelo site da Clínica Studio.`,`Meu nome é ${nome}.`,`Meu WhatsApp é ${tel}.`,`Tenho interesse em ${interesse}.`,msg?`Mensagem: ${msg}`:"","Gostaria de saber os próximos horários disponíveis."].filter(Boolean).join("\n");
    open("https://wa.me/5532988550005?text="+encodeURIComponent(body),"_blank","noopener,noreferrer");
  }));
})();