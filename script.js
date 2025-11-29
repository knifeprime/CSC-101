// CUSTOM CURSOR
const cursor = document.querySelector(".cursor")

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX - 10 + "px"
  cursor.style.top = e.clientY - 10 + "px"
})

document.addEventListener("mousedown", () => {
  cursor.style.transform = "scale(0.8)"
})

document.addEventListener("mouseup", () => {
  cursor.style.transform = "scale(1)"
})

// PARTICLES BACKGROUND
function createParticles() {
  const particlesContainer = document.querySelector(".particles")
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDuration = Math.random() * 10 + 15 + "s"
    particle.style.animationDelay = Math.random() * 5 + "s"
    particlesContainer.appendChild(particle)
  }
}

createParticles()

// SIDEBAR TOGGLE
const menuToggle = document.querySelector(".menu-toggle")
const sidebar = document.querySelector(".sidebar")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open")
  })
}

// CLOSE SIDEBAR ON LINK CLICK (MOBILE)
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open")
  })
})

// PAGE NAVIGATION
function navigateTo(pageName) {
  // Remove active class from all pages and links
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
  })

  // Add active class to selected page and link
  const page = document.getElementById(pageName)
  if (page) {
    page.classList.add("active")
  }

  const link = document.querySelector(`[data-page="${pageName}"]`)
  if (link) {
    link.classList.add("active")
  }

  // Close sidebar on mobile
  sidebar.classList.remove("open")
}

// NAV LINK CLICK HANDLERS
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const pageName = link.getAttribute("data-page")
    navigateTo(pageName)
  })
})

// CONTACT FORM SUBMISSION
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Validate form
    if (name && email && message) {
      // Show success message
      alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon!`)

      // Reset form
      contactForm.reset()
    } else {
      alert("Please fill in all fields!")
    }
  })
}

// SMOOTH SCROLL BEHAVIOR
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// DISHCARD CLICK ANIMATIONS
const dishCards = document.querySelectorAll(".dish-card")
dishCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Add pulse animation on click
    card.style.animation = "none"
    setTimeout(() => {
      card.style.animation = ""
    }, 10)
  })
})

// IMAGE SLIDER FUNCTIONALITY
function changeSlide(button, direction) {
  const sliderContainer = button.closest(".card-image-slider")
  const img = sliderContainer.querySelector(".slider-img")
  const currentSrc = img.src

  // For now, keep same image (single image per dish)
  // Can be extended to cycle through multiple images
}

// INTERSECTION OBSERVER FOR LAZY ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// OBSERVE ELEMENTS FOR ANIMATION
document.querySelectorAll(".dish-card, .feature-card, .team-member").forEach((el) => {
  observer.observe(el)
})

// ADD CLICK EFFECTS TO BUTTONS
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.className = "ripple"

    this.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  })
})

// SCROLL ANIMATIONS FOR ELEMENTS
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll('[class*="fade-in"]')
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight - 100
    if (isVisible) {
      el.style.opacity = "1"
    }
  })
})

// KEYBOARD NAVIGATION
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    sidebar.classList.remove("open")
  }
})

// VIDEO DATA AND MODAL FUNCTIONALITY
const videoData = {
  jollof: {
    title: "How to Cook Jollof Rice",
    url: "https://youtu.be/zuAP_6MEy2E",
  },
  pepper: {
    title: "How to Cook Pepper Soup",
    url: "https://youtu.be/CBBj6ibfgSk",
  },
  suya: {
    title: "How to Make Suya",
    url: "https://youtu.be/rXCH7dJ_chY",
  },
  egusi: {
    title: "How to Cook Egusi Soup",
    url: "https://youtu.be/XeZJlxAsP18",
  },
  akara: {
    title: "How to Make Akara",
    url: "https://youtu.be/r2hVi_f4M6g",
  },
  yam: {
    title: "How to Pound Yam",
    url: "https://youtu.be/iyMWgnUKC94",
  },
}

function getYouTubeEmbedUrl(url) {
  let videoId = ""
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0]
  } else if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1].split("&")[0]
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url
}

// COMPARISON TABLE FUNCTIONALITY
// Add filter functionality
const filterBtns = document.querySelectorAll(".filter-btn")
const comparisonCards = document.querySelectorAll(".comparison-card")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")

    // Show/hide cards based on filter
    comparisonCards.forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.classList.remove("hidden")
      } else {
        card.classList.add("hidden")
      }
    })
  })
})

// INITIALIZE
document.addEventListener("DOMContentLoaded", () => {
  console.log("🍲 Nigerian Delights Website Loaded!")
  console.log("👨‍💻 CSC101 Project @ AATU")
})
