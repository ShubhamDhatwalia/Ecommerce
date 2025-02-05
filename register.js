AOS.init();






// -----------------------register from ---------------



let form = document.querySelector(".register-form form");

let userName = document.getElementById("user-name");
let userEmailPhone = document.getElementById("user-mail-phone");
let userPassword = document.getElementById("user-password");


let nameError = document.getElementById("name-error");
let mailPhoneError = document.getElementById("mail-phone-error");
let passwordError = document.getElementById("password-error");



form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isNameValid = validateName();
  let isMailPhoneValid = validateMailPhone();
  let isPasswordValid = validatePassword();

  if (isMailPhoneValid && isNameValid && isPasswordValid) {
    form.reset();

    clearValidation();
  }

})


function clearValidation(){
  nameError.style.visibility = 'hidden'
    userName.style.outline = 'none';

    mailPhoneError.style.visibility = 'hidden'
    userEmailPhone.style.outline = 'none';

    passwordError.style.visibility = 'hidden'
    userPassword.style.outline = 'none';
}

function validateName() {

  let nameValue = userName.value.trim();

  if (nameValue.length === 0) {
    showError(userName, nameError, "Name is required");
    return false;
  }
  else if (!/^[A-Za-z]{3,}(\s[A-Za-z]+)?$/.test(nameValue)) {
    showError(userName, nameError, "At least 3 letters in first name");
    return false;
  }
  else {
    showValid(userName, nameError, "Name is valid");
    return true;
  }
}

function validateMailPhone() {

  let mailPhoneValue = userEmailPhone.value.trim();

  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let phonePattern = /^(?:\+?[1-9]\d{0,3}[-.\s]?)?(?:\d{10})$/; // Supports 10-digit numbers, with optional country code

  if (mailPhoneValue.length === 0) {
    showError(userEmailPhone, mailPhoneError, "Email or phone is required");
    return false;
  }
  else if (!emailPattern.test(mailPhoneValue) && !phonePattern.test(mailPhoneValue)) {
    showError(userEmailPhone, mailPhoneError, "Enter a valid email or phone number");
    return false;
  }
  else {
    showValid(userEmailPhone, mailPhoneError, "Valid input");
    return true;
  }
}

function validatePassword() {
  let passwordValue = userPassword.value.trim();

  if (passwordValue.length === 0) {
    showError(userPassword, passwordError, "Password required");
    return false;
  }
  else if (!passwordValue.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
    showError(userPassword, passwordError, "Must be 8+ chars, include A-Z, a-z, 0-9, and a symbol.")
    return false;
  }
  else {
    showValid(userPassword, passwordError, "Password is valid")
    return true;
  }

}

function showError(input, errorElement, message) {
  errorElement.innerHTML = message;
  errorElement.style.color = "red";
  errorElement.style.visibility = "visible";
  input.style.borderBottom = "2px solid red";
}

function showValid(input, errorElement, message) {
  errorElement.innerHTML = message;
  errorElement.style.color = "green";
  errorElement.style.visibility = "visible";
  input.style.borderBottom = "2px solid green";
}








document.querySelector(".user-menu .wishlist-link  ").style.display = "none";
document.querySelector(".user-menu .cart-link  ").style.display = "none";




const body = document.body;
const navLinks = document.querySelectorAll(".menu-link")
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach((nav) => {
  if (nav.getAttribute("href") === currentPage) {
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