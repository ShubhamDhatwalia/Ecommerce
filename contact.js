const body = document.body;
AOS.init();





//  --------------------Contact Form ----------------

const form = document.querySelector(".contact-form form");


let nameError = document.getElementById("name-error");
let mailError = document.getElementById("mail-error");
let phoneError = document.getElementById("phone-error");

let fullName = document.getElementById("contact-name") ;
console.log(fullName);




function validateName(){

  if(fullName.length == 0){
    console.log("Name required");
  }
}






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