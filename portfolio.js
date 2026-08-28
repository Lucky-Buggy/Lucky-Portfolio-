
document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initProjectModal();
  initContactReveal();
  initStickyHeader();
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
      threshold: 0.15, 
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealEls.forEach((el) => observer.observe(el));
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
    modal.addEventListener(
      "click",
      /** @param {MouseEvent} e */
      (e) => {
        if (e.target === modal) closeModal(modal);
      }
    );
  });

  // Close on Escape key
  document.addEventListener(
    "keydown",
    /** @param {KeyboardEvent} e */
    (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.is-open").forEach((modal) => {
          closeModal(/** @type {HTMLElement} */ (modal));
        });
      }
    }
  );
}

/** @param {Element} modal */
function openModal(modal) {
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden"; // lock background scroll
}

/** @param {Element} modal */
function closeModal(modal) {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}


/* ===== CONTACT REVEAL FEATURE ===== */
function initContactReveal() {
  const revealBtn = document.getElementById("revealContactsBtn");
  const hiddenContacts = document.getElementById("hiddenContacts");

  if (!revealBtn || !hiddenContacts) return;

  // Check if contacts were already revealed in this session
  const contactsRevealed = sessionStorage.getItem("contactsRevealed");
  if (contactsRevealed === "true") {
    revealContacts();
  }

  revealBtn.addEventListener("click", revealContacts);

  function revealContacts() {
    hiddenContacts.classList.add("revealed");
    revealBtn.classList.add("revealed");
    revealBtn.textContent = "✓ Contact Info Revealed";
    revealBtn.disabled = true;
    
    // Store in sessionStorage so it persists during the session
    sessionStorage.setItem("contactsRevealed", "true");
  }
}


/* ===== STICKY HEADER SHADOW ===== */
function initStickyHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}
