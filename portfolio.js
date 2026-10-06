document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initNavigation();
  initProjectModal();
  initScreenshotFallback();
  initThemeToggle();
  initResumeViewer();
});


function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      // low threshold so tall sections (like Projects) on a phone still appear
      threshold: 0.01,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealEls.forEach((el) => observer.observe(el));
}


// Mobile menu + shadow under the sticky header
function initNavigation() {
  const header = document.querySelector("header");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#nav-links");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  });

  if (!toggle || !menu) return;

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", () => {
    setMenu(!menu.classList.contains("is-open"));
  });

  // close the menu after tapping a link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // close if the screen is resized back to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) setMenu(false);
  });
}


function initProjectModal() {
  const openButtons = document.querySelectorAll("[data-modal-target]");

  openButtons.forEach((btn) => {
    const modal = document.querySelector(btn.dataset.modalTarget);
    if (!modal) return;

    btn.addEventListener("click", () => openModal(modal));

    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeModal(modal));
    }

    // Close when clicking the dark overlay (outside the modal box)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.is-open").forEach((modal) => {
        closeModal(modal);
      });
    }
  });
}

function openModal(modal) {
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden"; // lock background scroll
}

function closeModal(modal) {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

function initScreenshotFallback() {
  document.querySelectorAll(".project-shot img").forEach((img) => {
    const markMissing = () => img.parentElement.classList.add("is-missing");

    img.addEventListener("error", markMissing);

    if (img.complete && img.naturalWidth === 0) markMissing();
  });
}


// Light / dark mode. The saved choice is applied early by a small script in
// index.html <head>; this handles the button and saving the choice.
function initThemeToggle() {
  const btn = document.querySelector(".theme-toggle");
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');

  if (!btn) return;

  function update() {
    const isLight = root.getAttribute("data-theme") === "light";
    btn.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
    if (themeColor) themeColor.setAttribute("content", isLight ? "#f1f1ef" : "#111111");
  }

  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      // storage can be blocked; the theme still changes for this visit
    }
    update();
  });

  update();
}

function initResumeViewer() {
  const section = document.querySelector("#resume");
  const frame = document.querySelector(".resume-frame");
  if (!section || !frame) return;

  if (navigator.pdfViewerEnabled === true) {
    frame.src = frame.dataset.src;
  } else {
    section.classList.add("no-pdf-viewer");
  }
}
