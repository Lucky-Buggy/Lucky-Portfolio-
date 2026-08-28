
document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initProjectModal();
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
}// - Close (×) button
// - Clicking the dark overlay
// - Pressing Escape
// --------------------------------------------
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

    // Close when clicking outside the modal
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Close any open modal on Escape
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
  document.body.style.overflow = "hidden";
}


function closeModal(modal) {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

function initContactReveal() {
  const revealBtn = document.getElementById("revealContactsBtn");
  const hiddenItems = document.querySelectorAll("[data-hidden-contact]");
  if (!revealBtn || !hiddenItems.length) return;

  
  const contactsRevealed = sessionStorage.getItem("contactsRevealed") === "true";
  if (contactsRevealed) {
    revealContacts();
  }

  revealBtn.addEventListener("click", () => {
    if (revealBtn.classList.contains("revealed")) return; // one-way toggle, no hiding
    revealContacts();
  });

  function revealContacts() {
    hiddenItems.forEach((item) => item.classList.add("revealed"));
    revealBtn.classList.add("revealed");
    revealBtn.setAttribute("aria-pressed", "true");
    revealBtn.querySelector(".reveal-btn-text").textContent = "Contact Info Revealed";
    sessionStorage.setItem("contactsRevealed", "true");
  }
}


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
