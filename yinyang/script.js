/* ============================================
   YIN & YANG PORTFOLIO — Interactions
   With ink wash painting parallax
   ============================================ */
(function () {
  "use strict";

  // ---- Custom Cursor ----
  const cursor = document.getElementById("cursor");
  let cx = 0,
    cy = 0;

  document.addEventListener("mousemove", (e) => {
    cx = e.clientX;
    cy = e.clientY;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
  });

  document.querySelectorAll("a, button, .work-item").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });

  // ---- Preloader ----
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("preloader").classList.add("done");
    }, 1400);
  });

  // ---- Scroll Reveal ----
  const reveals = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll("[data-reveal]"),
          );
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add("revealed"), idx * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  reveals.forEach((el) => observer.observe(el));

  // ---- Mobile Nav ----
  const navBurger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");

  if (navBurger && navLinks) {
    navBurger.addEventListener("click", () => {
      navBurger.classList.toggle("active");
      navLinks.classList.toggle("open");
      document.body.style.overflow = navLinks.classList.contains("open")
        ? "hidden"
        : "";
    });

    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navBurger.classList.remove("active");
        navLinks.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---- Hero Parallax (including ink elements) ----
  const hero = document.getElementById("hero");
  const heroContents = document.querySelectorAll(".hero-panel-content");
  const heroSymbol = document.getElementById("heroSymbol");
  const mountains = document.querySelectorAll(".hero-mountains");
  const bamboos = document.querySelectorAll(".hero-bamboo");
  const splatters = document.querySelectorAll(".ink-splatter");

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;
      const h = hero.offsetHeight;
      if (scrollY < h) {
        const p = scrollY / h;

        // Hero text parallax
        heroContents.forEach((c) => {
          c.style.transform = `translateY(${scrollY * 0.25}px)`;
          c.style.opacity = 1 - p * 1.8;
        });

        // Yin-yang symbol rotates on scroll
        if (heroSymbol) {
          heroSymbol.style.transform = `translate(-50%, -50%) rotate(${scrollY * 0.12}deg) scale(${1 - p * 0.3})`;
        }

        // Mountains parallax — slower, creates depth
        mountains.forEach((m) => {
          m.style.transform = `translateY(${scrollY * -0.08}px)`;
        });

        // Bamboo parallax — slightly different speed
        bamboos.forEach((b) => {
          b.style.transform = `translateY(${scrollY * -0.05}px)`;
        });

        // Ink splatters drift
        splatters.forEach((s, i) => {
          const speed = 0.03 + i * 0.02;
          s.style.transform = `translateY(${scrollY * speed}px)`;
        });
      }
    },
    { passive: true },
  );

  card.style.transform = `perspective(600px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
  // ---- Work card tilt (desktop only) ----
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  if (!mobileQuery.matches) {
    document.querySelectorAll(".work-item").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        card.style.transform = "perspective(600px) rotateY(0) rotateX(0)";
        setTimeout(() => (card.style.transition = ""), 500);
      });
    });
  }

  // ---- Mobile: scroll-activated work items ----
  function updateMobileActiveWork() {
    const items = document.querySelectorAll(".work-item");
    const centerY = window.innerHeight / 2;
    let closestItem = null;
    let closestDist = Infinity;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const dist = Math.abs(rect.top + rect.height / 2 - centerY);
        if (dist < closestDist) {
          closestDist = dist;
          closestItem = item;
        }
      }
    });

    items.forEach((item) =>
      item.classList.toggle("is-active", item === closestItem),
    );
  }

  if (mobileQuery.matches) {
    updateMobileActiveWork();
    window.addEventListener("scroll", updateMobileActiveWork, {
      passive: true,
    });
  }

  mobileQuery.addEventListener("change", (e) => {
    if (e.matches) {
      updateMobileActiveWork();
      window.addEventListener("scroll", updateMobileActiveWork, {
        passive: true,
      });
    } else {
      document
        .querySelectorAll(".work-item")
        .forEach((item) => item.classList.remove("is-active"));
    }
  });

  // ---- Magnetic buttons ----
  document.querySelectorAll(".hero-btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
})();
