AOS.init();




document.querySelector(".user-menu .wishlist-link  ").style.display = "none";
document.querySelector(".user-menu .cart-link  ").style.display = "none";




const body = document.body;
const navLinks = document.querySelectorAll(".menu-link")
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach((nav)=>{
  if(nav.getAttribute("href") === currentPage){
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