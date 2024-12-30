/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function () {

// MOBILE MENU
    const nav = document.querySelector('.header__nav');
    const navOpenHeader = document.querySelector('.header');
    const btnBurger = document.querySelector('.btn_burger');
    const btnClose = document.querySelector('.btn_close');
    const backdrop = document.querySelector('.backdrop');
    const menuLinks = document.querySelectorAll('.menu__link:not(.menu__item.dropdown .menu__link)');
    const subMenuLinks = document.querySelectorAll('.sub-menu__link');
    const subMenuToggles = document.querySelectorAll('.menu__item.dropdown .sub-menu__toggle');
    const menuItems = document.querySelectorAll('.menu__item.dropdown');

    const body = document.querySelector('body');

    btnBurger.addEventListener('click', function (e) {
        e.preventDefault();
        nav.classList.add('open');
        navOpenHeader.classList.remove('hidden')
        backdrop.style.display = 'block';
        body.classList.add('disable-scroll');
        navOpenHeader.classList.add('active');
        setTimeout(() => {
            btnClose.style.display = 'flex';
        }, 250);

    });

    [btnClose, backdrop, ...menuLinks].forEach(function (element) {
        element.addEventListener('click', function () {
            nav.classList.remove('open');
            backdrop.style.display = 'none';
            btnClose.style.display = 'none';
            body.classList.remove('disable-scroll');
            navOpenHeader.classList.remove('active');
            document.querySelector('.sub-menu__toggle').classList.remove('sub-menu__toggle_active');
        });
    });

// SUB-MENU TOGGLE
    subMenuToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation()
            console.log('Toggle clicked:', toggle);

            const isActive = toggle.classList.contains('sub-menu__toggle_active');

            document.querySelectorAll('.sub-menu__toggle_active').forEach(function (activeToggle) {
                if (activeToggle !== toggle) {
                    activeToggle.classList.remove('sub-menu__toggle_active');
                }
            });

            if (isActive) {
                toggle.classList.remove('sub-menu__toggle_active');
                toggle.nextElementSibling.style.display = 'none';
            } else {
                toggle.classList.add('sub-menu__toggle_active');
                toggle.nextElementSibling.style.display = 'block';
            }
        });
    });

    subMenuLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.stopPropagation(); // Зупиняємо спливання події
            console.log('Submenu link clicked:', link);

            nav.classList.remove('open');
            backdrop.style.display = 'none';
            body.classList.remove('disable-scroll');

            document.querySelectorAll('.sub-menu__toggle_active').forEach(function (activeToggle) {
                activeToggle.classList.remove('sub-menu__toggle_active');
            });
        });
    });

    menuItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            console.log('Menu item clicked:', item);

            const toggle = item.querySelector('.sub-menu__toggle');
            if (toggle) {
                e.preventDefault();
                toggle.click();
            }
        });
    });


