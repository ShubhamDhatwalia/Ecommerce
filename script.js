import { productData } from "./productData.js";


AOS.init({
  once: true,
});





document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function (e) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");

    let rect = this.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});








const navLinks = document.querySelectorAll(".menu-link")
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach((nav) => {
  if (nav.getAttribute("href") === currentPage) {
    nav.classList.add("visited");
  }
})



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







// Store product data in localStorage
localStorage.setItem("productData", JSON.stringify(productData));
const storedProductData = JSON.parse(localStorage.getItem("productData"));



storedProductData.forEach((product) => {
  const cardHtml = `
  <div class="productSlides swiper-slide" data-aos="flip-left">
    <div class="productItem">
      <div class="item-card">
        <div class="item-img">
          <img src="${product.productImage}" class="product-img" alt="">
          <i class="fill-heart fa-regular fa-heart" data-product-name="${product.productName}"></i>
          <img src="./assests/fill-eye.png" class="fill-eye" alt="">
          <button class="add-to-cart">Add to Cart</button>
          <div class="discount-percentage">
            <p>${product.discountPercentage}</p>
          </div>
        </div>
        <div class="item-details">
          <h4 class="product-name">${product.productName}</h4>
          <div class="price">
            <h4>₹${product.price} <span class="discounted-price">₹${product.originalPrice}</span></h4>
          </div>
          <div class="ratting">
            <img src="./assests/ratting-star.svg" alt="">
            <p>(<span class="ratting-number">${product.ratingCount}</span>)</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  document.querySelector(".salesSwiper").innerHTML += cardHtml;
  document.querySelector(".bestSellingSwiper").innerHTML += cardHtml;
  document.querySelector(".productSwiper").innerHTML += cardHtml;
});



// Toggle wishlist function
function toggleWishList(product) {
  let wishlist = JSON.parse(localStorage.getItem("wishlistData")) || [];
  const index = wishlist.findIndex(item => item.productName === product.productName);

  if (index === -1) {
    wishlist.push(product);
  } else {
    wishlist.splice(index, 1);
  }

  localStorage.setItem("wishlistData", JSON.stringify(wishlist));

  // Update all instances of the same product
  document.querySelectorAll(`[data-product-name="${product.productName}"]`).forEach((heartIcon) => {
    if (index === -1) {
      heartIcon.classList.remove("fa-regular");
      heartIcon.classList.add("fa-solid");
      heartIcon.style.color = "#e60505";
    } else {
      heartIcon.classList.remove("fa-solid");
      heartIcon.classList.add("fa-regular");
      heartIcon.style.color = "";
    }
  });
}

// Click event to toggle wishlist
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fill-heart")) {
    const productName = e.target.getAttribute("data-product-name");
    let selectedProduct = storedProductData.find(item => item.productName === productName);

    if (selectedProduct) {
      toggleWishList(selectedProduct);
    }
  }
});

// Update wishlist UI on page load
let wishlist = JSON.parse(localStorage.getItem("wishlistData")) || [];
wishlist.forEach(product => {
  document.querySelectorAll(`[data-product-name="${product.productName}"]`).forEach((heartIcon) => {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid");
    heartIcon.style.color = "#e60505";
  });
});




// ------------------Store to cartlist -------------

let cartlist = JSON.parse(localStorage.getItem("cartlist")) || [];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const productName = e.target.parentElement.children[1].getAttribute("data-product-name");


    let selectedProduct = storedProductData.find(item => item.productName === productName);

    const index = cartlist.findIndex(item => item.productName === productName);


    if (index === -1) {
      cartlist.push({ ...selectedProduct, cartQuantity: 1 });
      localStorage.setItem("cartlist", JSON.stringify(cartlist));


      Toastify({
        text: "Added to cart !",
        duration: 1500,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        offset: { y: "100px" },
        style: {
          background: "linear-gradient(to right,rgb(111, 145, 103), rgb(49, 194, 30))",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "16px",
          fontWeight: "500",
          borderRadius: "5px",
        },
      }).showToast();
    }
    else {

      Toastify({
        text: "Already in cart !",
        duration: 1500,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        offset: { y: "100px" },
        style: {
          background: "linear-gradient(to right, #DB4444, rgb(218, 130, 103))",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "16px",
          fontWeight: "500",
          borderRadius: "5px",
        },
      }).showToast();
    }
  }
});






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
  loop: true,
  speed: 5000,


  autoplay: {
    delay: 10,
    reverseDirection: false,
    disableOnInteraction: true,
  }
})

var offersCarousel = new Swiper(".offers-carousel", {
  loop: true,

  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
})






const body = document.body;

document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".overlay").style.height = "100vh";
  body.classList.add("no-scroll");

})


document.querySelector(".closebtn").addEventListener("click", () => {
  document.querySelector(".overlay").style.height = "0";
  body.classList.remove("no-scroll");
})


const countDownDate = new Date("Feb 15, 2025 15:37:25").getTime();


var x = setInterval(function () {

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
    document.querySelector(".duration").style.display = 'none';
    document.querySelector(".time").style.display = 'none';

  }
}, 1000);

