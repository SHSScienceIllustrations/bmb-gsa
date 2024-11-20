// JavaScript to toggle the dropdown menu
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links-mobile');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active'); // Toggle dropdown menu
    });
});
