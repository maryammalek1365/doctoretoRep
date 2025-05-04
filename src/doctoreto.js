// اسکریپت مدیریت منو
const hamburgerBtn = document.querySelector('.hamburger-btn');
const mainNav = document.querySelector('.main-nav');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// بستن منو با کلیک خارج از آن
document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        mainNav.classList.remove('active');
    }
});

// بستن منو در صورت تغییر سایز صفحه
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburgerBtn.classList.remove('active');
        mainNav.classList.remove('active');
    }
