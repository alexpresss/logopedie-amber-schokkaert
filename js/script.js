// Smooth scroll
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  //Automatisch jaartal invullen
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = toggleBtn.querySelector("i");

  // Donkermodus - voorkeur opslaan
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedPreference = localStorage.getItem("dark-mode");

  if (savedPreference === "true" || (savedPreference === null && prefersDark)) {
    document.body.classList.add("dark-mode");
    icon.className = "ph-sun";
  } else {
    icon.className = "ph-moon";
  }

  toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    icon.className = isDark ? "ph-sun" : "ph-moon";
    localStorage.setItem("dark-mode", isDark);
  });

  // ===== Contactformulier functionaliteit =====
  const form = document.querySelector("contact-form");
  if (form) {
    const status = document.createElement("div");
    status.classList.add("form-status");
    form.appendChild(status);

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      status.textContent = "";
      status.style.color = "";

      // Velden ophalen
      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      const message = form.querySelector('textarea[name="message"]');

      // Validatie
      if (!name.value.trim()) {
        showStatus("Gelieve je naam in te vullen.", "error");
        return;
      }

      if (!validateEmail(email.value)) {
        showStatus("Gelieve een geldig e-mailadres in te vullen.", "error");
        return;
      }

      if (!message.value.trim()) {
        showStatus("Gelieve een bericht in te vullen.", "error");
        return;
      }

      // Verzenden
      showStatus("Verzenden...", "info");

      try {
        const data = new FormData(form);
        const response = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          form.reset();
          showStatus("Bedankt! Je bericht werd succesvol verzonden. 🎉", "success");
        } else {
          showStatus("Er ging iets mis. Probeer opnieuw of stuur een mail.", "error");
        }
      } catch (error) {
        showStatus("Netwerkfout. Controleer je verbinding.", "error");
      }
    });

    function showStatus(message, type) {
      status.textContent = message;
      status.style.opacity = "0";
      status.classList.remove("success", "error", "info");
      status.classList.add(type);

      requestAnimationFrame(() => {
        status.style.opacity = "1";
      });

      // Auto-verbergen na 6 sec als success of error
      if (type === "success" || type === "error") {
        setTimeout(() => {
          status.style.opacity = "0";
        }, 6000);
      }
    }

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  }
});

// Automatisch jaartal in footer invullen
document.addEventListener("DOMContentLoaded", () => {
  
});