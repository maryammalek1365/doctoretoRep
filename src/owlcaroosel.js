$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});
// $('.owl-carousel').owlCarousel({
//     loop:true,
//     margin:12,
//     nav:true,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:3
//         },
//         1000:{
//             items:5
//         }
//     }
// })
$(document).ready(function(){
    $(".owl-carousel2").owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 2000,
        loop: true
    });
});