// SCROLL TO ANCHOR
    function smoothScrollToAnchor(selector) {
        document.querySelectorAll(selector).forEach((element) => {
            element.addEventListener('click', function (event) {
                const anchor = this.getAttribute('href');

                if (anchor.startsWith('#') && anchor !== '#') {
                    event.preventDefault();

                    const targetElement = document.querySelector(anchor);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    smoothScrollToAnchor('.menu__item a');
    smoothScrollToAnchor('.sub-menu__item a');
    smoothScrollToAnchor('.card-product__link-wrap a');
    smoothScrollToAnchor('.section-banner .btn_stroke');


// Підключення до меню для роботи на тій самій сторінці
    function smoothScrollToAnchorCard(selector, offset = 0) {
        document.querySelectorAll(selector).forEach((element) => {
            element.addEventListener('click', function (event) {
                const targetId = this.getAttribute('data-scroll');
                if (targetId) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        event.preventDefault();

                        const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

                        window.scrollTo({
                            top: topPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

// Виклик для елементів із атрибутом data-scroll
    smoothScrollToAnchorCard('[data-scroll]', 90);

// VIDEO IPHONE
    const video = document.querySelector(".background-video");
    if (video) {
        video.play().catch((error) => {
            console.error("Автовідтворення не вдалося:", error);
        });
    }
// HEADER AND DISCLAIMER SCROLL

    const header = document.querySelector('.header');
    const bannerHeight = document.querySelector('.section-banner').offsetHeight;
    const fixedBlock = document.querySelector('.disclaimer_main');

    const targetSection = document.querySelector('#sectionHotBg');

    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    const targetSectionOffsetTop = targetSection ? targetSection.offsetTop : 0;
    const targetSectionHeight = targetSection ? targetSection.offsetHeight : 0;

    let lastScrollY = window.scrollY;
    let isHeaderHidden = false;

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        let lastScrollY = window.scrollY > 200 ? window.scrollY : 200;

        if (scrollPosition > lastScrollY && !isHeaderHidden) {
            header.classList.add('hidden');
            isHeaderHidden = true;
        } else if (scrollPosition < lastScrollY && isHeaderHidden) {
            header.classList.remove('hidden');
            isHeaderHidden = false;
        }
        if (scrollPosition > (bannerHeight - 48)) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }

        if (scrollPosition >= targetSectionOffsetTop && scrollPosition < targetSectionOffsetTop + targetSectionHeight) {
            header.classList.remove('scroll');
        } else if (scrollPosition >= bannerHeight - 48) {
            header.classList.add('scroll');
        }

        if (fixedBlock) {
            if (scrollPosition > 0) {
                fixedBlock.classList.add('scroll');
            } else {
                fixedBlock.classList.remove('scroll');
            }

            if (window.scrollY + viewportHeight >= documentHeight) {
                fixedBlock.classList.remove('scroll');
            }
        }
        lastScrollY = scrollPosition;
    });

// CHANGED BG CARD BTN HOVER
    const bgChangeButtons = document.querySelectorAll('.bg-change');
    if (document.querySelector('.bg-change')) {
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
    }

//CARD-HOT HIDE
    const cpHot = document.querySelector('.card-product_hot');
    const btnScScroll = document.querySelector('.btn-hot');
    const overlay = document.querySelector('.overlay');
    const productLink = document.querySelector('.card-product__link');

    if (document.querySelector('.card-product_hot')) {
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
        productLink.addEventListener('click', function (e) {
            cpHot.classList.remove('show');
            btnScScroll.classList.remove('show');
            overlay.classList.remove('show');
        });
    }

//SLIDER FEATURES
    if (document.querySelector('.slider-features')) {
        const sliderFeatures = new Swiper('.slider-features ', {
            spaceBetween: 24,

            speed: 1500,
            pagination: {
                el: '.slider-features .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.slider-features .swiper-button-next',
                prevEl: '.slider-features .swiper-button-prev',
            },
            breakpoints: {
                568: {
                    slidesPerView: 'auto',
                }
            }
        });
    }
//SLIDERS
    let sliderProducts;
    let sliderPurpose;
    let cardListSlider;
    let appSlider;

    const identicalSwiperIds = ['#sliderDosage1', '#sliderDosage2', '#sliderDosage3'];
    let identicalSwipers = [];

    function initSwipers() {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 1023) {
            if (!sliderProducts) {
                sliderProducts = new Swiper('.slider-products', {
                    spaceBetween: 24,
                    breakpoints: {
                        1023: {
                            slidesPerView: 2,
                        }
                    },
                    pagination: {
                        el: '.slider-products .swiper-pagination',
                        clickable: true,
                    },
                });
            }
            if (!cardListSlider) {
                cardListSlider = new Swiper('.card-slider', {
                    spaceBetween: 24,
                    pagination: {
                        el: '.card-slider .swiper-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        568: {
                            slidesPerView: 'auto',
                        }
                    }
                });
            }
            if (!sliderPurpose) {
                sliderPurpose = new Swiper('.slider-purpose', {
                    slidesPerView: 1,
                    spaceBetween: 24,
                    pagination: {
                        el: '.slider-purpose .swiper-pagination',
                        clickable: true,
                    },
                });
            }
            if (!appSlider) {
                appSlider = new Swiper('.app-slider', {
                    spaceBetween: 24,
                    breakpoints: {
                        568: {
                            slidesPerView: 'auto',
                        }
                    },
                    pagination: {
                        el: '.app-slider .swiper-pagination',
                        clickable: true,
                    },
                });
            }
        } else {
            if (sliderProducts) {
                sliderProducts.destroy(true, true);
                sliderProducts = null;
            }
            if (cardListSlider) {
                cardListSlider.destroy(true, true);
                cardListSlider = null;
            }
            if (sliderPurpose) {
                sliderPurpose.destroy(true, true);
                sliderPurpose = null;
            }
            if (appSlider) {
                appSlider.destroy(true, true);
                appSlider = null;
            }
        }

        if (screenWidth <= 567) {
            if (identicalSwipers.length === 0) {
                identicalSwiperIds.forEach(id => {
                    const swiper = new Swiper(id, {
                        spaceBetween: 24,
                        pagination: {
                            el: `${id} .swiper-pagination`,
                            clickable: true,
                        },
                    });
                    identicalSwipers.push(swiper);
                });
            }
        } else {
            identicalSwipers.forEach(swiper => swiper && swiper.destroy(true, true));
            identicalSwipers = [];
        }
    }

    initSwipers();
    window.addEventListener('resize', initSwipers);


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

//HIDE-SHOW TEXT PAGE HOT
    const btnsMore = document.querySelectorAll('.composition__card .more-btn');
    const cards = document.querySelectorAll('.composition__card');
    btnsMore.forEach((btn) => {
        btn.addEventListener('click', function () {
            const hideCardText = this.parentElement.querySelector(' .hide-text');
            if (window.innerWidth < 1024) {
                if (hideCardText) {
                    hideCardText.classList.toggle('open-text');
                    this.textContent = hideCardText.classList.contains('open-text') ? "Згорнути інформацію" : "Детальна інформація";
                }
                window.addEventListener('scroll', () => {
                    cards.forEach((card, index) => {
                        const rect = card.getBoundingClientRect();
                        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                            cards.forEach((otherCard, otherIndex) => {
                                if (otherIndex !== index) {
                                    const otherText = otherCard.querySelector('.hide-text');
                                    if (otherText && otherText.classList.contains('open-text')) {
                                        otherText.classList.remove('open-text');
                                        const otherBtn = otherCard.querySelector('.more-btn');
                                        if (otherBtn) otherBtn.textContent = "Детальна інформація";
                                    }
                                }
                            });
                        }
                    });
                });
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

// ANIMATION BLOCKS SECTION ACTION
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

//BTN-UP
    (function () {

        function trackScroll() {
            let scrolled = window.pageYOffset;
            let coords = document.documentElement.clientHeight;

            if (scrolled > coords) {
                goTopBtn.classList.add('show');
            }
            if (scrolled < coords) {
                goTopBtn.classList.remove('show');
            }
        }

        function backToTop() {
            if (window.pageYOffset > 0) {
                window.scrollBy(0, -80);
                setTimeout(backToTop, 0);
            }
        }

        const goTopBtn = document.querySelector('.btn_up');

        window.addEventListener('scroll', trackScroll);
        goTopBtn.addEventListener('click', backToTop);
    })();


});






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rOm5vdCgubWVudV9faXRlbS5kcm9wZG93biAubWVudV9fbGluayknKTtcclxuICAgIGNvbnN0IHN1Yk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdWItbWVudV9fbGluaycpO1xyXG4gICAgY29uc3Qgc3ViTWVudVRvZ2dsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9faXRlbS5kcm9wZG93biAuc3ViLW1lbnVfX3RvZ2dsZScpO1xyXG4gICAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2l0ZW0uZHJvcGRvd24nKTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH0sIDI1MCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCBiYWNrZHJvcCwgLi4ubWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViLW1lbnVfX3RvZ2dsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ3N1Yi1tZW51X190b2dnbGVfYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vIFNVQi1NRU5VIFRPR0dMRVxyXG4gICAgc3ViTWVudVRvZ2dsZXMuZm9yRWFjaChmdW5jdGlvbiAodG9nZ2xlKSB7XHJcbiAgICAgICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVG9nZ2xlIGNsaWNrZWQ6JywgdG9nZ2xlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gdG9nZ2xlLmNsYXNzTGlzdC5jb250YWlucygnc3ViLW1lbnVfX3RvZ2dsZV9hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdWItbWVudV9fdG9nZ2xlX2FjdGl2ZScpLmZvckVhY2goZnVuY3Rpb24gKGFjdGl2ZVRvZ2dsZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZVRvZ2dsZSAhPT0gdG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVG9nZ2xlLmNsYXNzTGlzdC5yZW1vdmUoJ3N1Yi1tZW51X190b2dnbGVfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGUuY2xhc3NMaXN0LnJlbW92ZSgnc3ViLW1lbnVfX3RvZ2dsZV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZS5uZXh0RWxlbWVudFNpYmxpbmcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZS5jbGFzc0xpc3QuYWRkKCdzdWItbWVudV9fdG9nZ2xlX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlLm5leHRFbGVtZW50U2libGluZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc3ViTWVudUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8g0JfRg9C/0LjQvdGP0ZTQvNC+INGB0L/Qu9C40LLQsNC90L3RjyDQv9C+0LTRltGXXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWJtZW51IGxpbmsgY2xpY2tlZDonLCBsaW5rKTtcclxuXHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdWItbWVudV9fdG9nZ2xlX2FjdGl2ZScpLmZvckVhY2goZnVuY3Rpb24gKGFjdGl2ZVRvZ2dsZSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlVG9nZ2xlLmNsYXNzTGlzdC5yZW1vdmUoJ3N1Yi1tZW51X190b2dnbGVfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWVudUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ01lbnUgaXRlbSBjbGlja2VkOicsIGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9nZ2xlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuc3ViLW1lbnVfX3RvZ2dsZScpO1xyXG4gICAgICAgICAgICBpZiAodG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGUuY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gU0NST0xMIFRPIEFOQ0hPUlxyXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsVG9BbmNob3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvci5zdGFydHNXaXRoKCcjJykgJiYgYW5jaG9yICE9PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldEVsZW1lbnQub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5tZW51X19pdGVtIGEnKTtcclxuICAgIHNtb290aFNjcm9sbFRvQW5jaG9yKCcuc3ViLW1lbnVfX2l0ZW0gYScpO1xyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5jYXJkLXByb2R1Y3RfX2xpbmstd3JhcCBhJyk7XHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLnNlY3Rpb24tYmFubmVyIC5idG5fc3Ryb2tlJyk7XHJcblxyXG5cclxuLy8g0J/RltC00LrQu9GO0YfQtdC90L3RjyDQtNC+INC80LXQvdGOINC00LvRjyDRgNC+0LHQvtGC0Lgg0L3QsCDRgtGW0Lkg0YHQsNC80ZbQuSDRgdGC0L7RgNGW0L3RhtGWXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvckNhcmQoc2VsZWN0b3IsIG9mZnNldCA9IDApIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldElkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3BQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFkgLSBvZmZzZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3BQb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuLy8g0JLQuNC60LvQuNC6INC00LvRjyDQtdC70LXQvNC10L3RgtGW0LIg0ZbQtyDQsNGC0YDQuNCx0YPRgtC+0LwgZGF0YS1zY3JvbGxcclxuICAgIHNtb290aFNjcm9sbFRvQW5jaG9yQ2FyZCgnW2RhdGEtc2Nyb2xsXScsIDkwKTtcclxuXHJcbi8vIFZJREVPIElQSE9ORVxyXG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhY2tncm91bmQtdmlkZW9cIik7XHJcbiAgICBpZiAodmlkZW8pIHtcclxuICAgICAgICB2aWRlby5wbGF5KCkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLQkNCy0YLQvtCy0ZbQtNGC0LLQvtGA0LXQvdC90Y8g0L3QtSDQstC00LDQu9C+0YHRjzpcIiwgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4vLyBIRUFERVIgQU5EIERJU0NMQUlNRVIgU0NST0xMXHJcblxyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYmFubmVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tYmFubmVyJykub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3QgZml4ZWRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNjbGFpbWVyX21haW4nKTtcclxuXHJcbiAgICBjb25zdCB0YXJnZXRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY3Rpb25Ib3RCZycpO1xyXG5cclxuICAgIGNvbnN0IGRvY3VtZW50SGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodDtcclxuICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIGNvbnN0IHRhcmdldFNlY3Rpb25PZmZzZXRUb3AgPSB0YXJnZXRTZWN0aW9uID8gdGFyZ2V0U2VjdGlvbi5vZmZzZXRUb3AgOiAwO1xyXG4gICAgY29uc3QgdGFyZ2V0U2VjdGlvbkhlaWdodCA9IHRhcmdldFNlY3Rpb24gPyB0YXJnZXRTZWN0aW9uLm9mZnNldEhlaWdodCA6IDA7XHJcblxyXG4gICAgbGV0IGxhc3RTY3JvbGxZID0gd2luZG93LnNjcm9sbFk7XHJcbiAgICBsZXQgaXNIZWFkZXJIaWRkZW4gPSBmYWxzZTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFk7XHJcbiAgICAgICAgbGV0IGxhc3RTY3JvbGxZID0gd2luZG93LnNjcm9sbFkgPiAyMDAgPyB3aW5kb3cuc2Nyb2xsWSA6IDIwMDtcclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID4gbGFzdFNjcm9sbFkgJiYgIWlzSGVhZGVySGlkZGVuKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgaXNIZWFkZXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsUG9zaXRpb24gPCBsYXN0U2Nyb2xsWSAmJiBpc0hlYWRlckhpZGRlbikge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIGlzSGVhZGVySGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+IChiYW5uZXJIZWlnaHQgLSA0OCkpIHtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3Njcm9sbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+PSB0YXJnZXRTZWN0aW9uT2Zmc2V0VG9wICYmIHNjcm9sbFBvc2l0aW9uIDwgdGFyZ2V0U2VjdGlvbk9mZnNldFRvcCArIHRhcmdldFNlY3Rpb25IZWlnaHQpIHtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsUG9zaXRpb24gPj0gYmFubmVySGVpZ2h0IC0gNDgpIHtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3Njcm9sbCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZpeGVkQmxvY2spIHtcclxuICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZml4ZWRCbG9jay5jbGFzc0xpc3QuYWRkKCdzY3JvbGwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSArIHZpZXdwb3J0SGVpZ2h0ID49IGRvY3VtZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RTY3JvbGxZID0gc2Nyb2xsUG9zaXRpb247XHJcbiAgICB9KTtcclxuXHJcbi8vIENIQU5HRUQgQkcgQ0FSRCBCVE4gSE9WRVJcclxuICAgIGNvbnN0IGJnQ2hhbmdlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iZy1jaGFuZ2UnKTtcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmctY2hhbmdlJykpIHtcclxuICAgICAgICBiZ0NoYW5nZUJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FyZCA9IGJ1dHRvbi5jbG9zZXN0KCcuY2FyZC1wcm9kdWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2JnLXNob3cnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBidXR0b24uY2xvc2VzdCgnLmNhcmQtcHJvZHVjdCcpO1xyXG4gICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdiZy1zaG93Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuLy9DQVJELUhPVCBISURFXHJcbiAgICBjb25zdCBjcEhvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLXByb2R1Y3RfaG90Jyk7XHJcbiAgICBjb25zdCBidG5TY1Njcm9sbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4taG90Jyk7XHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcclxuICAgIGNvbnN0IHByb2R1Y3RMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtcHJvZHVjdF9fbGluaycpO1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1wcm9kdWN0X2hvdCcpKSB7XHJcbiAgICAgICAgYnRuU2NTY3JvbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNwSG90LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYnRuU2NTY3JvbGwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjcEhvdC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJ0blNjU2Nyb2xsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJvZHVjdExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjcEhvdC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJ0blNjU2Nyb2xsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4vL1NMSURFUiBGRUFUVVJFU1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItZmVhdHVyZXMnKSkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlckZlYXR1cmVzID0gbmV3IFN3aXBlcignLnNsaWRlci1mZWF0dXJlcyAnLCB7XHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogMTUwMCxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLWZlYXR1cmVzIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogJy5zbGlkZXItZmVhdHVyZXMgLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6ICcuc2xpZGVyLWZlYXR1cmVzIC5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgNTY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbi8vU0xJREVSU1xyXG4gICAgbGV0IHNsaWRlclByb2R1Y3RzO1xyXG4gICAgbGV0IHNsaWRlclB1cnBvc2U7XHJcbiAgICBsZXQgY2FyZExpc3RTbGlkZXI7XHJcbiAgICBsZXQgYXBwU2xpZGVyO1xyXG5cclxuICAgIGNvbnN0IGlkZW50aWNhbFN3aXBlcklkcyA9IFsnI3NsaWRlckRvc2FnZTEnLCAnI3NsaWRlckRvc2FnZTInLCAnI3NsaWRlckRvc2FnZTMnXTtcclxuICAgIGxldCBpZGVudGljYWxTd2lwZXJzID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFN3aXBlcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgaWYgKHNjcmVlbldpZHRoIDw9IDEwMjMpIHtcclxuICAgICAgICAgICAgaWYgKCFzbGlkZXJQcm9kdWN0cykge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyUHJvZHVjdHMgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLXByb2R1Y3RzJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMTAyMzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItcHJvZHVjdHMgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWNhcmRMaXN0U2xpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdFNsaWRlciA9IG5ldyBTd2lwZXIoJy5jYXJkLXNsaWRlcicsIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWw6ICcuY2FyZC1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgNTY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNsaWRlclB1cnBvc2UpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclB1cnBvc2UgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLXB1cnBvc2UnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLXB1cnBvc2UgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWFwcFNsaWRlcikge1xyXG4gICAgICAgICAgICAgICAgYXBwU2xpZGVyID0gbmV3IFN3aXBlcignLmFwcC1zbGlkZXInLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA1Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbDogJy5hcHAtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc2xpZGVyUHJvZHVjdHMpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclByb2R1Y3RzLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJQcm9kdWN0cyA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhcmRMaXN0U2xpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdFNsaWRlci5kZXN0cm95KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgY2FyZExpc3RTbGlkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzbGlkZXJQdXJwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJQdXJwb3NlLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJQdXJwb3NlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXBwU2xpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBhcHBTbGlkZXIuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGFwcFNsaWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzY3JlZW5XaWR0aCA8PSA1NjcpIHtcclxuICAgICAgICAgICAgaWYgKGlkZW50aWNhbFN3aXBlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZGVudGljYWxTd2lwZXJJZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihpZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbDogYCR7aWR9IC5zd2lwZXItcGFnaW5hdGlvbmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpY2FsU3dpcGVycy5wdXNoKHN3aXBlcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlkZW50aWNhbFN3aXBlcnMuZm9yRWFjaChzd2lwZXIgPT4gc3dpcGVyICYmIHN3aXBlci5kZXN0cm95KHRydWUsIHRydWUpKTtcclxuICAgICAgICAgICAgaWRlbnRpY2FsU3dpcGVycyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0U3dpcGVycygpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluaXRTd2lwZXJzKTtcclxuXHJcblxyXG4vL0hJREUtU0hPVyBURVhUXHJcbiAgICBjb25zdCBidG5zU2VlTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWUtbW9yZScpO1xyXG5cclxuICAgIGJ0bnNTZWVNb3JlLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgaGlkZVRleHQgPSB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmhpZGUtdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGhpZGVUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBoaWRlVGV4dC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuLXRleHQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBoaWRlVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4tdGV4dCcpID8gXCLQl9Cz0L7RgNC90YPRgtC4INGW0L3RhNC+0YDQvNCw0YbRltGOXCIgOiBcItCR0ZbQu9GM0YjQtSDRltC90YTQvtGA0LzQsNGG0ZbRl1wiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vL0hJREUtU0hPVyBURVhUIFBBR0UgSE9UXHJcbiAgICBjb25zdCBidG5zTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wb3NpdGlvbl9fY2FyZCAubW9yZS1idG4nKTtcclxuICAgIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXBvc2l0aW9uX19jYXJkJyk7XHJcbiAgICBidG5zTW9yZS5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhpZGVDYXJkVGV4dCA9IHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcgLmhpZGUtdGV4dCcpO1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCAxMDI0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGlkZUNhcmRUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZUNhcmRUZXh0LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4tdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBoaWRlQ2FyZFRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuLXRleHQnKSA/IFwi0JfQs9C+0YDQvdGD0YLQuCDRltC90YTQvtGA0LzQsNGG0ZbRjlwiIDogXCLQlNC10YLQsNC70YzQvdCwINGW0L3RhNC+0YDQvNCw0YbRltGPXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRzLmZvckVhY2goKGNhcmQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBjYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjdC50b3AgPj0gMCAmJiByZWN0LnRvcCA8IHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRzLmZvckVhY2goKG90aGVyQ2FyZCwgb3RoZXJJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlckluZGV4ICE9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlclRleHQgPSBvdGhlckNhcmQucXVlcnlTZWxlY3RvcignLmhpZGUtdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJUZXh0ICYmIG90aGVyVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4tdGV4dCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlclRleHQuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbi10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlckJ0biA9IG90aGVyQ2FyZC5xdWVyeVNlbGVjdG9yKCcubW9yZS1idG4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlckJ0bikgb3RoZXJCdG4udGV4dENvbnRlbnQgPSBcItCU0LXRgtCw0LvRjNC90LAg0ZbQvdGE0L7RgNC80LDRhtGW0Y9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vL1NMSURFUi1BQ0NPUkRJT05cclxuICAgIGNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZS1wdXJwb3NlJyk7XHJcblxyXG4gICAgc2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiB7XHJcbiAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMDI0KSB7XHJcbiAgICAgICAgICAgICAgICBleHBhbmQoc2xpZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBleHBhbmQodGFyZ2V0KSB7XHJcbiAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGFyZ2V0LnBhcmVudE5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2V4cGFuZGVkJyk7XHJcbiAgICB9XHJcblxyXG4vLyBBTklNQVRJT04gQkxPQ0tTIFNFQ1RJT04gQUNUSU9OXHJcbiAgICBjb25zdCBibG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aW9uX19pdGVtJyk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICBsZXQgY2xvc2VzdEJsb2NrID0gbnVsbDtcclxuICAgICAgICBsZXQgY2xvc2VzdERpc3RhbmNlID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIGJsb2Nrcy5mb3JFYWNoKChibG9jaykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gYmxvY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pZGRsZU9mU2NyZWVuID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgY29uc3QgZGlzdGFuY2VUb01pZGRsZSA9IE1hdGguYWJzKHJlY3QudG9wIC0gbWlkZGxlT2ZTY3JlZW4pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlVG9NaWRkbGUgPCBjbG9zZXN0RGlzdGFuY2UgJiYgcmVjdC50b3AgPCBtaWRkbGVPZlNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VzdERpc3RhbmNlID0gZGlzdGFuY2VUb01pZGRsZTtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3RCbG9jayA9IGJsb2NrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGJsb2Nrcy5mb3JFYWNoKGIgPT4gYi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JykpO1xyXG4gICAgICAgIGlmIChjbG9zZXN0QmxvY2spIHtcclxuICAgICAgICAgICAgY2xvc2VzdEJsb2NrLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbi8vQlROLVVQXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFja1Njcm9sbCgpIHtcclxuICAgICAgICAgICAgbGV0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICBsZXQgY29vcmRzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxlZCA+IGNvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgZ29Ub3BCdG4uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxlZCA8IGNvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgZ29Ub3BCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBiYWNrVG9Ub3AoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgLTgwKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYmFja1RvVG9wLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZ29Ub3BCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3VwJyk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0cmFja1Njcm9sbCk7XHJcbiAgICAgICAgZ29Ub3BCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiYWNrVG9Ub3ApO1xyXG4gICAgfSkoKTtcclxuXHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
