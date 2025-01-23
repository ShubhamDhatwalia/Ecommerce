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




document.addEventListener('DOMContentLoaded', () => {
    const swiper = new swiper('.mySwiper', {
      loop: true, // Enable infinite loop
      pagination: {
        el: '.swiper-pagination', // Target the pagination element
        clickable: true, // Make pagination bullets clickable
      },
      autoplay: {
        delay: 3000, // Auto-slide delay in milliseconds
        disableOnInteraction: false, // Continue autoplay after user interaction
      },
      slidesPerView: 1,
      spaceBetween: 20, // Adjust spacing between slides
    });
  });
  