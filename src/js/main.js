/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function () {

// MOBILE MENU
//     const sidebar = document.querySelector('.sidebar');
//     const headerSbOp = document.querySelector('.header');
//     const btnBurger = document.querySelector('.btn-burger');
//     const menuLinks = document.querySelectorAll('.sidebar .menu__link');
//
//     btnBurger.addEventListener('click', function (e) {
//         e.preventDefault();
//         sidebar.classList.toggle('open');
//         headerSbOp.classList.toggle('open');
//         overlay.classList.toggle('el-visible');
//     });
//
//     menuLinks.forEach(function (link) {
//         link.addEventListener('click', function () {
//             sidebar.classList.remove('open');
//             overlay.classList.remove('el-visible');
//         });
//     });
//
//     overlay.addEventListener('click', function () {
//         sidebar.classList.remove('open');
//         overlay.classList.remove('el-visible');
//     });

// CHANGED BG CARD BTN HOVER
    const bgChangeButtons = document.querySelectorAll('.bg-change');

    bgChangeButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            const card = button.closest('.card-product');
            card.style.background = 'radial-gradient(circle at 75% 84%, rgba(70, 182, 0, 0.2) 25%, #ffffff 50%)';
        });

        button.addEventListener('mouseleave', () => {
            const card = button.closest('.card-product');
            card.style.background = 'radial-gradient(circle at 75% 84%, rgba(70, 182, 0, 0) 25%, #ffffff 50%)';
        });
    });

//SCROLL CARD HIDE
    const cpHot = document.querySelector('.card-product_hot');
    const btnScScroll = document.querySelector('.btn-hot');
    const overlay = document.querySelector('.overlay');

    btnScScroll.addEventListener('click', function (e) {
        e.preventDefault();
        cpHot.classList.toggle('show');
        btnScScroll.classList.toggle('show');
        overlay.classList.toggle('show');
    });

//SLIDER
    if (document.querySelector('.slider-features')) {
        const sliderFeatures = new Swiper('.slider-features ', {
            spaceBetween: 24,
            slidesPerView: 'auto',
            speed: 1500,
            pagination: {
                el: '.slider-features .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.slider-features .swiper-button-next',
                prevEl: '.slider-features .swiper-button-prev',
            },
        });
    }

//SLIDER-ACCORDION
    const slides = document.querySelectorAll('.slide-purpose');

        slides.forEach((slide) => {
            slide.addEventListener('click', function () {
                expand(slide);
            });
        });

        function expand(target) {
            for (let slide of target.parentNode.children) {
                slide.classList.remove('expanded');
            }
            target.classList.add('expanded');
        }




});





