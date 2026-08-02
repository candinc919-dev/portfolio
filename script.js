
const menuButton = document.querySelector(".menu-btn");
const navigation = document.querySelector("nav");
const navigationLinks = document.querySelectorAll("nav a");
const header = document.querySelector("header");
const typingElement = document.querySelector(".typing");
const contactForm = document.querySelector(".contact-form");

function setMenu(open){
  navigation.classList.toggle("active",open);
  menuButton.setAttribute("aria-expanded",String(open));
  menuButton.setAttribute("aria-label",open?"Close menu":"Open menu");
  const icon=menuButton.querySelector("i");
  icon.classList.toggle("fa-bars",!open);
  icon.classList.toggle("fa-xmark",open);
}

menuButton.addEventListener("click",()=>setMenu(!navigation.classList.contains("active")));
navigationLinks.forEach(link=>link.addEventListener("click",()=>setMenu(false)));

document.addEventListener("click",event=>{
  if(!navigation.contains(event.target)&&!menuButton.contains(event.target)) setMenu(false);
});

document.addEventListener("keydown",event=>{
  if(event.key==="Escape") setMenu(false);
});

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>40);
});

const typingTexts=[
  "Front-End Developer",
  "HTML Developer",
  "CSS Developer",
  "JavaScript Developer",
  "Responsive Web Designer"
];

let textIndex=0;
let characterIndex=0;
let deleting=false;

function typeText(){
  const current=typingTexts[textIndex];
  typingElement.textContent=deleting
    ? current.substring(0,characterIndex-1)
    : current.substring(0,characterIndex+1);

  characterIndex+=deleting?-1:1;

  if(!deleting&&characterIndex===current.length){
    deleting=true;
    setTimeout(typeText,1400);
    return;
  }

  if(deleting&&characterIndex===0){
    deleting=false;
    textIndex=(textIndex+1)%typingTexts.length;
  }

  setTimeout(typeText,deleting?55:95);
}
typeText();

const revealElements=document.querySelectorAll(
  ".section-title,.about-image,.about-content,.stat-card,.skill-card,.project-card,.contact-info,.contact-form"
);

revealElements.forEach(el=>el.classList.add("reveal"));

const observer=new IntersectionObserver((entries,revealObserver)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.15});

revealElements.forEach(el=>observer.observe(el));

const sections=document.querySelectorAll("section[id]");

function updateActiveNavigation(){
  const position=window.scrollY+180;
  sections.forEach(section=>{
    const link=document.querySelector(`nav a[href="#${section.id}"]`);
    const active=position>=section.offsetTop&&position<section.offsetTop+section.offsetHeight;
    if(link) link.classList.toggle("active",active);
  });
}
window.addEventListener("scroll",updateActiveNavigation);
window.addEventListener("load",updateActiveNavigation);

contactForm.addEventListener("submit",event=>{
  event.preventDefault();

  const name=document.querySelector("#name").value.trim();
  const email=document.querySelector("#email").value.trim();
  const message=document.querySelector("#message").value.trim();

  if(!name||!email||!message){
    showFormMessage("Please complete all fields.","error");
    return;
  }

  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    showFormMessage("Please enter a valid email address.","error");
    return;
  }

  showFormMessage("Form demo is working. Connect Formspree to receive real messages.","success");
  contactForm.reset();
});

function showFormMessage(message,type){
  contactForm.querySelector(".form-message")?.remove();
  const element=document.createElement("p");
  element.className=`form-message ${type}`;
  element.textContent=message;
  contactForm.appendChild(element);
  setTimeout(()=>element.remove(),5000);
}
