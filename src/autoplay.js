// This script initializes a Swiper instance with autoplay functionality.
document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.mySwiper4', {
    
    
    // Required for loop to work properly
    slidesPerView: 1,
    spaceBetween: 30,
    
    // Loop configuration
    loop: true,
    loopAdditionalSlides: 1,  // Helps with small number of slides
    
    // Autoplay configuration
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    
    // Fix for both loop and autoplay
    on: {
      init() {
        if (this.slides.length < 3) {
          this.params.loop = false;
          this.autoplay.stop(); // Pause autoplay if loop disabled
          this.update();
        }
      }
    }
  });
});

