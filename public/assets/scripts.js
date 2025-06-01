// GLOBAL SCOPE: Mobile menu controls
const navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.classList.add("active");
}

function hideMenu() {
    navLinks.classList.remove("active");
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const body = document.body;

    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        // We are no longer storing theme in localStorage as per requirement to always respect device setting
        // localStorage.setItem('theme', theme);
    }

    // Set theme based solely on user's device preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    // Initial theme setting
    setTheme(prefersDarkMode.matches ? 'dark' : 'light');

    // Listen for changes in the user's preferred color scheme
    prefersDarkMode.addEventListener('change', (e) => {
        setTheme(e.matches ? 'dark' : 'light');
    });

    // Animation Targets
    const bioListContainer = document.querySelector('.biospecimen-section .feature-list');
    const smoListContainer = document.querySelector('.smo-section .smo-list-container');
    const smoCardsContainer = document.querySelector('.smo-section .smo-cards-row');
    const motiveCols = document.querySelectorAll('.motive-col');
    const challengeCols = document.querySelectorAll('.challenges-col');
    const footer = document.querySelector('footer');
    const contactForm = document.getElementById('contactForm');

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const target = entry.target;

            if (target.classList.contains('feature-list')) {
                target.querySelectorAll('li').forEach((item, i) => {
                    setTimeout(() => {
                        item.style.animation = `slideInLeft 0.6s ease-out forwards`;
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, i * 100);
                });
            } else if (target.classList.contains('smo-list-container')) {
                target.querySelectorAll('li').forEach((item, i) => {
                    setTimeout(() => {
                        item.style.animation = `slideInLeft 0.6s ease-out forwards`;
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, i * 100);
                });
            } else if (target.classList.contains('smo-cards-row')) {
                target.querySelectorAll('.smo-card-col').forEach((card, i) => {
                    setTimeout(() => {
                        card.style.animation = `slideInRight 0.6s ease-out forwards`;
                        card.style.opacity = '1';
                        card.style.transform = 'translateX(0)';
                    }, i * 150);
                });
            } else {
                const index = [...document.querySelectorAll('.motive-col, .challenges-col')].indexOf(target);
                const delay = index >= 0 ? index * 150 : 100;
                setTimeout(() => target.classList.add('fade-in-up'), delay);
            }

            observer.unobserve(target);
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    });

    if (bioListContainer) observer.observe(bioListContainer);
    if (smoListContainer) observer.observe(smoListContainer);
    if (smoCardsContainer) observer.observe(smoCardsContainer);
    motiveCols.forEach(el => observer.observe(el));
    challengeCols.forEach(el => observer.observe(el));
    if (footer) observer.observe(footer);
    if (contactForm) observer.observe(contactForm);
});



// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
});


const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('shrink');
  } else {
    nav.classList.remove('shrink');
  }
});


document.getElementById("cropForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const resultElem = document.getElementById("cropResult");
  resultElem.innerText = "Analyzing image...";

  const formData = new FormData();
  const fileInput = this.querySelector('input[type="file"][name="lungImage"]');
  if (!fileInput.files.length) {
    resultElem.innerText = "❌ Please select an image file.";
    return;
  }
  formData.append("file", fileInput.files[0]);

  try {
    const response = await fetch("https://chestvision-api.onrender.com/predict", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      resultElem.innerText = "❌ Error analyzing image.";
      return;
    }

    const result = await response.json();
    if (result.prediction) {
      resultElem.innerHTML = `🩺 <b>Prediction:</b> ${result.prediction}`;
    } else {
      resultElem.innerText = "❌ No prediction received.";
    }
  } catch (error) {
    resultElem.innerText = "❌ Error connecting to analysis API.";
    console.error("Lung Disease API Error:", error);
  }
});


// Smoking Impact Analysis (Live AQI & Cigarette Equivalent)
document.getElementById("fertilizerForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const resultElem = document.getElementById("fertilizerResult");
  resultElem.innerText = "Detecting your location...";

  if (!navigator.geolocation) {
    resultElem.innerText = "❌ Geolocation is not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    try {
      // 1. Get formatted location using backend proxy
      const geoRes = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`);
      const geoData = await geoRes.json();
      const formattedLocation = geoData.results?.[0]?.formatted || `Lat: ${lat}, Lon: ${lng}`;

      // 2. Get air quality data from backend proxy
      const airRes = await fetch(`/api/airquality?lat=${lat}&lng=${lng}`);
      const airData = await airRes.json();
      if (!airData.list || airData.list.length === 0) {
        resultElem.innerText = "❌ Could not retrieve air quality data.";
        return;
      }
      const pm25 = airData.list[0].components.pm2_5;
      const aqi = airData.list[0].main.aqi;

      // 3. Calculate cigarettes per day equivalent
      const cigarettes_per_day = (pm25 / 22).toFixed(2);

      // 4. AQI level interpretation
      let aqiLevel = "";
      let warning = "";
      switch (aqi) {
        case 1:
          aqiLevel = "Good";
          warning = "Air quality is good. Smoking still poses health risks—consider quitting for better health.";
          break;
        case 2:
          aqiLevel = "Fair";
          warning = "Air quality is fair. Smoking combined with this air can increase health risks.";
          break;
        case 3:
          aqiLevel = "Moderate";
          warning = `Air quality is moderate. Breathing this air is like smoking <b>${cigarettes_per_day}</b> cigarettes/day.`;
          break;
        case 4:
          aqiLevel = "Poor";
          warning = `Air quality is poor! Breathing this air is like smoking <b>${cigarettes_per_day}</b> cigarettes/day. Avoid smoking and limit outdoor exposure.`;
          break;
        case 5:
          aqiLevel = "Very Poor";
          warning = `Air quality is very poor! This is equivalent to <b>${cigarettes_per_day}</b> cigarettes/day. Smoking here is extremely hazardous.`;
          break;
        default:
          aqiLevel = "Unknown";
          warning = "Unable to determine air quality. Smoking is always harmful.";
      }

      resultElem.innerHTML = `
        <b>Live Location:</b> ${formattedLocation}<br>
        <b>PM2.5:</b> ${pm25} µg/m³<br>
        <b>AQI:</b> ${aqi} (${aqiLevel})<br>
        <b>Cigarettes/day (air pollution equivalent):</b> ${cigarettes_per_day}<br>
        <span style="color:#d32f2f;font-weight:500">${warning}</span>
      `;
    } catch (error) {
      resultElem.innerText = "❌ Error fetching air quality data.";
      console.error("Smoking Impact API Error:", error);
    }
  }, () => {
    resultElem.innerText = "❌ Unable to retrieve your location. Please allow location access.";
  });
});
