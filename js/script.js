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
  //Watcher
  const items = document.querySelectorAll("[data-item]")

  const options = {
    threshold: 0.2,
  }

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active")
      }
    })
  }

  const observer = new IntersectionObserver(callback, options)
  items.forEach((item) => {
    observer.observe(item)
  })
}

function getIndex(el) {
  return Array.from(el.parentNode.children).indexOf(el)
}
