$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 0,
        dotsEach: 4,
        center: true, // آیتم‌ها را در مرکز قرار می‌دهد
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 6,
            },
        },
    });
});

