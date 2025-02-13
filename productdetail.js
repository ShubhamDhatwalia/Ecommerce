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


const body = document.body;

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




