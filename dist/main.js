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
            if (scrollPosition > (bannerHeight - 48)) {
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

});






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rOm5vdCgubWVudV9faXRlbS5kcm9wZG93biAubWVudV9fbGluayknKTtcclxuICAgIGNvbnN0IHN1Yk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdWItbWVudV9fbGluaycpO1xyXG4gICAgY29uc3Qgc3ViTWVudVRvZ2dsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9faXRlbS5kcm9wZG93biAuc3ViLW1lbnVfX3RvZ2dsZScpO1xyXG4gICAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2l0ZW0uZHJvcGRvd24nKTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH0sIDI1MCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCBiYWNrZHJvcCwgLi4ubWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViLW1lbnVfX3RvZ2dsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ3N1Yi1tZW51X190b2dnbGVfYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vIFNVQi1NRU5VIFRPR0dMRVxyXG4gICAgc3ViTWVudVRvZ2dsZXMuZm9yRWFjaChmdW5jdGlvbiAodG9nZ2xlKSB7XHJcbiAgICAgICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVG9nZ2xlIGNsaWNrZWQ6JywgdG9nZ2xlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gdG9nZ2xlLmNsYXNzTGlzdC5jb250YWlucygnc3ViLW1lbnVfX3RvZ2dsZV9hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdWItbWVudV9fdG9nZ2xlX2FjdGl2ZScpLmZvckVhY2goZnVuY3Rpb24gKGFjdGl2ZVRvZ2dsZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZVRvZ2dsZSAhPT0gdG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVG9nZ2xlLmNsYXNzTGlzdC5yZW1vdmUoJ3N1Yi1tZW51X190b2dnbGVfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGUuY2xhc3NMaXN0LnJlbW92ZSgnc3ViLW1lbnVfX3RvZ2dsZV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZS5uZXh0RWxlbWVudFNpYmxpbmcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZS5jbGFzc0xpc3QuYWRkKCdzdWItbWVudV9fdG9nZ2xlX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlLm5leHRFbGVtZW50U2libGluZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc3ViTWVudUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8g0JfRg9C/0LjQvdGP0ZTQvNC+INGB0L/Qu9C40LLQsNC90L3RjyDQv9C+0LTRltGXXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWJtZW51IGxpbmsgY2xpY2tlZDonLCBsaW5rKTtcclxuXHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdWItbWVudV9fdG9nZ2xlX2FjdGl2ZScpLmZvckVhY2goZnVuY3Rpb24gKGFjdGl2ZVRvZ2dsZSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlVG9nZ2xlLmNsYXNzTGlzdC5yZW1vdmUoJ3N1Yi1tZW51X190b2dnbGVfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWVudUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ01lbnUgaXRlbSBjbGlja2VkOicsIGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9nZ2xlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuc3ViLW1lbnVfX3RvZ2dsZScpO1xyXG4gICAgICAgICAgICBpZiAodG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGUuY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gU0NST0xMIFRPIEFOQ0hPUlxyXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsVG9BbmNob3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvci5zdGFydHNXaXRoKCcjJykgJiYgYW5jaG9yICE9PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldEVsZW1lbnQub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5tZW51X19pdGVtIGEnKTtcclxuICAgIHNtb290aFNjcm9sbFRvQW5jaG9yKCcuc3ViLW1lbnVfX2l0ZW0gYScpO1xyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5jYXJkLXByb2R1Y3RfX2xpbmstd3JhcCBhJyk7XHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLnNlY3Rpb24tYmFubmVyIC5idG5fc3Ryb2tlJyk7XHJcblxyXG5cclxuLy8g0J/RltC00LrQu9GO0YfQtdC90L3RjyDQtNC+INC80LXQvdGOINC00LvRjyDRgNC+0LHQvtGC0Lgg0L3QsCDRgtGW0Lkg0YHQsNC80ZbQuSDRgdGC0L7RgNGW0L3RhtGWXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvckNhcmQoc2VsZWN0b3IsIG9mZnNldCA9IDApIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldElkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3BQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFkgLSBvZmZzZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3BQb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuLy8g0JLQuNC60LvQuNC6INC00LvRjyDQtdC70LXQvNC10L3RgtGW0LIg0ZbQtyDQsNGC0YDQuNCx0YPRgtC+0LwgZGF0YS1zY3JvbGxcclxuICAgIHNtb290aFNjcm9sbFRvQW5jaG9yQ2FyZCgnW2RhdGEtc2Nyb2xsXScsIDkwKTtcclxuXHJcblxyXG4vLyBIRUFERVIgQU5EIERJU0NMQUlNRVIgU0NST0xMXHJcblxyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYmFubmVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tYmFubmVyJykub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3QgZml4ZWRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNjbGFpbWVyX21haW4nKTtcclxuXHJcbiAgICBjb25zdCB0YXJnZXRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY3Rpb25Ib3RCZycpO1xyXG5cclxuICAgIGNvbnN0IGRvY3VtZW50SGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodDtcclxuICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIGNvbnN0IHRhcmdldFNlY3Rpb25PZmZzZXRUb3AgPSB0YXJnZXRTZWN0aW9uID8gdGFyZ2V0U2VjdGlvbi5vZmZzZXRUb3AgOiAwO1xyXG4gICAgY29uc3QgdGFyZ2V0U2VjdGlvbkhlaWdodCA9IHRhcmdldFNlY3Rpb24gPyB0YXJnZXRTZWN0aW9uLm9mZnNldEhlaWdodCA6IDA7XHJcblxyXG4gICAgbGV0IGxhc3RTY3JvbGxZID0gd2luZG93LnNjcm9sbFk7XHJcbiAgICBsZXQgaXNIZWFkZXJIaWRkZW4gPSBmYWxzZTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFk7XHJcblxyXG4gICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+IGxhc3RTY3JvbGxZICYmICFpc0hlYWRlckhpZGRlbikge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIGlzSGVhZGVySGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbFBvc2l0aW9uIDwgbGFzdFNjcm9sbFkgJiYgaXNIZWFkZXJIaWRkZW4pIHtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBpc0hlYWRlckhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPiAoYmFubmVySGVpZ2h0IC0gNDgpKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdzY3JvbGwnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPj0gdGFyZ2V0U2VjdGlvbk9mZnNldFRvcCAmJiBzY3JvbGxQb3NpdGlvbiA8IHRhcmdldFNlY3Rpb25PZmZzZXRUb3AgKyB0YXJnZXRTZWN0aW9uSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbFBvc2l0aW9uID49IGJhbm5lckhlaWdodCAtIDQ4KSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdzY3JvbGwnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmaXhlZEJsb2NrKSB7XHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+IChiYW5uZXJIZWlnaHQgLSA0OCkpIHtcclxuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2suY2xhc3NMaXN0LmFkZCgnc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgKyB2aWV3cG9ydEhlaWdodCA+PSBkb2N1bWVudEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgZml4ZWRCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0U2Nyb2xsWSA9IHNjcm9sbFBvc2l0aW9uO1xyXG4gICAgfSk7XHJcblxyXG4vLyBDSEFOR0VEIEJHIENBUkQgQlROIEhPVkVSXHJcbiAgICBjb25zdCBiZ0NoYW5nZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmctY2hhbmdlJyk7XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJnLWNoYW5nZScpKSB7XHJcbiAgICAgICAgYmdDaGFuZ2VCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBidXR0b24uY2xvc2VzdCgnLmNhcmQtcHJvZHVjdCcpO1xyXG4gICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdiZy1zaG93Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkID0gYnV0dG9uLmNsb3Nlc3QoJy5jYXJkLXByb2R1Y3QnKTtcclxuICAgICAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnYmctc2hvdycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbi8vQ0FSRC1IT1QgSElERVxyXG4gICAgY29uc3QgY3BIb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1wcm9kdWN0X2hvdCcpO1xyXG4gICAgY29uc3QgYnRuU2NTY3JvbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWhvdCcpO1xyXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBwcm9kdWN0TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLXByb2R1Y3RfX2xpbmsnKTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtcHJvZHVjdF9ob3QnKSkge1xyXG4gICAgICAgIGJ0blNjU2Nyb2xsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjcEhvdC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJ0blNjU2Nyb2xsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY3BIb3QuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBidG5TY1Njcm9sbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb2R1Y3RMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgY3BIb3QuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBidG5TY1Njcm9sbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuLy9TTElERVIgRkVBVFVSRVNcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWZlYXR1cmVzJykpIHtcclxuICAgICAgICBjb25zdCBzbGlkZXJGZWF0dXJlcyA9IG5ldyBTd2lwZXIoJy5zbGlkZXItZmVhdHVyZXMgJywge1xyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDE1MDAsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci1mZWF0dXJlcyAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6ICcuc2xpZGVyLWZlYXR1cmVzIC5zd2lwZXItYnV0dG9uLW5leHQnLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiAnLnNsaWRlci1mZWF0dXJlcyAuc3dpcGVyLWJ1dHRvbi1wcmV2JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDU2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4vL1NMSURFUlNcclxuICAgIGxldCBzbGlkZXJQcm9kdWN0cztcclxuICAgIGxldCBzbGlkZXJQdXJwb3NlO1xyXG4gICAgbGV0IGNhcmRMaXN0U2xpZGVyO1xyXG4gICAgbGV0IGFwcFNsaWRlcjtcclxuXHJcbiAgICBjb25zdCBpZGVudGljYWxTd2lwZXJJZHMgPSBbJyNzbGlkZXJEb3NhZ2UxJywgJyNzbGlkZXJEb3NhZ2UyJywgJyNzbGlkZXJEb3NhZ2UzJ107XHJcbiAgICBsZXQgaWRlbnRpY2FsU3dpcGVycyA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTd2lwZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcblxyXG4gICAgICAgIGlmIChzY3JlZW5XaWR0aCA8PSAxMDIzKSB7XHJcbiAgICAgICAgICAgIGlmICghc2xpZGVyUHJvZHVjdHMpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclByb2R1Y3RzID0gbmV3IFN3aXBlcignLnNsaWRlci1wcm9kdWN0cycsIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEwMjM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLXByb2R1Y3RzIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFjYXJkTGlzdFNsaWRlcikge1xyXG4gICAgICAgICAgICAgICAgY2FyZExpc3RTbGlkZXIgPSBuZXcgU3dpcGVyKCcuY2FyZC1zbGlkZXInLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsOiAnLmNhcmQtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDU2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzbGlkZXJQdXJwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJQdXJwb3NlID0gbmV3IFN3aXBlcignLnNsaWRlci1wdXJwb3NlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci1wdXJwb3NlIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFhcHBTbGlkZXIpIHtcclxuICAgICAgICAgICAgICAgIGFwcFNsaWRlciA9IG5ldyBTd2lwZXIoJy5hcHAtc2xpZGVyJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgNTY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWw6ICcuYXBwLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHNsaWRlclByb2R1Y3RzKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJQcm9kdWN0cy5kZXN0cm95KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyUHJvZHVjdHMgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYXJkTGlzdFNsaWRlcikge1xyXG4gICAgICAgICAgICAgICAgY2FyZExpc3RTbGlkZXIuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0U2xpZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2xpZGVyUHVycG9zZSkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyUHVycG9zZS5kZXN0cm95KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyUHVycG9zZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFwcFNsaWRlcikge1xyXG4gICAgICAgICAgICAgICAgYXBwU2xpZGVyLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBhcHBTbGlkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2NyZWVuV2lkdGggPD0gNTY3KSB7XHJcbiAgICAgICAgICAgIGlmIChpZGVudGljYWxTd2lwZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWRlbnRpY2FsU3dpcGVySWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWw6IGAke2lkfSAuc3dpcGVyLXBhZ2luYXRpb25gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlkZW50aWNhbFN3aXBlcnMucHVzaChzd2lwZXIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZGVudGljYWxTd2lwZXJzLmZvckVhY2goc3dpcGVyID0+IHN3aXBlciAmJiBzd2lwZXIuZGVzdHJveSh0cnVlLCB0cnVlKSk7XHJcbiAgICAgICAgICAgIGlkZW50aWNhbFN3aXBlcnMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFN3aXBlcnMoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBpbml0U3dpcGVycyk7XHJcblxyXG5cclxuLy9ISURFLVNIT1cgVEVYVFxyXG4gICAgY29uc3QgYnRuc1NlZU1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VlLW1vcmUnKTtcclxuXHJcbiAgICBidG5zU2VlTW9yZS5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhpZGVUZXh0ID0gdGhpcy5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChoaWRlVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgaGlkZVRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnb3Blbi10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gaGlkZVRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuLXRleHQnKSA/IFwi0JfQs9C+0YDQvdGD0YLQuCDRltC90YTQvtGA0LzQsNGG0ZbRjlwiIDogXCLQkdGW0LvRjNGI0LUg0ZbQvdGE0L7RgNC80LDRhtGW0ZdcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy9ISURFLVNIT1cgVEVYVCBQQUdFIEhPVFxyXG4gICAgY29uc3QgYnRuc01vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcG9zaXRpb25fX2NhcmQgLm1vcmUtYnRuJyk7XHJcbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wb3NpdGlvbl9fY2FyZCcpO1xyXG4gICAgYnRuc01vcmUuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBoaWRlQ2FyZFRleHQgPSB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignIC5oaWRlLXRleHQnKTtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgMTAyNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhpZGVDYXJkVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZGVDYXJkVGV4dC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuLXRleHQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gaGlkZUNhcmRUZXh0LmNsYXNzTGlzdC5jb250YWlucygnb3Blbi10ZXh0JykgPyBcItCX0LPQvtGA0L3Rg9GC0Lgg0ZbQvdGE0L7RgNC80LDRhtGW0Y5cIiA6IFwi0JTQtdGC0LDQu9GM0L3QsCDRltC90YTQvtGA0LzQsNGG0ZbRj1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXJkcy5mb3JFYWNoKChjYXJkLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWN0ID0gY2FyZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY3QudG9wID49IDAgJiYgcmVjdC50b3AgPCB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkcy5mb3JFYWNoKChvdGhlckNhcmQsIG90aGVySW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJJbmRleCAhPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJUZXh0ID0gb3RoZXJDYXJkLnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLXRleHQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyVGV4dCAmJiBvdGhlclRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuLXRleHQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJUZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4tdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJCdG4gPSBvdGhlckNhcmQucXVlcnlTZWxlY3RvcignLm1vcmUtYnRuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJCdG4pIG90aGVyQnRuLnRleHRDb250ZW50ID0gXCLQlNC10YLQsNC70YzQvdCwINGW0L3RhNC+0YDQvNCw0YbRltGPXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy9TTElERVItQUNDT1JESU9OXHJcbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGUtcHVycG9zZScpO1xyXG5cclxuICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSkgPT4ge1xyXG4gICAgICAgIHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4gICAgICAgICAgICAgICAgZXhwYW5kKHNsaWRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZXhwYW5kKHRhcmdldCkge1xyXG4gICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRhcmdldC5wYXJlbnROb2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdleHBhbmRlZCcpO1xyXG4gICAgfVxyXG5cclxuLy8gQU5JTUFUSU9OIEJMT0NLUyBTRUNUSU9OIEFDVElPTlxyXG4gICAgY29uc3QgYmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGlvbl9faXRlbScpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3RCbG9jayA9IG51bGw7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3REaXN0YW5jZSA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICBibG9ja3MuZm9yRWFjaCgoYmxvY2spID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IGJsb2NrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBtaWRkbGVPZlNjcmVlbiA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlVG9NaWRkbGUgPSBNYXRoLmFicyhyZWN0LnRvcCAtIG1pZGRsZU9mU2NyZWVuKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZVRvTWlkZGxlIDwgY2xvc2VzdERpc3RhbmNlICYmIHJlY3QudG9wIDwgbWlkZGxlT2ZTY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3REaXN0YW5jZSA9IGRpc3RhbmNlVG9NaWRkbGU7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0QmxvY2sgPSBibG9jaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBibG9ja3MuZm9yRWFjaChiID0+IGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpKTtcclxuICAgICAgICBpZiAoY2xvc2VzdEJsb2NrKSB7XHJcbiAgICAgICAgICAgIGNsb3Nlc3RCbG9jay5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
