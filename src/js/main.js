/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function () {

// MOBILE MENU
    const nav = document.querySelector('.header__nav');
    const btnBurger = document.querySelector('.btn_burger');
    const btnClose = document.querySelector('.btn_close');
    const backdrop = document.querySelector('.backdrop');
    const menuLinks = document.querySelectorAll('.menu__link');
    const subMenuToggles = document.querySelectorAll('.sub-menu__toggle');

    btnBurger.addEventListener('click', function (e) {
        e.preventDefault();
        nav.classList.add('open');
        backdrop.style.display = 'block';
        btnClose.style.display = 'block';
    });

    [btnClose, backdrop, ...menuLinks].forEach(function (element) {
        element.addEventListener('click', function () {
            nav.classList.remove('open');
            backdrop.style.display = 'none';
            btnClose.style.display = 'none';
        });
    });

    subMenuToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('sub-menu__toggle_active');
        });
    });


// HEADER AND DISCLAIMER SCROLL

    const header = document.querySelector('.header');
    const fixedBlock = document.querySelector('.disclaimer_main');

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 100) {
            header.classList.add('scroll');
            fixedBlock.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
            fixedBlock.classList.remove('scroll');
        }
    });


// CHANGED BG CARD BTN HOVER
    const bgChangeButtons = document.querySelectorAll('.bg-change');

    bgChangeButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            const card = button.closest('.card-product');
            card.classList.add('bg-show');
        });

        button.addEventListener('mouseleave', () => {
            const card = button.closest('.card-product');
            card.classList.remove('bg-show');
        });
    });

//CARD-HOT HIDE
    const cpHot = document.querySelector('.card-product_hot');
    const btnScScroll = document.querySelector('.btn-hot');
    const overlay = document.querySelector('.overlay');

    btnScScroll.addEventListener('click', function (e) {
        e.preventDefault();
        cpHot.classList.add('show');
        btnScScroll.classList.add('show');
        overlay.classList.add('show');
    });
    overlay.addEventListener('click', function (e) {
        e.preventDefault();
        cpHot.classList.remove('show');
        btnScScroll.classList.remove('show');
        overlay.classList.remove('show');
    });

//SLIDER FEATURES
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
//SLIDER PRODUCTS
    let sliderProducts;
    let sliderPurpose;

    function initSwiper() {
        if (window.innerWidth <= 1023) {
            if (!sliderProducts) {
                sliderProducts = new Swiper('.slider-products', {
                    spaceBetween: 24,
                    pagination: {
                        el: '.slider-products .swiper-pagination',
                        clickable: true,
                    },
                });
            }
            if (!sliderPurpose) {
                sliderPurpose = new Swiper('.slider-purpose', {
                    slidesPerView: 1,
                    spaceBetween: 24,
                });
            }
        } else {
            if (sliderProducts) {
                sliderProducts.destroy(true, true);
                sliderProducts = null;
            }
            if (sliderPurpose) {
                sliderPurpose.destroy(true, true);
                sliderPurpose = null;
            }
        }
    }

    initSwiper();

    window.addEventListener('resize', initSwiper);

//HIDE-SHOW TEXT
    const btnsSeeMore = document.querySelectorAll('.see-more');

    btnsSeeMore.forEach((btn) => {
        btn.addEventListener('click', function () {
            const hideText = this.parentElement.querySelector('.hide-text');

            if (hideText) {
                hideText.classList.toggle('open-text');
                this.textContent = hideText.classList.contains('open-text') ? "Згорнути інформацію" : "Більше інформації";
            }
        });
    });


//SLIDER-ACCORDION
    const slides = document.querySelectorAll('.slide-purpose');

    slides.forEach((slide) => {
        slide.addEventListener('click', function () {
            if (window.innerWidth >= 1024) {
                expand(slide);
            }
        });
    });

    function expand(target) {
        for (let slide of target.parentNode.children) {
            slide.classList.remove('expanded');
        }
        target.classList.add('expanded');
    }

//ANIMATION BLOCKS SECTION ACTION
    const blocks = document.querySelectorAll('.action__item');

    window.addEventListener('scroll', () => {
        let closestBlock = null;
        let closestDistance = window.innerHeight;
        blocks.forEach((block) => {
            const rect = block.getBoundingClientRect();
            const middleOfScreen = window.innerHeight / 2;
            const distanceToMiddle = Math.abs(rect.top - middleOfScreen);

            if (distanceToMiddle < closestDistance && rect.top < middleOfScreen) {
                closestDistance = distanceToMiddle;
                closestBlock = block;
            }
        });

        blocks.forEach(b => b.classList.remove('show'));
        if (closestBlock) {
            closestBlock.classList.add('show');
        }
    });

});





