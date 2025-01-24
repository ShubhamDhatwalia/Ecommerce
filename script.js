import { productData } from "./productData.js";







var dropdown = document.getElementsByClassName("dropdown-btn");

var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {

    var dropdownContent = this.nextElementSibling;
    var dropdownIcon = this.children[0];
    console.log(dropdownIcon);

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

  <swiper-slide class="productSlides">
                        <div class="productItem">

  <div class="item-card">

                        <div class="item-img">
                            <img src="${product.productImage}" class="product-img" alt="">

                            <img src="./assests/fill-heart.png" class="fill-heart" alt="">
                            <img src="./assests/fill-eye.png"  class="fill-eye" alt="">
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
                        
                    </swiper-slide>
  `;



  document.querySelector(".productSwiper").innerHTML += cardHtml;
  document.querySelector(".bestSellingSwiper").innerHTML += cardHtml;
})






document.addEventListener('DOMContentLoaded', () => {
  const swiperElement = document.querySelector('.productSwiper');
  const swiperElement2 = document.querySelector('.categorySwiper');

  const swiper2 = swiperElement2.swiper;
  const swiper = swiperElement.swiper;

 


  document.querySelector('.category-prev').addEventListener('click', () => {

    swiper2.slidePrev();
  });

  document.querySelector('.category-next').addEventListener('click', () => {

    swiper2.slideNext();
  });



  document.querySelector('.custom-prev').addEventListener('click', () => {

    swiper.slidePrev();
  });

  document.querySelector('.custom-next').addEventListener('click', () => {

    swiper.slideNext();
  });
});















