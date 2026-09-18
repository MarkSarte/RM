/* ==========================================================
   NORTHSTAR REVENUE — Interaction layer
   ========================================================== */

(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  // Current year
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Sticky-header state + progress bar
  const header = $("#siteHeader");
  const progress = $("#scrollProgress");

  const updateScrollUI = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 12);

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      progress.style.width = `${pct}%`;
    }
  };

  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });

  // Mobile navigation
  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(willOpen));
      mobileMenu.classList.toggle("open", willOpen);
      document.body.classList.toggle("menu-open", willOpen);
    });

    $$("a", mobileMenu).forEach(link => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100) closeMenu();
    });
  }

  // Scroll-reveal
  const revealItems = $$(".reveal");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealItems.forEach(el => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach(el => revealObserver.observe(el));
  }

  // Active desktop nav state
  const navLinks = $$(".desktop-nav a");
  const sectionByHref = navLinks
    .map(link => ({
      link,
      section: document.querySelector(link.getAttribute("href"))
    }))
    .filter(item => item.section);

  if ("IntersectionObserver" in window && sectionByHref.length) {
    const navObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach(link => link.classList.remove("active"));
      const match = sectionByHref.find(item => item.section === visible.target);
      if (match) match.link.classList.add("active");
    }, { threshold: [0.15, 0.35, 0.6], rootMargin: "-22% 0px -62% 0px" });

    sectionByHref.forEach(item => navObserver.observe(item.section));
  }

  // FAQ: keep one item open at a time
  const faqItems = $$(".faq-item");
  faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach(other => {
        if (other !== item) other.removeAttribute("open");
      });
    });
  });

  // Illustrative revenue-lens calculator
  const monthlyRevenue = $("#monthlyRevenue");
  const upliftRange = $("#upliftRange");
  const upliftOutput = $("#upliftOutput");
  const annualImpact = $("#annualImpact");
  const monthlyImpact = $("#monthlyImpact");

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  const updateCalculator = () => {
    if (!monthlyRevenue || !upliftRange) return;

    const revenue = Math.max(0, Number(monthlyRevenue.value) || 0);
    const pct = Number(upliftRange.value) || 0;
    const monthlyDifference = revenue * (pct / 100);
    const annualDifference = monthlyDifference * 12;

    if (upliftOutput) upliftOutput.textContent = `${pct}%`;
    if (annualImpact) annualImpact.textContent = currency.format(annualDifference);
    if (monthlyImpact) {
      monthlyImpact.textContent = `Equivalent to ${currency.format(monthlyDifference)} per month`;
    }
  };

  if (monthlyRevenue && upliftRange) {
    monthlyRevenue.addEventListener("input", updateCalculator);
    upliftRange.addEventListener("input", updateCalculator);
    updateCalculator();
  }

  // Demo audit form validation / confirmation
  const form = $("#auditForm");
  const formStatus = $("#formStatus");

  if (form && formStatus) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      formStatus.className = "form-status";

      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailLooksValid) {
        formStatus.textContent = "Please enter your name and a valid work email.";
        formStatus.classList.add("error");
        return;
      }

      const firstName = name.split(/\s+/)[0];
      formStatus.textContent = `Thanks, ${firstName}. Your demo request is ready to connect to a CRM or form endpoint.`;
      formStatus.classList.add("success");

      // For production:
      // Replace this demo handler with fetch() to your own endpoint,
      // HubSpot form submission, Formspree, Zapier, Make, etc.
    });
  }

  // Smooth-scroll only for same-page anchors; respects reduced motion.
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start"
      });
      history.replaceState(null, "", id);
    });
  });
})();
