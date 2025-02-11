AOS.init({
  once: true,
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








//  ------------------ breadcrumb ------------------

const breadcrumbContainer = document.querySelector(".breadcrumb");

const path = window.location.pathname.split("/").filter(segment => segment);

let fullPath = "";
let breadcrumbHtml = '<li><a href="home.html">Home</a></li>';


path.forEach((segment, index) => {

  fullPath += `/${segment}`;
  const lastIndex = index === path.length - 1;

  breadcrumbHtml += `<li  >
  ${lastIndex ? `<a class=" ${lastIndex ? "active" : ""}">${decodeURIComponent(segment.replace(".html", ""))}</a>`
      : `<a href="${fullPath}">${decodeURIComponent(segment.replace(".html", ""))}</a>`}
</li>`;
});

breadcrumbContainer.innerHTML = breadcrumbHtml;







//  Cart List Rendering 
//  ------------------ Cart List Rendering ------------------

let cartlist = JSON.parse(localStorage.getItem("cartlist")) || [];

let delivery = document.querySelector(".delivery");
let cartSubtotal = document.querySelector(".cart-subtotal");
let cartTotal = document.querySelector(".total");
let cartContainer = document.querySelector(".cart-items-container");
cartContainer.innerHTML = "";

// Show empty cart message if no items exist
if (cartlist.length === 0) {
  document.querySelector("table").style.display = "none";
  document.querySelector(".cart-items").innerHTML = `
    <img class="empty-cart-image" src="./assests/empty-cart.png" alt="" data-aos="zoom-in" data-aos-duration="1000">
  `;
}

// Function to update total price and delivery charge
function updateTotal() {
  let total = 0;
  document.querySelectorAll(".product-subtotal").forEach((element) => {
    let subtotal = parseFloat(element.innerText.replace("₹", "")) || 0;
    total += subtotal;
  });

  let deliveryCharge = total < 499 && total !== 0 ? 40 : 0;
  delivery.textContent = deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`;

  let finalTotal = total + deliveryCharge;

  cartSubtotal.textContent = `₹${total.toFixed(2)}`;
  cartTotal.textContent = `₹${finalTotal.toFixed(2)}`;
}

// Render each product in the cart
cartlist.forEach((product, index) => {
  const cartRow = document.createElement("tr");

  cartRow.setAttribute("data-price", product.price);

  let productNameShort = product.productName.split(" ").slice(0, 2).join(" ");

  cartRow.innerHTML = ` 
    <td class="product">
      <img src="${product.productImage}" alt=""> 
      <span class="product-name">${productNameShort}</span>
    </td>
    <td class="price"> ₹${product.price}</td>
    <td class="quantity">
      <input type="number" class="input-quantity" min="0" value="${product.cartQuantity}" onkeydown="return false;">
    </td>
    <td class="product-subtotal">₹${(product.cartQuantity * product.price).toFixed(2)}</td>
  `;

  cartContainer.appendChild(cartRow);

  
  let inputQuantity = cartRow.querySelector(".input-quantity");
  let productSubtotal = cartRow.querySelector(".product-subtotal");

  
  inputQuantity.addEventListener("input", () => {
    let quantity = parseInt(inputQuantity.value);
    
    
    let productIndex = cartlist.findIndex(item => item.productName === product.productName);
    if (productIndex !== -1) {
      cartlist[productIndex].cartQuantity = quantity;
    }
  
    if (quantity === 0) {
     
      cartRow.remove();
      
     
      cartlist = cartlist.filter(item => item.cartQuantity > 0);
      
     
      localStorage.setItem("cartlist", JSON.stringify(cartlist));
  
    
      if (cartlist.length === 0) {
        document.querySelector("table").style.display = "none";
        document.querySelector(".cart-items").innerHTML = `
          <img class="empty-cart-image" src="./assests/empty-cart.png" alt="" data-aos="zoom-in" data-aos-duration="1000">
        `;
      }
    } else {
      localStorage.setItem("cartlist", JSON.stringify(cartlist));
    }
  
   
    productSubtotal.textContent = `₹${(quantity * product.price).toFixed(2)}`;
  
   
    updateTotal();
  });
  
})

updateTotal();
