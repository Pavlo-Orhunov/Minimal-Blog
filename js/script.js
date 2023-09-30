"use strict"

window.addEventListener("load", windowLoad)

function windowLoad() {
  document.body.classList.add("loaded")

  if (document.querySelector(".main-slider")) {
    new Swiper(".main-slider", {
      speed: 2000,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 3000,
      },
      loop: true,
      pagination: {
        el: ".bullets__items",
        type: "bullets",
        clickable: true,
      },
    })
  }

  document.addEventListener("click", documentActions)

  function documentActions(e) {
    const targetElement = e.target
    //tabs
    if (targetElement.closest(".nav-regular__cat")) {
      const tabNavItem = targetElement.closest(".nav-regular__cat")
      if (!tabNavItem.classList.contains("active")) {
        const activeTabNavItem = document.querySelector(
          ".nav-regular__cat.active"
        )
        activeTabNavItem.classList.remove("active")
        tabNavItem.classList.add("active")

        const tabItems = document.querySelectorAll(".regular__tab")
        const activeTabItem = document.querySelector(".regular__tab.active")

        activeTabItem.classList.remove("active")
        tabItems[getIndex(tabNavItem)].classList.add("active")
      }
    }
    //Up
    if (targetElement.closest(".footer__up")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      e.preventDefault()
    }
  }
}

function getIndex(el) {
  return Array.from(el.parentNode.children).indexOf(el)
}

// ----- animation --------------
const items = document.querySelectorAll("[data-animated]")

const appearThreshold = 0.3

const appearOptions = {
  threshold: appearThreshold,
}

const appearCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= appearThreshold) {
      entry.target.classList.add("active")
    } else {
      entry.target.classList.remove("active")
    }
  })
}

const appearObserver = new IntersectionObserver(appearCallback, appearOptions)

items.forEach((item) => {
  appearObserver.observe(item)
})

const animateOnScroll = () => {
  items.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (itemTop - windowHeight <= 0) {
      item.classList.add("active")
    } else {
      item.classList.remove("active")
    }
  })
}

window.addEventListener("scroll", animateOnScroll)
// ----- END OF animation --------------
