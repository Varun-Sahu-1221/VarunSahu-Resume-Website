document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const closeBtn = document.getElementById("close-btn");
  hamburgerMenu.addEventListener("click", () => {
    mobileMenuOverlay.classList.add("active");
    playMobileLogoAnimation();
  });
  closeBtn.addEventListener("click", () => {
    mobileMenuOverlay.classList.remove("active");
  });

  function updateTime() {
    const timeDisplay = document.getElementById("time-display");
    const mobileTimeDisplay = document.getElementById("mobile-time-display");
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formatter = new Intl.DateTimeFormat([], options);
    const timeString = formatter.format(new Date());
    if (timeDisplay) {
      timeDisplay.textContent = `India | ${timeString}`;
    }
    if (mobileTimeDisplay) {
      mobileTimeDisplay.textContent = `India | ${timeString}`;
    }
  }
  setInterval(updateTime, 60000);
  updateTime();

  const logo = document.getElementById("logo");
  const logoText = "CAESAR";

  logoText.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.className = "logo-letter";
    span.textContent = letter;
    logo.appendChild(span);
  });

  const mobileLogo = document.getElementById("mobile-logo");
  logoText.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.className = "mobile-logo-letter";
    span.textContent = letter;
    mobileLogo.appendChild(span);
  });

  function playLogoAnimation() {
    gsap.killTweensOf(".logo-letter");
    gsap.set(".logo-letter", {
      opacity: 0,
      y: -90,
      rotation: () => gsap.utils.random(-45, 45),
    });
    gsap.to(".logo-letter", {
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: 1.2,
      ease: "bounce.out",
      stagger: 0.08,
    });
  }

  function playMobileLogoAnimation() {
    gsap.killTweensOf(".mobile-logo-letter");
    gsap.set(".mobile-logo-letter", {
      opacity: 0,
      y: -60,
      rotation: () => gsap.utils.random(-45, 45),
    });
    gsap.to(".mobile-logo-letter", {
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: 1.2,
      ease: "bounce.out",
      stagger: 0.08,
    });
  }

  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;
  const scrollThreshold = 10;

  window.addEventListener(
    "scroll",
    () => {
      if (mobileMenuOverlay.classList.contains("active")) {
        return;
      }
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (Math.abs(scrollTop - lastScrollTop) <= scrollThreshold) {
        return;
      }
      if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
        navbar.classList.add("navbar--hidden");
      } else {
        if (navbar.classList.contains("navbar--hidden")) {
          navbar.classList.remove("navbar--hidden");
          playLogoAnimation();
        }
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    },
    { passive: true }
  );

  playLogoAnimation();
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);
  const elementsToAnimate = gsap.utils.toArray(
    "#top-part > *, #center-part > *, #bottom-part > *"
  );
  gsap.from(elementsToAnimate, {
    opacity: 0,

    duration: 1,
    ease: "power3.out",
    stagger: 0.5,

    scrollTrigger: {
      trigger: ".Page2",
      start: "top 70%",
      end: "bottom 80%",
      scrub: 0.5,
      markers: false,
    },
  });
});



gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".card:not(:last-child)");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-container",
    pin: ".card-stack",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  }
});

cards.forEach((card) => {
  tl.to(card, {
    yPercent: -200,
    rotation: 8,
    ease: "power1.in"
  });
});
