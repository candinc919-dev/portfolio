const menuButton=document.querySelector('.menu-btn'),navigation=document.querySelector('nav'),links=document.querySelectorAll('nav a'),header=document.querySelector('header'),typing=document.querySelector('.typing'),form=document.querySelector('.contact-form');function setMenu(open){navigation.classList.toggle('active',open);menuButton.setAttribute('aria-expanded',String(open));const i=menuButton.querySelector('i');i.classList.toggle('fa-bars',!open);i.classList.toggle('fa-xmark',open)}menuButton?.addEventListener('click',()=>setMenu(!navigation.classList.contains('active')));links.forEach(l=>l.addEventListener('click',()=>setMenu(false)));window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));const words=['Front-End Developer','HTML Developer','CSS Developer','JavaScript Developer','Responsive Web Designer'];let wi=0,ci=0,del=false;function type(){const w=words[wi];typing.textContent=del?w.slice(0,ci-1):w.slice(0,ci+1);ci+=del?-1:1;if(!del&&ci===w.length){del=true;return setTimeout(type,1300)}if(del&&ci===0){del=false;wi=(wi+1)%words.length}setTimeout(type,del?55:95)}type();const reveals=document.querySelectorAll('.section-title,.about-image,.about-content,.stat-card,.skill-card,.project-card,.contact-info,.contact-form');reveals.forEach(e=>e.classList.add('reveal'));const ro=new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}}),{threshold:.15});reveals.forEach(e=>ro.observe(e));const sections=document.querySelectorAll('section[id]');function activeNav(){const p=scrollY+180;sections.forEach(s=>{const l=document.querySelector(`nav a[href="#${s.id}"]`);if(l)l.classList.toggle('active',p>=s.offsetTop&&p<s.offsetTop+s.offsetHeight)})}addEventListener('scroll',activeNav);addEventListener('load',activeNav);form?.addEventListener('submit',e=>{e.preventDefault();const n=document.querySelector('#name').value.trim(),m=document.querySelector('#message').value.trim(),em=document.querySelector('#email').value.trim();if(!n||!m||!em)return msg('Please complete all fields.','error');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))return msg('Please enter a valid email address.','error');msg('Form demo is working. Connect Formspree to receive messages.','success');form.reset()});function msg(t,c){form.querySelector('.form-message')?.remove();const p=document.createElement('p');p.className=`form-message ${c}`;p.textContent=t;form.appendChild(p);setTimeout(()=>p.remove(),5000)}document.body.classList.add('loading');addEventListener('load',()=>setTimeout(()=>{document.querySelector('#pageLoader')?.classList.add('hidden');document.body.classList.remove('loading')},650));const prog=document.querySelector('#scrollProgress');function progress(){const h=document.documentElement.scrollHeight-innerHeight;prog.style.width=`${h>0?scrollY/h*100:0}%`}addEventListener('scroll',progress,{passive:true});progress();const fine=matchMedia('(pointer:fine)').matches;if(fine){const glow=document.querySelector('#mouseGlow'),dot=document.querySelector('#cursorDot'),ring=document.querySelector('#cursorRing');let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.left=x+'px';dot.style.top=y+'px';glow.style.left=x+'px';glow.style.top=y+'px'});(function anim(){rx+=(x-rx)*.16;ry+=(y-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(anim)})();document.querySelectorAll('a,button,input,textarea,.project-card').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('hovering'));el.addEventListener('mouseleave',()=>ring.classList.remove('hovering'))});document.querySelectorAll('.project-card').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-py*12}deg) rotateY(${px*12}deg) translateY(-9px)`});card.addEventListener('mouseleave',()=>card.style.transform='')})}const counters=document.querySelectorAll('.counter');const co=new IntersectionObserver((es,o)=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,t=+el.dataset.target,s=el.dataset.suffix||'',st=performance.now();function a(now){const p=Math.min((now-st)/1200,1),v=Math.round(t*(1-Math.pow(1-p,3)));el.textContent=v+s;if(p<1)requestAnimationFrame(a)}requestAnimationFrame(a);o.unobserve(el)}),{threshold:.6});counters.forEach(c=>co.observe(c));


/* ==================================================
   PORTFOLIO V3 — THEME, EMAIL & BACK TO TOP
================================================== */

const themeToggle = document.querySelector("#themeToggle");
const themeIcon = themeToggle?.querySelector("i");
const backToTop = document.querySelector("#backToTop");

function applyTheme(theme) {
  const light = theme === "light";
  document.body.classList.toggle("light-theme", light);
  themeIcon?.classList.toggle("fa-sun", light);
  themeIcon?.classList.toggle("fa-moon", !light);
  themeToggle?.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  document.documentElement.style.colorScheme = light ? "light" : "dark";
}

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
applyTheme(savedTheme || preferredTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
});

function updateBackToTop() {
  backToTop?.classList.toggle("visible", window.scrollY > 650);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Replace the demo submission with an email-client workflow.
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  const name = document.querySelector("#name")?.value.trim();
  const email = document.querySelector("#email")?.value.trim();
  const message = document.querySelector("#message")?.value.trim();

  if (!name || !email || !message) {
    showFormMessage("Please complete all fields.", "error");
    return;
  }

  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    showFormMessage("Please enter a valid email address.", "error");
    return;
  }

  const recipient = "mail@example.com";
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\\nEmail: ${email}\\n\\nMessage:\\n${message}`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

  showFormMessage("Your email application is opening.", "success");
}, true);
