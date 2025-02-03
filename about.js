const body = document.body;
AOS.init();

document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".overlay").style.height = "100%";
  body.classList.add("no-scroll");
  
})


document.querySelector(".closebtn").addEventListener("click", () => {
  document.querySelector(".overlay").style.height = "0";
  body.classList.remove("no-scroll");
})


const teamCarousel = new Swiper(".team-carousel", {
    spaceBetween: 30,
    slidesPerView: 3,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      loop: true,

      autoplay: {
        delay: 2000,
      },
      breakpoints: {
        1200: { slidesPerView: 3, spaceBetween: 30, slidesPerGroup: 3 },
        820: { slidesPerView: 2, spaceBetween: 25, slidesPerGroup: 2 },
        200: { slidesPerView: 1, spaceBetween: 10, slidesPerGroup: 1 },
      },
})