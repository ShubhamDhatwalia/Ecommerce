import { productData } from "./productData.js";
AOS.init();

var dropdown = document.getElementsByClassName("dropdown-btn");


var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {

    var dropdownContent = this.nextElementSibling;
    var dropdownIcon = this.children[0];


    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      this.classList.toggle("active");
      dropdownIcon.style.transform = "rotate(0deg)";


    }
    else {
      dropdownContent.style.display = "block ";
      this.classList.toggle("active");
      dropdownIcon.style.transform = "rotate(90deg)";
    }

  })
}



productData.forEach((product) => {
  const cardHtml = `

  <div class="productSlides swiper-slide" data-aos="flip-left">
                        <div class="productItem">

  <div class="item-card">

                        <div class="item-img">
                            <img src="${product.productImage}" class="product-img" alt="">

                            <img src="./assests/fill-heart.png" class="fill-heart" alt="">
                            <img src="./assests/fill-eye.png"  class="fill-eye" alt="">
                            <button class=" add-to-cart">Add to Cart <button>
                            <div class="discount-percentage">
                                <p>${product.discountPercentage}</p>
                            </div>
                        </div>

                        <div class="item-details">
                            <h4 class="product.name">${product.productName}</h4>

                            <div class="price">
                                <h4>$ ${product.price} <span class="discounted-price">$${product.originalPrice}</span></h4>
                            </div>

                            <div class="ratting">
                                <img src="./assests/ratting-star.svg" alt="">
                                <p>( <span ratting-number>${product.ratingCount}</span> )</p>
                            </div>
                        </div>

                        </div>
                        </div>
                        
                    </div>
  `;



  document.querySelector(".salesSwiper").innerHTML += cardHtml;
  document.querySelector(".bestSellingSwiper").innerHTML += cardHtml;
  document.querySelector(".productSwiper").innerHTML += cardHtml;
})




const swiperConfig = {
  slidesPerView: 4,
  spaceBetween: 30,
  breakpoints: {
    1200: { slidesPerView: 4, spaceBetween: 30, slidesPerGroup: 4 },
    992: { slidesPerView: 3, spaceBetween: 25, slidesPerGroup: 3 },
    620: { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2 },
    200: { slidesPerView: 1, spaceBetween: 10, slidesPerGroup: 1 },
  },
};

var falshSalesSwiper = new Swiper(".flash-sales-carousel ", {
  ...swiperConfig,
  navigation: {
    nextEl: ".custom-next",  // Custom next button
    prevEl: ".custom-prev",  // Custom previous button
  },

});


var bestSellingSwiper = new Swiper(".best-selling-carousel", {
  ...swiperConfig,
})

var productsCarousel = new Swiper(".products-carousel", {


  navigation: {
    nextEl: ".products-next",
    prevEl: ".products-prev"
  },
  grid: {
    rows: 2,
  },
  breakpoints: {
    1200: {
      slidesPerView: 4, spaceBetween: 30, slidesPerGroup: 4, grid: { rows: 2 }
    },
    992: { slidesPerView: 3, spaceBetween: 25, slidesPerGroup: 3, grid: { rows: 2 } },
    620: { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2, grid: { rows: 2 } },
    200: { slidesPerView: 1, spaceBetween: 10, slidesPerGroup: 1, grid: { rows: 2 } },
  },
})

var categoryCarousel = new Swiper(".categories-carousel", {
  spaceBetween: 10,
  slidesPerView: 6,
  breakpoints: {
    1440: { slidesPerView: 6, spaceBetween: 30, slidesPerGroup: 4 },
    1024: { slidesPerView: 5, spaceBetween: 30, slidesPerGroup: 5 },
    820: { slidesPerView: 4, spaceBetween: 25, slidesPerGroup: 4 },
    620: { slidesPerView: 3, spaceBetween: 10, slidesPerGroup: 3 },
    425: { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2 },
    200: { slidesPerView: 1, spaceBetween: 10, slidesPerGroup: 1 },
  },
  navigation: {
    nextEl: ".category-next",  // Custom next button
    prevEl: ".category-prev",  // Custom previous button
  },
})


var sideNavCarousel = new Swiper(".nav-carousel", {
  slidesPerView: 'auto',
  spaceBetween: 40,
  freeMode: true,
  speed: 8000,
  allowTouchMove: true,

  autoplay: {
    delay: 0,
    pauseOnMouseEnter: true,
  }
})

var offersCarousel = new Swiper(".offers-carousel", {
  loop: true,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
})



const body = document.body;

document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".overlay").style.height = "100%";
  body.classList.add("no-scroll");
  
})


document.querySelector(".closebtn").addEventListener("click", () => {
  document.querySelector(".overlay").style.height = "0";
  body.classList.remove("no-scroll");
})


const countDownDate = new Date("Feb 5, 2025 15:37:25").getTime();


var x = setInterval(function() {

  var now = new Date().getTime();
   
  var distance = countDownDate - now;
    
  
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  
  document.getElementById("days").innerHTML = String(days).padStart(2, "0");
  document.getElementById("banner-days").innerHTML = String(days).padStart(2, "0");

  document.getElementById("hours").innerHTML = String(hours).padStart(2, "0");
  document.getElementById("banner-hours").innerHTML = String(hours).padStart(2, "0");

  document.getElementById("minutes").innerHTML = String(minutes).padStart(2, "0");
  document.getElementById("banner-minutes").innerHTML = String(minutes).padStart(2, "0");

  document.getElementById("seconds").innerHTML = String(seconds).padStart(2, "0");
  document.getElementById("banner-seconds").innerHTML = String(seconds).padStart(2, "0");

 
  if (distance < 0) {
    clearInterval(x);
   document.getElementsByClassName("duration").style.display = 'none';
   document.getElementsByClassName("time").style.display = 'none';

  }
}, 1000);