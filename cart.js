AOS.init({
  once: true,
})

document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".overlay").style.height = "100vh";
  body.classList.add("no-scroll");

})


document.querySelector(".closebtn").addEventListener("click", () => {
  document.querySelector(".overlay").style.height = "0";
  body.classList.remove("no-scroll");
})



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

let cartlist = JSON.parse(localStorage.getItem("cartlist")) || [];



let delivery = document.querySelector(".delivery");
let cartSubtotal = document.querySelector(".cart-subtotal");
let cartTotal = document.querySelector(".total");
let cartContainer = document.querySelector(".cart-items-container");
cartContainer.innerHTML = "";



if (cartlist.length == 0) {
  console.log("cart is empty");

}


function updateTotal() {
  let total = 0;

  document.querySelectorAll(".product-subtotal").forEach((element) => {

    let subtotal = parseFloat(element.innerText.replace("₹", "")) || 0;
    total += subtotal;

  
  })

  
  let deliveryCharge = total<499 && total !== 0 ? 40: 0;
  delivery.textContent = deliveryCharge === 0 ? "Free" : deliveryCharge;

  let finalTotal = total+deliveryCharge;
 

  cartSubtotal.textContent = `₹${total.toFixed(2)}`;
  cartTotal.textContent = `₹${finalTotal.toFixed(2)}`;
}





cartlist.forEach((product) => {

  const cartRow = document.createElement("tr");
  cartRow.setAttribute("data-price", product.price);

  cartRow.innerHTML = ` 
                            <td class="product"><img src="${product.productImage}" alt=""> <span class="product-name">${product.productName}</span></td>
                            <td class="price"> ₹${product.price}</td>
                            <td class="quantity"><input type="number" class = "input-quantity" min="0" value="1"></td>
                            <td class="product-subtotal">₹${product.price.toFixed(2)}</td>
                        `;


  cartContainer.appendChild(cartRow);



  //  quantity and subtotal calculation

  let inputQuantity = cartRow.querySelector(".input-quantity");
  let productSubttotal = cartRow.querySelector(".product-subtotal");


  inputQuantity.addEventListener("input", () => {

    let quantity = parseInt(inputQuantity.value);

    if(quantity ===0 ){
      console.log("remove product");



       cartlist = cartlist.filter(item => item.productName !== product.productName);


      localStorage.setItem("cartlist", JSON.stringify(cartlist));

      cartRow.remove();

      updateTotal();
      return;

    }

    productSubttotal.textContent = `₹${(quantity * product.price).toFixed(2)}`;


    updateTotal();
  })
})

updateTotal();