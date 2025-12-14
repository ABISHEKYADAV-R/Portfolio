// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Contact form: open mail client with form data (simple fallback)
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "No name";
    const email = data.get("email") || "";
    const message = data.get("message") || "";
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailto = `mailto:abishekramesh2005@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });
}

// Footer year
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Staggered fade-in animations for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("fade-in");
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document
  .querySelectorAll(".about, .projects, .contact, .section")
  .forEach((section) => {
    observer.observe(section);
  });

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero && scrolled < 600) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - scrolled / 600;
  }
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNavigation);

// Add ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Typing effect for hero title (optional - uncomment to enable)
/*
const heroTitle = document.querySelector('.hero-content h2');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  
  setTimeout(typeWriter, 500);
}
*/
