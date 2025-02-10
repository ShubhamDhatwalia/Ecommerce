AOS.init({
  once: true,
})



// Load wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlistData")) || [];

// Update wishlist count on load
document.querySelector(".wishList-count").textContent = wishlist.length;


if (wishlist.length === 0) {
  document.querySelector(".wishList-items").innerHTML = `<div class="empty-wishlist">
              <img src="./assests/no_wish_list.png" alt="">
              <button class="btn" onclick="window.location.href='home.html'">Back to Homepage</button>
          </div>`;
}


// Function to update only the wishlist icon
function updateWishlistIcon(productName, isInWishlist) {
  document.querySelectorAll(`[data-product-name="${productName}"]`).forEach((heartIcon) => {
    if (isInWishlist) {
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

// Function to add a new wishlist item dynamically (no full re-render)
function addToWishlistUI(product) {
  const wishlistContainer = document.querySelector(".wishList-items");

  // Remove empty wishlist message if it exists
  if (!wishlistContainer.querySelector(".productItem")) {
    wishlistContainer.innerHTML = "";
  }

  const cardHtml = `<div class="productItem" data-product-name="${product.productName}" data-aos="flip-left">
                      <div class="item-card">
                          <div class="item-img">
                              <img src="${product.productImage}" class="product-img" alt="">
                              <img src="./assests/fill-delete.png" class="fill-delete" alt="">
                              <button class="add-to-cart">Add to Cart</button>
                          </div>
                          <div class="item-details">
                              <h4 class="product-name">${product.productName}</h4>
                              <div class="price">
                                  <h4>₹${product.price} <span class="discounted-price">₹${product.originalPrice}</span></h4>
                              </div>
                          </div>
                      </div>
                  </div>`;

  wishlistContainer.insertAdjacentHTML("beforeend", cardHtml);
  document.querySelector(".wishList-count").textContent = wishlist.length;
}



// Function to remove a specific wishlist item dynamically (no full re-render)
function removeFromWishlistUI(productName) {
  const productElement = document.querySelector(`.productItem[data-product-name="${productName}"]`);
  if (productElement) {
    productElement.remove();
  }



  // If the wishlist is empty, show the empty message
  if (wishlist.length === 0) {
    document.querySelector(".wishList-items").innerHTML = `<div class="empty-wishlist">
                <img src="./assests/no_wish_list.png" alt="">
                <button class="btn" onclick="window.location.href='home.html'">Back to Homepage</button>
            </div>`;
  }

  document.querySelector(".wishList-count").textContent = wishlist.length;
}




// Function to toggle wishlist status
function toggleWishList(productName) {
  const index = wishlist.findIndex(item => item.productName === productName);
  let isInWishlist = false;

  if (index === -1) {
    const product = JSON.parse(localStorage.getItem("productData")).find(item => item.productName === productName);
    if (product) {
      wishlist.push(product);
      isInWishlist = true;
      addToWishlistUI(product); // Add only the new item
    }
  } else {
    wishlist.splice(index, 1);
    removeFromWishlistUI(productName); // Remove only the specific item
  }

  localStorage.setItem("wishlistData", JSON.stringify(wishlist));
  updateWishlistIcon(productName, isInWishlist);
}



// Function to render "Products for You" (runs only once)
function renderProductsForYou() {
  const productContainer = document.querySelector(".products-for-you");
  const storedProductData = JSON.parse(localStorage.getItem("productData")) || [];

  productContainer.innerHTML = storedProductData.slice(0, 4).map(product => {
    const isInWishlist = wishlist.some(item => item.productName === product.productName);

    return `<div class="productSlides" data-aos="flip-left">
              <div class="productItem">
                <div class="item-card">
                  <div class="item-img">
                    <img src="${product.productImage}" class="product-img" alt="">
                    <i class="fill-heart fa-${isInWishlist ? 'solid' : 'regular'} fa-heart" data-product-name="${product.productName}" style="color: ${isInWishlist ? '#e60505' : ''};"></i>
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
  }).join('');
}



// Event delegation for wishlist toggle
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fill-heart")) {
    const productName = e.target.getAttribute("data-product-name");
    toggleWishList(productName);
  }
});

// Event delegation for removing from wishlist
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fill-delete")) {
    const productElement = e.target.closest(".productItem");
    const productName = productElement.getAttribute("data-product-name");

    wishlist = wishlist.filter(item => item.productName !== productName);
    localStorage.setItem("wishlistData", JSON.stringify(wishlist));

    removeFromWishlistUI(productName); // Remove only the specific item
    updateWishlistIcon(productName, false);
  }
});

// Load UI on page load
renderProductsForYou();
wishlist.forEach(addToWishlistUI); // Load wishlist without full re-render



document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".overlay").style.height = "100vh";
  body.classList.add("no-scroll");

})


document.querySelector(".closebtn").addEventListener("click", () => {
  document.querySelector(".overlay").style.height = "0";
  body.classList.remove("no-scroll");
})




