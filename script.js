(() => {
  "use strict";

  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const backToTop = document.getElementById("backToTop");

  // ---------------------------------------------------------
  // Mobile navigation
  // ---------------------------------------------------------
  const setMenu = (open) => {
    body.classList.toggle("nav-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };

  menuToggle?.addEventListener("click", () => {
    setMenu(!body.classList.contains("nav-open"));
  });

  siteNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("nav-open")) {
      setMenu(false);
      menuToggle?.focus();
    }
  });

  // ---------------------------------------------------------
  // Sticky header + back-to-top visibility
  // ---------------------------------------------------------
  const handleScrollUI = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-sticky", y > 140);
    backToTop?.classList.toggle("visible", y > 700);
  };

  window.addEventListener("scroll", handleScrollUI, { passive: true });
  handleScrollUI();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---------------------------------------------------------
  // Scroll reveal
  // ---------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }

  // ---------------------------------------------------------
  // Interactive diagnosis section
  // ---------------------------------------------------------
  const diagnosisButtons = document.querySelectorAll(".diagnosis-item");
  const diagnosisDetail = document.getElementById("diagnosisDetail");

  diagnosisButtons.forEach(button => {
    button.addEventListener("click", () => {
      diagnosisButtons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      if (diagnosisDetail) {
        diagnosisDetail.animate(
          [
            { opacity: 0, transform: "translateY(5px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 280, easing: "ease-out" }
        );
        diagnosisDetail.textContent = button.dataset.detail || "";
      }
    });
  });

  // ---------------------------------------------------------
  // FAQ accordion
  // ---------------------------------------------------------
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
    const trigger = item.querySelector(".accordion-trigger");

    trigger?.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      accordionItems.forEach(otherItem => {
        otherItem.classList.remove("open");
        otherItem.querySelector(".accordion-trigger")
          ?.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ---------------------------------------------------------
  // Smooth active navigation state
  // ---------------------------------------------------------
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach(link => {
          const active = link.getAttribute("href") === `#${visible.target.id}`;
          link.toggleAttribute("data-active", active);
        });
      },
      { threshold: [0.25, 0.5, 0.7], rootMargin: "-120px 0px -45% 0px" }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }

  // ---------------------------------------------------------
  // Front-end audit form validation / confirmation
  // Replace this handler with your actual CRM or form endpoint.
  // ---------------------------------------------------------
  const form = document.getElementById("auditForm");
  const formStatus = document.getElementById("formStatus");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const requiredFields = [...form.querySelectorAll("[required]")];
    let valid = true;

    form.querySelectorAll(".field-error").forEach(field => {
      field.classList.remove("field-error");
    });

    requiredFields.forEach(field => {
      const value = field.value.trim();
      const emailInvalid =
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!value || emailInvalid) {
        valid = false;
        field.classList.add("field-error");
      }
    });

    if (!valid) {
      formStatus.textContent = "Please complete the required name and email fields.";
      formStatus.className = "form-status error";
      form.querySelector(".field-error")?.focus();
      return;
    }

    const name = form.elements.name.value.trim().split(" ")[0] || "there";
    formStatus.textContent =
      `Thanks, ${name}. Your audit request has been captured in this demo. Connect the form to your CRM or email endpoint before launch.`;
    formStatus.className = "form-status success";

    form.reset();
  });

  // ---------------------------------------------------------
  // Small parallax effect on hero image for desktop
  // ---------------------------------------------------------
  const heroImage = document.querySelector(".hero-image");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (heroImage && !reduceMotion) {
    window.addEventListener(
      "scroll",
      () => {
        const y = Math.min(window.scrollY * 0.06, 28);
        heroImage.style.transform = `scale(1.03) translateY(${y}px)`;
      },
      { passive: true }
    );
  }
})();
