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
  