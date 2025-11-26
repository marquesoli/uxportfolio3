document.addEventListener("DOMContentLoaded", () => {
  // Select all elements with the 'scroll-reveal' class
  const revealElements = document.querySelectorAll(".scroll-reveal")

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
          // Add the 'revealed' class
          entry.target.classList.add("revealed")
          // Stop observing the element after it's been revealed
          observer.unobserve(entry.target)
        }
      })
    },
    {
      // Element becomes visible when 15% of it enters the viewport
      threshold: 0.15,
      // Start revealing elements slightly before they enter the viewport
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Observe each element
  revealElements.forEach((element) => {
    observer.observe(element)
  })

  // Image Modal Functionality
  const modal = document.createElement("div")
  modal.className = "image-modal"
  modal.innerHTML = `
    <span class="close-modal">&times;</span>
    <img class="modal-content" src="/placeholder.svg" alt="">
  `
  document.body.appendChild(modal)

  const modalImg = modal.querySelector(".modal-content")
  const closeBtn = modal.querySelector(".close-modal")

  // Add click event to all project images
  const projectImages = document.querySelectorAll(".project-showcase .project-image-full img")
  projectImages.forEach((img) => {
    img.addEventListener("click", () => {
      modal.classList.add("active")
      modalImg.src = img.src
      modalImg.alt = img.alt
      document.body.style.overflow = "hidden"
    })
  })

  // Close modal functionality
  const closeModal = () => {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  closeBtn.addEventListener("click", closeModal)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal()
    }
  })
})
