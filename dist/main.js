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
    const menuLinks = document.querySelectorAll('.menu__link');
    const subMenuLinks = document.querySelectorAll('.sub-menu__link');
    const subMenuToggles = document.querySelectorAll('.sub-menu__toggle');
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

    subMenuToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('sub-menu__toggle_active');
        });
    });
    subMenuLinks.forEach(function (el) {
        el.addEventListener('click', function () {
            nav.classList.remove('open');
            backdrop.style.display = 'none';
            body.classList.remove('disable-scroll');
            document.querySelector('.sub-menu__toggle').classList.remove('sub-menu__toggle_active');
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
                    event.preventDefault();

                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
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
    const bannerHeight =document.querySelector('.section-banner').offsetHeight;
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






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7XHJcbiAgICBjb25zdCBzdWJNZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3ViLW1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IHN1Yk1lbnVUb2dnbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN1Yi1tZW51X190b2dnbGUnKTtcclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG4gICAgYnRuQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXHJcbiAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfSwgMjUwKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBbYnRuQ2xvc2UsIGJhY2tkcm9wLCAuLi5tZW51TGlua3NdLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWItbWVudV9fdG9nZ2xlJykuY2xhc3NMaXN0LnJlbW92ZSgnc3ViLW1lbnVfX3RvZ2dsZV9hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHN1Yk1lbnVUb2dnbGVzLmZvckVhY2goZnVuY3Rpb24gKHRvZ2dsZSkge1xyXG4gICAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoJ3N1Yi1tZW51X190b2dnbGVfYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHN1Yk1lbnVMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWItbWVudV9fdG9nZ2xlJykuY2xhc3NMaXN0LnJlbW92ZSgnc3ViLW1lbnVfX3RvZ2dsZV9hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy8gU0NST0xMIFRPIEFOQ0hPUlxyXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsVG9BbmNob3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvci5zdGFydHNXaXRoKCcjJykgJiYgYW5jaG9yICE9PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldEVsZW1lbnQub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5tZW51X19pdGVtIGEnKTtcclxuICAgIHNtb290aFNjcm9sbFRvQW5jaG9yKCcuc3ViLW1lbnVfX2l0ZW0gYScpO1xyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5jYXJkLXByb2R1Y3RfX2xpbmstd3JhcCBhJyk7XHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLnNlY3Rpb24tYmFubmVyIC5idG5fc3Ryb2tlJyk7XHJcblxyXG5cclxuLy8g0J/RltC00LrQu9GO0YfQtdC90L3RjyDQtNC+INC80LXQvdGOINC00LvRjyDRgNC+0LHQvtGC0Lgg0L3QsCDRgtGW0Lkg0YHQsNC80ZbQuSDRgdGC0L7RgNGW0L3RhtGWXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvckNhcmQoc2VsZWN0b3IsIG9mZnNldCA9IDApIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldElkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvcFBvc2l0aW9uID0gdGFyZ2V0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWSAtIG9mZnNldDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcFBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4vLyDQktC40LrQu9C40Log0LTQu9GPINC10LvQtdC80LXQvdGC0ZbQsiDRltC3INCw0YLRgNC40LHRg9GC0L7QvCBkYXRhLXNjcm9sbFxyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3JDYXJkKCdbZGF0YS1zY3JvbGxdJywgOTApO1xyXG5cclxuXHJcbi8vIEhFQURFUiBBTkQgRElTQ0xBSU1FUiBTQ1JPTExcclxuXHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCBiYW5uZXJIZWlnaHQgPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLWJhbm5lcicpLm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IGZpeGVkQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlzY2xhaW1lcl9tYWluJyk7XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWN0aW9uSG90QmcnKTtcclxuXHJcbiAgICBjb25zdCBkb2N1bWVudEhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICBjb25zdCB0YXJnZXRTZWN0aW9uT2Zmc2V0VG9wID0gdGFyZ2V0U2VjdGlvbiA/IHRhcmdldFNlY3Rpb24ub2Zmc2V0VG9wIDogMDtcclxuICAgIGNvbnN0IHRhcmdldFNlY3Rpb25IZWlnaHQgPSB0YXJnZXRTZWN0aW9uID8gdGFyZ2V0U2VjdGlvbi5vZmZzZXRIZWlnaHQgOiAwO1xyXG5cclxuICAgIGxldCBsYXN0U2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgbGV0IGlzSGVhZGVySGlkZGVuID0gZmFsc2U7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xyXG5cclxuICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPiBsYXN0U2Nyb2xsWSAmJiAhaXNIZWFkZXJIaWRkZW4pIHtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBpc0hlYWRlckhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzY3JvbGxQb3NpdGlvbiA8IGxhc3RTY3JvbGxZICYmIGlzSGVhZGVySGlkZGVuKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgaXNIZWFkZXJIaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID4gKGJhbm5lckhlaWdodCAtIDQ4KSkge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID49IHRhcmdldFNlY3Rpb25PZmZzZXRUb3AgJiYgc2Nyb2xsUG9zaXRpb24gPCB0YXJnZXRTZWN0aW9uT2Zmc2V0VG9wICsgdGFyZ2V0U2VjdGlvbkhlaWdodCkge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzY3JvbGxQb3NpdGlvbiA+PSBiYW5uZXJIZWlnaHQgLSA0OCkge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZml4ZWRCbG9jaykge1xyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPiAoYmFubmVySGVpZ2h0IC0gNDgpKSB7XHJcbiAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLmNsYXNzTGlzdC5hZGQoJ3Njcm9sbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZml4ZWRCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZICsgdmlld3BvcnRIZWlnaHQgPj0gZG9jdW1lbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdFNjcm9sbFkgPSBzY3JvbGxQb3NpdGlvbjtcclxuICAgIH0pO1xyXG5cclxuLy8gQ0hBTkdFRCBCRyBDQVJEIEJUTiBIT1ZFUlxyXG4gICAgY29uc3QgYmdDaGFuZ2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJnLWNoYW5nZScpO1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1jaGFuZ2UnKSkge1xyXG4gICAgICAgIGJnQ2hhbmdlQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkID0gYnV0dG9uLmNsb3Nlc3QoJy5jYXJkLXByb2R1Y3QnKTtcclxuICAgICAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnYmctc2hvdycpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FyZCA9IGJ1dHRvbi5jbG9zZXN0KCcuY2FyZC1wcm9kdWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2JnLXNob3cnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4vL0NBUkQtSE9UIEhJREVcclxuICAgIGNvbnN0IGNwSG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtcHJvZHVjdF9ob3QnKTtcclxuICAgIGNvbnN0IGJ0blNjU2Nyb2xsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1ob3QnKTtcclxuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xyXG4gICAgY29uc3QgcHJvZHVjdExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1wcm9kdWN0X19saW5rJyk7XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLXByb2R1Y3RfaG90JykpIHtcclxuICAgICAgICBidG5TY1Njcm9sbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY3BIb3QuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICBidG5TY1Njcm9sbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNwSG90LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYnRuU2NTY3JvbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwcm9kdWN0TGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNwSG90LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYnRuU2NTY3JvbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbi8vU0xJREVSIEZFQVRVUkVTXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1mZWF0dXJlcycpKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyRmVhdHVyZXMgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWZlYXR1cmVzICcsIHtcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiAxNTAwLFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItZmVhdHVyZXMgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiAnLnNsaWRlci1mZWF0dXJlcyAuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogJy5zbGlkZXItZmVhdHVyZXMgLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuLy9TTElERVJTXHJcbiAgICBsZXQgc2xpZGVyUHJvZHVjdHM7XHJcbiAgICBsZXQgc2xpZGVyUHVycG9zZTtcclxuICAgIGxldCBjYXJkTGlzdFNsaWRlcjtcclxuICAgIGxldCBhcHBTbGlkZXI7XHJcblxyXG4gICAgY29uc3QgaWRlbnRpY2FsU3dpcGVySWRzID0gWycjc2xpZGVyRG9zYWdlMScsICcjc2xpZGVyRG9zYWdlMicsICcjc2xpZGVyRG9zYWdlMyddO1xyXG4gICAgbGV0IGlkZW50aWNhbFN3aXBlcnMgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U3dpcGVycygpIHtcclxuICAgICAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuICAgICAgICBpZiAoc2NyZWVuV2lkdGggPD0gMTAyMykge1xyXG4gICAgICAgICAgICBpZiAoIXNsaWRlclByb2R1Y3RzKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJQcm9kdWN0cyA9IG5ldyBTd2lwZXIoJy5zbGlkZXItcHJvZHVjdHMnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAxMDIzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci1wcm9kdWN0cyAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghY2FyZExpc3RTbGlkZXIpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0U2xpZGVyID0gbmV3IFN3aXBlcignLmNhcmQtc2xpZGVyJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbDogJy5jYXJkLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA1Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc2xpZGVyUHVycG9zZSkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyUHVycG9zZSA9IG5ldyBTd2lwZXIoJy5zbGlkZXItcHVycG9zZScsIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItcHVycG9zZSAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghYXBwU2xpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBhcHBTbGlkZXIgPSBuZXcgU3dpcGVyKCcuYXBwLXNsaWRlcicsIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDU2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsOiAnLmFwcC1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChzbGlkZXJQcm9kdWN0cykge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyUHJvZHVjdHMuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlclByb2R1Y3RzID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2FyZExpc3RTbGlkZXIpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0U2xpZGVyLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdFNsaWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNsaWRlclB1cnBvc2UpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclB1cnBvc2UuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlclB1cnBvc2UgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhcHBTbGlkZXIpIHtcclxuICAgICAgICAgICAgICAgIGFwcFNsaWRlci5kZXN0cm95KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYXBwU2xpZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNjcmVlbldpZHRoIDw9IDU2Nykge1xyXG4gICAgICAgICAgICBpZiAoaWRlbnRpY2FsU3dpcGVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlkZW50aWNhbFN3aXBlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKGlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsOiBgJHtpZH0gLnN3aXBlci1wYWdpbmF0aW9uYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZGVudGljYWxTd2lwZXJzLnB1c2goc3dpcGVyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWRlbnRpY2FsU3dpcGVycy5mb3JFYWNoKHN3aXBlciA9PiBzd2lwZXIgJiYgc3dpcGVyLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICBpZGVudGljYWxTd2lwZXJzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRTd2lwZXJzKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5pdFN3aXBlcnMpO1xyXG5cclxuXHJcbi8vSElERS1TSE9XIFRFWFRcclxuICAgIGNvbnN0IGJ0bnNTZWVNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlZS1tb3JlJyk7XHJcblxyXG4gICAgYnRuc1NlZU1vcmUuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBoaWRlVGV4dCA9IHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaGlkZS10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaGlkZVRleHQpIHtcclxuICAgICAgICAgICAgICAgIGhpZGVUZXh0LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4tdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IGhpZGVUZXh0LmNsYXNzTGlzdC5jb250YWlucygnb3Blbi10ZXh0JykgPyBcItCX0LPQvtGA0L3Rg9GC0Lgg0ZbQvdGE0L7RgNC80LDRhtGW0Y5cIiA6IFwi0JHRltC70YzRiNC1INGW0L3RhNC+0YDQvNCw0YbRltGXXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vSElERS1TSE9XIFRFWFQgUEFHRSBIT1RcclxuICAgIGNvbnN0IGJ0bnNNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXBvc2l0aW9uX19jYXJkIC5tb3JlLWJ0bicpO1xyXG4gICAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcG9zaXRpb25fX2NhcmQnKTtcclxuICAgIGJ0bnNNb3JlLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgaGlkZUNhcmRUZXh0ID0gdGhpcy5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyAuaGlkZS10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDEwMjQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoaWRlQ2FyZFRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBoaWRlQ2FyZFRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnb3Blbi10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IGhpZGVDYXJkVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4tdGV4dCcpID8gXCLQl9Cz0L7RgNC90YPRgtC4INGW0L3RhNC+0YDQvNCw0YbRltGOXCIgOiBcItCU0LXRgtCw0LvRjNC90LAg0ZbQvdGE0L7RgNC80LDRhtGW0Y9cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZHMuZm9yRWFjaCgoY2FyZCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IGNhcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWN0LnRvcCA+PSAwICYmIHJlY3QudG9wIDwgd2luZG93LmlubmVySGVpZ2h0IC8gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZHMuZm9yRWFjaCgob3RoZXJDYXJkLCBvdGhlckluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVySW5kZXggIT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyVGV4dCA9IG90aGVyQ2FyZC5xdWVyeVNlbGVjdG9yKCcuaGlkZS10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlclRleHQgJiYgb3RoZXJUZXh0LmNsYXNzTGlzdC5jb250YWlucygnb3Blbi10ZXh0JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuLXRleHQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyQnRuID0gb3RoZXJDYXJkLnF1ZXJ5U2VsZWN0b3IoJy5tb3JlLWJ0bicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyQnRuKSBvdGhlckJ0bi50ZXh0Q29udGVudCA9IFwi0JTQtdGC0LDQu9GM0L3QsCDRltC90YTQvtGA0LzQsNGG0ZbRj1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vU0xJREVSLUFDQ09SRElPTlxyXG4gICAgY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlLXB1cnBvc2UnKTtcclxuXHJcbiAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IHtcclxuICAgICAgICBzbGlkZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDEwMjQpIHtcclxuICAgICAgICAgICAgICAgIGV4cGFuZChzbGlkZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV4cGFuZCh0YXJnZXQpIHtcclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0YXJnZXQucGFyZW50Tm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZXhwYW5kZWQnKTtcclxuICAgIH1cclxuXHJcbi8vIEFOSU1BVElPTiBCTE9DS1MgU0VDVElPTiBBQ1RJT05cclxuICAgIGNvbnN0IGJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpb25fX2l0ZW0nKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjbG9zZXN0QmxvY2sgPSBudWxsO1xyXG4gICAgICAgIGxldCBjbG9zZXN0RGlzdGFuY2UgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgYmxvY2tzLmZvckVhY2goKGJsb2NrKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBibG9jay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3QgbWlkZGxlT2ZTY3JlZW4gPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZVRvTWlkZGxlID0gTWF0aC5hYnMocmVjdC50b3AgLSBtaWRkbGVPZlNjcmVlbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2VUb01pZGRsZSA8IGNsb3Nlc3REaXN0YW5jZSAmJiByZWN0LnRvcCA8IG1pZGRsZU9mU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZVRvTWlkZGxlO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VzdEJsb2NrID0gYmxvY2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYmxvY2tzLmZvckVhY2goYiA9PiBiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKSk7XHJcbiAgICAgICAgaWYgKGNsb3Nlc3RCbG9jaykge1xyXG4gICAgICAgICAgICBjbG9zZXN0QmxvY2suY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
