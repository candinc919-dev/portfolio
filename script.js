const menuButton=document.querySelector('.menu-btn'),navigation=document.querySelector('nav'),links=document.querySelectorAll('nav a'),header=document.querySelector('header'),typing=document.querySelector('.typing'),form=document.querySelector('.contact-form');function setMenu(open){navigation.classList.toggle('active',open);menuButton.setAttribute('aria-expanded',String(open));const i=menuButton.querySelector('i');i.classList.toggle('fa-bars',!open);i.classList.toggle('fa-xmark',open)}menuButton?.addEventListener('click',()=>setMenu(!navigation.classList.contains('active')));links.forEach(l=>l.addEventListener('click',()=>setMenu(false)));window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));const words=['Front-End Developer','HTML Developer','CSS Developer','JavaScript Developer','Responsive Web Designer'];let wi=0,ci=0,del=false;function type(){const w=words[wi];typing.textContent=del?w.slice(0,ci-1):w.slice(0,ci+1);ci+=del?-1:1;if(!del&&ci===w.length){del=true;return setTimeout(type,1300)}if(del&&ci===0){del=false;wi=(wi+1)%words.length}setTimeout(type,del?55:95)}type();const reveals=document.querySelectorAll('.section-title,.about-image,.about-content,.stat-card,.skill-card,.project-card,.contact-info,.contact-form');reveals.forEach(e=>e.classList.add('reveal'));const ro=new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}}),{threshold:.15});reveals.forEach(e=>ro.observe(e));const sections=document.querySelectorAll('section[id]');function activeNav(){const p=scrollY+180;sections.forEach(s=>{const l=document.querySelector(`nav a[href="#${s.id}"]`);if(l)l.classList.toggle('active',p>=s.offsetTop&&p<s.offsetTop+s.offsetHeight)})}addEventListener('scroll',activeNav);addEventListener('load',activeNav);form?.addEventListener('submit',e=>{e.preventDefault();const n=document.querySelector('#name').value.trim(),m=document.querySelector('#message').value.trim(),em=document.querySelector('#email').value.trim();if(!n||!m||!em)return msg('Please complete all fields.','error');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))return msg('Please enter a valid email address.','error');msg('Form demo is working. Connect Formspree to receive messages.','success');form.reset()});function msg(t,c){form.querySelector('.form-message')?.remove();const p=document.createElement('p');p.className=`form-message ${c}`;p.textContent=t;form.appendChild(p);setTimeout(()=>p.remove(),5000)}document.body.classList.add('loading');addEventListener('load',()=>setTimeout(()=>{document.querySelector('#pageLoader')?.classList.add('hidden');document.body.classList.remove('loading')},650));const prog=document.querySelector('#scrollProgress');function progress(){const h=document.documentElement.scrollHeight-innerHeight;prog.style.width=`${h>0?scrollY/h*100:0}%`}addEventListener('scroll',progress,{passive:true});progress();const fine=matchMedia('(pointer:fine)').matches;if(fine){const glow=document.querySelector('#mouseGlow'),dot=document.querySelector('#cursorDot'),ring=document.querySelector('#cursorRing');let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.left=x+'px';dot.style.top=y+'px';glow.style.left=x+'px';glow.style.top=y+'px'});(function anim(){rx+=(x-rx)*.16;ry+=(y-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(anim)})();document.querySelectorAll('a,button,input,textarea,.project-card').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('hovering'));el.addEventListener('mouseleave',()=>ring.classList.remove('hovering'))});document.querySelectorAll('.project-card').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-py*12}deg) rotateY(${px*12}deg) translateY(-9px)`});card.addEventListener('mouseleave',()=>card.style.transform='')})}const counters=document.querySelectorAll('.counter');const co=new IntersectionObserver((es,o)=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,t=+el.dataset.target,s=el.dataset.suffix||'',st=performance.now();function a(now){const p=Math.min((now-st)/1200,1),v=Math.round(t*(1-Math.pow(1-p,3)));el.textContent=v+s;if(p<1)requestAnimationFrame(a)}requestAnimationFrame(a);o.unobserve(el)}),{threshold:.6});counters.forEach(c=>co.observe(c));



/* ==================================================
   RELIABLE NAVIGATION & SMOOTH SCROLL
================================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    setMenu(false);

    const headerOffset = header?.offsetHeight || 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth'
    });

    history.replaceState(null, '', targetId);
  });
});


// Compatibility aliases used by later feature modules.
const contactForm = form;
const showFormMessage = msg;

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
form?.addEventListener("submit", (event) => {
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


/* ==================================================
   PORTFOLIO V4 — PROJECT FILTERING & MODAL
================================================== */

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.querySelector('#projectModal');
const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescription');
const modalImage = document.querySelector('#modalImage');
const modalLive = document.querySelector('#modalLive');
const modalGithub = document.querySelector('#modalGithub');
let lastFocusedElement = null;

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('project-hidden', !show);
    });
  });
});

function openProjectModal(card) {
  lastFocusedElement = document.activeElement;
  const links = card.querySelectorAll('.project-buttons a');

  modalTitle.textContent = card.dataset.title || card.querySelector('h3')?.textContent || 'Project';
  modalDescription.textContent = card.dataset.description || card.querySelector('.project-content p')?.textContent || '';
  modalImage.src = card.dataset.image || card.querySelector('img')?.src || '';
  modalImage.alt = `${modalTitle.textContent} preview`;
  modalLive.href = links[0]?.href || '#';
  modalGithub.href = links[1]?.href || '#';

  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  projectModal.querySelector('.modal-close')?.focus();
}

function closeProjectModal() {
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFocusedElement?.focus();
}

document.querySelectorAll('.project-details-btn').forEach(button => {
  button.addEventListener('click', () => openProjectModal(button.closest('.project-card')));
});

projectModal?.querySelectorAll('[data-close-modal]').forEach(element => {
  element.addEventListener('click', closeProjectModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && projectModal?.classList.contains('open')) {
    closeProjectModal();
  }
});


/* ==================================================
   PORTFOLIO V5 — BILINGUAL UI, COPY EMAIL & SHORTCUTS
================================================== */

const languageToggle = document.querySelector("#languageToggle");
const languageLabel = document.querySelector("#languageLabel");
const copyEmailButton = document.querySelector("#copyEmailButton");
const shortcutHelp = document.querySelector("#shortcutHelp");
const shortcutPanel = document.querySelector("#shortcutPanel");

const translations = {
  en: {
    mainNavigation: "Main navigation",
    navHome: "Home",
    navAbout: "About",
    navSkills: "Skills",
    navServices: "Services",
    navProcess: "Process",
    navProjects: "Projects",
    navContact: "Contact",
    availability: "Available for freelance projects",
    welcome: "Hello, I'm",
    heroText: "I create fast, responsive and user-friendly websites using HTML, CSS and JavaScript.",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    aboutEyebrow: "WHO I AM",
    aboutTitle: "About Me",
    skillsEyebrow: "WHAT I DO",
    skillsTitle: "My Skills",
    servicesEyebrow: "HOW I CAN HELP",
    servicesTitle: "Services",
    processEyebrow: "HOW I WORK",
    processTitle: "My Development Process",
    projectsEyebrow: "MY WORK",
    projectsTitle: "Featured Projects",
    aboutHeading: "Front-End Developer passionate about creating beautiful user experiences.",
    aboutText1: "I turn ideas into responsive websites with clean HTML, modern CSS and JavaScript.",
    aboutText2: "I continuously improve my skills by building projects and learning modern web technologies.",
    myProjects: "My Projects",
    statProjects: "Projects", statResponsive: "Responsive", statSemantic: "Semantic Code", statLayouts: "Modern Layouts",
    skillHtml: "Semantic and accessible markup.", skillCss: "Responsive layouts, Grid, Flexbox and animations.", skillJs: "Interactive interfaces with vanilla JavaScript.", skillGit: "Version control and GitHub workflow.", responsiveDesign: "Responsive Design", skillResponsive: "Great experiences on every screen.", uiDesign: "UI Design", skillUi: "Minimal and user-focused interfaces.",
    serviceLandingTitle: "Landing Pages", serviceLandingText: "Fast, polished and conversion-focused landing pages for products, services and campaigns.", serviceResponsiveTitle: "Responsive Websites", serviceResponsiveText: "Layouts that adapt smoothly to mobile, tablet and desktop screens without sacrificing usability.", serviceUiTitle: "UI Implementation", serviceUiText: "Turning visual designs into clean, accessible and maintainable HTML, CSS and JavaScript.",
    processUnderstandTitle: "Understand", processUnderstandText: "I clarify the goal, audience and required features before writing code.", processPlanTitle: "Plan", processPlanText: "I structure the layout, content hierarchy and responsive behavior.", processBuildTitle: "Build", processBuildText: "I develop the interface with semantic HTML, modern CSS and JavaScript.", processTestTitle: "Test", processTestText: "I check mobile responsiveness, interactions, accessibility and performance.",
    filterProjects: "Filter projects", filterAll: "All", project1Title: "Personal Portfolio", project1Text: "Modern responsive portfolio built with HTML, CSS and JavaScript.", project2Title: "Modern Landing Page", project2Text: "Premium landing page with smooth animation and responsive design.", project3Title: "Responsive Blog", project3Text: "Clean blog interface focused on readability and performance.", liveDemo: "Live Demo", projectDetails: "Project Details", project1Alt: "Personal portfolio preview", project2Alt: "Landing page preview", project3Alt: "Responsive blog preview",
    contactEyebrow: "CONTACT",
    contactTitle: "Let's Work Together",
    contactHeading: "Have a project in mind?",
    contactText: "I'm open to freelance opportunities and front-end projects.",
    sendMessage: "Send Message",
    shortcutsEyebrow: "NAVIGATION",
    shortcutsTitle: "Keyboard Shortcuts",
    shortcutTheme: "Change theme",
    shortcutLanguage: "Change language",
    shortcutHome: "Go to top",
    shortcutClose: "Close open window",
    copied: "Copied!",
    installApp: "Install",
    onlineMessage: "You are online.",
    offlineMessage: "You are offline. Cached pages remain available."
  },
  tr: {
    mainNavigation: "Ana navigasyon",
    navHome: "Ana Sayfa",
    navAbout: "Hakkımda",
    navSkills: "Yetenekler",
    navServices: "Hizmetler",
    navProcess: "Süreç",
    navProjects: "Projeler",
    navContact: "İletişim",
    availability: "Freelance projeler için müsaitim",
    welcome: "Merhaba, ben",
    heroText: "HTML, CSS ve JavaScript kullanarak hızlı, responsive ve kullanıcı dostu web siteleri geliştiriyorum.",
    viewProjects: "Projeleri Gör",
    contactMe: "İletişime Geç",
    aboutEyebrow: "BEN KİMİM",
    aboutTitle: "Hakkımda",
    skillsEyebrow: "NELER YAPIYORUM",
    skillsTitle: "Yeteneklerim",
    servicesEyebrow: "NASIL YARDIMCI OLABİLİRİM",
    servicesTitle: "Hizmetler",
    processEyebrow: "NASIL ÇALIŞIYORUM",
    processTitle: "Geliştirme Sürecim",
    projectsEyebrow: "ÇALIŞMALARIM",
    projectsTitle: "Öne Çıkan Projeler",
    aboutHeading: "Güzel kullanıcı deneyimleri oluşturmaya tutkuyla bağlı bir Front-End geliştiriciyim.",
    aboutText1: "Fikirleri temiz HTML, modern CSS ve JavaScript ile responsive web sitelerine dönüştürüyorum.",
    aboutText2: "Projeler geliştirerek ve modern web teknolojilerini öğrenerek becerilerimi sürekli geliştiriyorum.",
    myProjects: "Projelerim",
    statProjects: "Proje", statResponsive: "Responsive", statSemantic: "Semantik Kod", statLayouts: "Modern Düzenler",
    skillHtml: "Semantik ve erişilebilir işaretleme.", skillCss: "Responsive düzenler, Grid, Flexbox ve animasyonlar.", skillJs: "Vanilla JavaScript ile etkileşimli arayüzler.", skillGit: "Sürüm kontrolü ve GitHub çalışma akışı.", responsiveDesign: "Responsive Tasarım", skillResponsive: "Her ekranda güçlü kullanıcı deneyimi.", uiDesign: "Arayüz Tasarımı", skillUi: "Sade ve kullanıcı odaklı arayüzler.",
    serviceLandingTitle: "Açılış Sayfaları", serviceLandingText: "Ürünler, hizmetler ve kampanyalar için hızlı, şık ve dönüşüm odaklı açılış sayfaları.", serviceResponsiveTitle: "Responsive Web Siteleri", serviceResponsiveText: "Kullanılabilirlikten ödün vermeden mobil, tablet ve masaüstüne uyum sağlayan düzenler.", serviceUiTitle: "Arayüz Kodlama", serviceUiText: "Görsel tasarımları temiz, erişilebilir ve bakımı kolay HTML, CSS ve JavaScript koduna dönüştürme.",
    processUnderstandTitle: "Anlama", processUnderstandText: "Kod yazmadan önce hedefi, kitleyi ve gerekli özellikleri netleştiririm.", processPlanTitle: "Planlama", processPlanText: "Sayfa düzenini, içerik hiyerarşisini ve responsive davranışı planlarım.", processBuildTitle: "Geliştirme", processBuildText: "Arayüzü semantik HTML, modern CSS ve JavaScript ile geliştiririm.", processTestTitle: "Test", processTestText: "Mobil uyumluluğu, etkileşimleri, erişilebilirliği ve performansı kontrol ederim.",
    filterProjects: "Projeleri filtrele", filterAll: "Tümü", project1Title: "Kişisel Portföy", project1Text: "HTML, CSS ve JavaScript ile hazırlanmış modern ve responsive portföy sitesi.", project2Title: "Modern Açılış Sayfası", project2Text: "Akıcı animasyonlara ve responsive tasarıma sahip profesyonel açılış sayfası.", project3Title: "Responsive Blog", project3Text: "Okunabilirlik ve performans odaklı sade blog arayüzü.", liveDemo: "Canlı Demo", projectDetails: "Proje Detayları", project1Alt: "Kişisel portföy önizlemesi", project2Alt: "Açılış sayfası önizlemesi", project3Alt: "Responsive blog önizlemesi",
    contactEyebrow: "İLETİŞİM",
    contactTitle: "Birlikte Çalışalım",
    contactHeading: "Aklında bir proje mi var?",
    contactText: "Freelance fırsatlara ve front-end projelerine açığım.",
    sendMessage: "Mesaj Gönder",
    shortcutsEyebrow: "NAVİGASYON",
    shortcutsTitle: "Klavye Kısayolları",
    shortcutTheme: "Temayı değiştir",
    shortcutLanguage: "Dili değiştir",
    shortcutHome: "Sayfanın başına git",
    shortcutClose: "Açık pencereyi kapat",
    copied: "Kopyalandı!",
    installApp: "Yükle",
    onlineMessage: "Çevrimiçisin.",
    offlineMessage: "Çevrimdışısın. Önbelleğe alınan sayfalar kullanılabilir."
  }
};

function applyLanguage(language) {
  const dictionary = translations[language] || translations.en;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    if (dictionary[key]) element.setAttribute("aria-label", dictionary[key]);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    if (dictionary[key]) element.setAttribute("alt", dictionary[key]);
  });

  if (languageLabel) {
    languageLabel.textContent = language === "en" ? "TR" : "EN";
  }

  languageToggle?.setAttribute(
    "aria-label",
    language === "en" ? "Türkçeye geç" : "Switch to English"
  );

  localStorage.setItem("portfolio-language", language);
}

const savedLanguage = localStorage.getItem("portfolio-language") || "en";
applyLanguage(savedLanguage);

languageToggle?.addEventListener("click", () => {
  const nextLanguage = document.documentElement.lang === "en" ? "tr" : "en";
  applyLanguage(nextLanguage);
});

copyEmailButton?.addEventListener("click", async () => {
  const email = document.querySelector('a[href^="mailto:"]')?.textContent.trim();
  if (!email) return;

  try {
    await navigator.clipboard.writeText(email);
  } catch {
    const input = document.createElement("textarea");
    input.value = email;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }

  const icon = copyEmailButton.querySelector("i");
  icon?.classList.remove("fa-copy");
  icon?.classList.add("fa-check");
  copyEmailButton.classList.add("copied");

  const currentLanguage = document.documentElement.lang === "tr" ? "tr" : "en";
  copyEmailButton.setAttribute("title", translations[currentLanguage].copied);

  setTimeout(() => {
    icon?.classList.remove("fa-check");
    icon?.classList.add("fa-copy");
    copyEmailButton.classList.remove("copied");
  }, 1800);
});

function openShortcutPanel() {
  shortcutPanel?.classList.add("open");
  shortcutPanel?.setAttribute("aria-hidden", "false");
  shortcutPanel?.querySelector(".shortcut-close")?.focus();
}

function closeShortcutPanel() {
  shortcutPanel?.classList.remove("open");
  shortcutPanel?.setAttribute("aria-hidden", "true");
  shortcutHelp?.focus();
}

shortcutHelp?.addEventListener("click", openShortcutPanel);

shortcutPanel?.querySelectorAll("[data-close-shortcuts]").forEach((element) => {
  element.addEventListener("click", closeShortcutPanel);
});

document.addEventListener("keydown", (event) => {
  const tagName = document.activeElement?.tagName;
  const typingInField = ["INPUT", "TEXTAREA", "SELECT"].includes(tagName);
  if (typingInField) return;

  if (event.key.toLowerCase() === "t") {
    themeToggle?.click();
  }

  if (event.key.toLowerCase() === "l") {
    languageToggle?.click();
  }

  if (event.key.toLowerCase() === "h") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (event.key === "Escape" && shortcutPanel?.classList.contains("open")) {
    closeShortcutPanel();
  }

  if (event.key === "?") {
    openShortcutPanel();
  }
});


/* ==================================================
   PORTFOLIO V6 — PWA INSTALL & NETWORK STATUS
================================================== */

const installAppButton = document.querySelector("#installAppButton");
const networkToast = document.querySelector("#networkToast");
const networkToastText = document.querySelector("#networkToastText");
let deferredInstallPrompt = null;
let networkToastTimer = null;

function currentDictionary() {
  const language = document.documentElement.lang === "tr" ? "tr" : "en";
  return translations[language] || translations.en;
}

function showNetworkToast(isOnline) {
  if (!networkToast || !networkToastText) return;

  const dictionary = currentDictionary();
  networkToast.classList.remove("online", "offline");
  networkToast.classList.add(isOnline ? "online" : "offline");

  const icon = networkToast.querySelector("i");
  if (icon) {
    icon.className = isOnline
      ? "fa-solid fa-wifi"
      : "fa-solid fa-triangle-exclamation";
  }

  networkToastText.textContent = isOnline
    ? dictionary.onlineMessage
    : dictionary.offlineMessage;

  networkToast.classList.add("visible");

  clearTimeout(networkToastTimer);
  networkToastTimer = setTimeout(() => {
    networkToast.classList.remove("visible");
  }, isOnline ? 2600 : 5000);
}

window.addEventListener("online", () => showNetworkToast(true));
window.addEventListener("offline", () => showNetworkToast(false));

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;

  if (installAppButton) {
    installAppButton.hidden = false;
  }
});

installAppButton?.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;

  deferredInstallPrompt = null;
  installAppButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  if (installAppButton) installAppButton.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  });
}
