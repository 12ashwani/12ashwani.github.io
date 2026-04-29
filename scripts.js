(function () {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.textContent = isOpen ? "Close" : "Menu";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 760) {
          nav.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.textContent = "Menu";
        }
      });
    });
  }

  const yearEls = document.querySelectorAll(".js-year");
  const currentYear = String(new Date().getFullYear());
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (!contactForm) {
    return;
  }

  const statusEl = document.getElementById("form-status");
  const primaryEmail = contactForm.dataset.email || "kumarashwani1208@gmail.com";

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      if (statusEl) {
        statusEl.textContent = "Please fill out all fields before sending.";
      }
      return;
    }

    const emailjsConfig = window.PORTFOLIO_EMAILJS;
    if (
      window.emailjs &&
      emailjsConfig &&
      emailjsConfig.publicKey &&
      emailjsConfig.serviceId &&
      emailjsConfig.templateId
    ) {
      window.emailjs.init(emailjsConfig.publicKey);
      window.emailjs
        .send(emailjsConfig.serviceId, emailjsConfig.templateId, {
          from_name: name,
          reply_to: email,
          message: message,
        })
        .then(function () {
          if (statusEl) {
            statusEl.textContent = "Message sent successfully.";
          }
          contactForm.reset();
        })
        .catch(function () {
          if (statusEl) {
            statusEl.textContent = "EmailJS failed. Opening your mail app instead.";
          }
          fallbackToMailApp(name, email, message);
        });
      return;
    }

    fallbackToMailApp(name, email, message);
  });

  function fallbackToMailApp(name, email, message) {
    const subject = encodeURIComponent("Portfolio contact from " + name);
    const body = encodeURIComponent(
      "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
    );
    window.location.href = "mailto:" + primaryEmail + "?subject=" + subject + "&body=" + body;
    if (statusEl) {
      statusEl.textContent = "Your email app was opened with a pre-filled message.";
    }
  }
})();
