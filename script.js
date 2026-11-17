/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  const menu = document.getElementById("myNavMenu");
  menu.classList.toggle("responsive");
}

/* Close the mobile menu after a link is tapped */
document.querySelectorAll("#myNavMenu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("myNavMenu").classList.remove("responsive");
  });
});

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
function headerShadow() {
  const navHeader = document.getElementById("header");
  if (!navHeader) return;

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}
window.addEventListener("scroll", headerShadow);

/* ----- TYPING EFFECT (home page only) ----- */
if (window.Typed && document.querySelector(".typedText")) {
  new Typed(".typedText", {
    strings: ["Web Designer", "Developer"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
  });
}

/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
if (window.ScrollReveal) {
  const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
  });

  /* -- HOME -- */
  sr.reveal(".featured-text-card", {});
  sr.reveal(".featured-name", { delay: 100 });
  sr.reveal(".featured-text-info", { delay: 200 });
  sr.reveal(".featured-text-btn", { delay: 200 });
  sr.reveal(".social_icons", { delay: 200 });
  sr.reveal(".featured-image", { delay: 300 });

  /* -- PROJECT BOX / DETAILS PAGE CARDS -- */
  sr.reveal(".project-box", { interval: 200 });
  sr.reveal(".stat-card", { interval: 150 });
  sr.reveal(".project-card", { interval: 150 });
  sr.reveal(".timeline-item", { interval: 150 });

  /* -- HEADINGS -- */
  sr.reveal(".top-header", {});

  /* -- ABOUT INFO & CONTACT INFO -- */
  const srLeft = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
  });
  srLeft.reveal(".about-info", { delay: 100 });
  srLeft.reveal(".contact-info", { delay: 100 });

  /* -- ABOUT SKILLS & FORM BOX -- */
  const srRight = ScrollReveal({
    origin: "right",
    distance: "80px",
    duration: 2000,
    reset: true,
  });
  srRight.reveal(".skills-box", { delay: 100 });
  srRight.reveal(".form-control", { delay: 100 });
}

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");
    const link = document.querySelector('.nav-menu a[href="#' + sectionId + '"]');
    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/* ----- CONTACT FORM (Netlify Forms) ----- */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const status = document.getElementById("formStatus");
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitBtn.disabled = true;
    status.className = "form-status";
    status.textContent = "Sending…";

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(contactForm)).toString(),
      });
      if (!response.ok) throw new Error("Request failed: " + response.status);

      contactForm.reset();
      status.classList.add("success");
      status.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
    } catch (error) {
      status.classList.add("error");
      status.textContent =
        "Sorry, something went wrong. Please try again or email me directly at vkch849@gmail.com.";
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* ----- ANIMATED COUNTERS (details page) ----- */
const counters = document.querySelectorAll("[data-count]");

if (counters.length) {
  const animate = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * progress).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => observer.observe(el));
}
