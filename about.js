const body = document.body;
AOS.init();







//  ------------------ breadcrumb ------------------

const breadcrumbContainer = document.querySelector(".breadcrumb");

const path = window.location.pathname.split("/").filter(segment => segment);

let fullPath = "";
let breadcrumbHtml = '<li><a href="home.html">Home</a></li>';


path.forEach((segment, index) => {

  fullPath += `/${segment}`;
  const lastIndex = index === path.length - 1;

  breadcrumbHtml += `<li  >
  ${lastIndex ? `<a class=" ${lastIndex? "active": ""}">${decodeURIComponent(segment.replace(".html", ""))}</a>`
      : `<a href="${fullPath}">${decodeURIComponent(segment.replace(".html", ""))}</a>`}
</li>`;
});

breadcrumbContainer.innerHTML = breadcrumbHtml;







const navLinks = document.querySelectorAll(".menu-link")
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach((nav) => {
  if (nav.getAttribute("href") === currentPage) {
    nav.classList.add("visited");
  }
})










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