const body = document.body;
AOS.init({
  once: true,
});





//  --------------------Contact Form ----------------

const form = document.querySelector(".contact-form form");


let nameError = document.getElementById("name-error");
let mailError = document.getElementById("mail-error");
let phoneError = document.getElementById("phone-error");

let fullName = document.getElementById("contact-name");
let email = document.getElementById("contact-mail");
let phone = document.getElementById("contact-phone");



form.addEventListener("submit", (event) => {

  event.preventDefault();

  let isNameValid = validateName();
  let isMailValid = validateEmail();
  let isPhoneValid = validatePhone();


  if (isMailValid && isNameValid && isPhoneValid) {

    form.reset();
    nameError.style.visibility = 'hidden'
    fullName.style.outline = 'none';

    mailError.style.visibility = 'hidden'
    email.style.outline = 'none';

    phoneError.style.visibility = 'hidden'
    phone.style.outline = 'none';


    Toastify({
      text: "Message sent successfully !",
      duration: 4000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,

      offset: {
        y: "150px"
      },

      style: {
        background: "linear-gradient(to right, #DB4444,rgb(218, 130, 103))",
        fontFamily: "'Poppins', sans-serif",
        fontSize: "16px",
        fontWeight: "500",
      },

    }).showToast();

  }

})








function validateName() {
  let fullName = document.getElementById("contact-name");
  let nameError = document.getElementById("name-error");
  let nameValue = fullName.value.trim();

  if (nameValue.length === 0) {
    showError(fullName, nameError, "Name is required");
    return false;
  }
  else if (!/^[A-Za-z]{3,}(\s[A-Za-z]+)?$/.test(nameValue)) {
    showError(fullName, nameError, "At least 3 letters in first name");
    return false;
  }
  else {
    showValid(fullName, nameError, "Name is valid");
    return true;
  }
}

function validateEmail() {
  let email = document.getElementById("contact-mail");
  let mailError = document.getElementById("mail-error");
  let emailValue = email.value.trim();

  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailValue.length === 0) {
    showError(email, mailError, "Email is required");
    return false;
  }
  else if (!emailPattern.test(emailValue)) {
    showError(email, mailError, "Invalid email format");
    return false;
  }
  else {
    showValid(email, mailError, "Email is valid");
    return true;
  }
}

function validatePhone() {
  let phone = document.getElementById("contact-phone");
  let phoneError = document.getElementById("phone-error");
  let phoneValue = phone.value.trim();

  let phonePattern = /^(?:\+?[1-9]\d{0,3}[-.\s]?)?(?:\d{10})$/;

  if (phoneValue.length === 0) {
    showError(phone, phoneError, "Phone number is required");
    return false;
  }
  else if (!phonePattern.test(phoneValue)) {
    showError(phone, phoneError, "Invalid phone number");
    return false;
  }
  else {
    showValid(phone, phoneError, "Phone number is valid");
    return true;
  }
}

// 🔹 Reusable function to show errors
function showError(input, errorElement, message) {
  errorElement.innerHTML = message;
  errorElement.style.color = "red";
  errorElement.style.visibility = "visible";
  input.style.outline = "2px solid red";
}

// 🔹 Reusable function to show valid messages
function showValid(input, errorElement, message) {
  errorElement.innerHTML = message;
  errorElement.style.color = "green";
  errorElement.style.visibility = "visible";
  input.style.outline = "2px solid green";
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
  ${lastIndex ? `<a class=" ${lastIndex ? "active" : ""}">${decodeURIComponent(segment.replace(".html", ""))}</a>`
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
  document.querySelector(".overlay").style.height = "100vh";
  body.classList.add("no-scroll");

})


document.querySelector(".closebtn").addEventListener("click", () => {
  document.querySelector(".overlay").style.height = "0";
  body.classList.remove("no-scroll");
})