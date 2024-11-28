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
    const subMenuLinks = document.querySelectorAll('.sub-menu__link');
    const subMenuToggles = document.querySelectorAll('.sub-menu__toggle');
    const body = document.querySelector('body');

    btnBurger.addEventListener('click', function (e) {
        e.preventDefault();
        nav.classList.add('open');
        backdrop.style.display = 'block';
        btnClose.style.display = 'block';
        body.classList.add('disable-scroll');
    });

    [btnClose, backdrop, ...menuLinks].forEach(function (element) {
        element.addEventListener('click', function () {
            nav.classList.remove('open');
            backdrop.style.display = 'none';
            btnClose.style.display = 'none';
            body.classList.remove('disable-scroll');
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
        })
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


// HEADER AND DISCLAIMER SCROLL

    const header = document.querySelector('.header');
    const fixedBlock = document.querySelector('.disclaimer_main');
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

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
        if (scrollPosition > 100) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }

        if (fixedBlock) {
            if (scrollPosition > 100) {
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
                    breakpoints: {
                        1023: {
                            slidesPerView: 2,
                        }
                    },
                    pagination: {
                        el: '.card-slider .swiper-pagination',
                        clickable: true,
                    },
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
                        1023: {
                            slidesPerView: 2,
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






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2J1cmdlcicpO1xyXG4gICAgY29uc3QgYnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IHN1Yk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdWItbWVudV9fbGluaycpO1xyXG4gICAgY29uc3Qgc3ViTWVudVRvZ2dsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3ViLW1lbnVfX3RvZ2dsZScpO1xyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbiAgICBidG5CdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIFtidG5DbG9zZSwgYmFja2Ryb3AsIC4uLm1lbnVMaW5rc10uZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHN1Yk1lbnVUb2dnbGVzLmZvckVhY2goZnVuY3Rpb24gKHRvZ2dsZSkge1xyXG4gICAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoJ3N1Yi1tZW51X190b2dnbGVfYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHN1Yk1lbnVMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuLy8gU0NST0xMIFRPIEFOQ0hPUlxyXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsVG9BbmNob3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvci5zdGFydHNXaXRoKCcjJykgJiYgYW5jaG9yICE9PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldEVsZW1lbnQub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5tZW51X19pdGVtIGEnKTtcclxuICAgIHNtb290aFNjcm9sbFRvQW5jaG9yKCcuc3ViLW1lbnVfX2l0ZW0gYScpO1xyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5jYXJkLXByb2R1Y3RfX2xpbmstd3JhcCBhJyk7XHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLnNlY3Rpb24tYmFubmVyIC5idG5fc3Ryb2tlJyk7XHJcblxyXG5cclxuLy8gSEVBREVSIEFORCBESVNDTEFJTUVSIFNDUk9MTFxyXG5cclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuICAgIGNvbnN0IGZpeGVkQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlzY2xhaW1lcl9tYWluJyk7XHJcbiAgICBjb25zdCBkb2N1bWVudEhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICBsZXQgbGFzdFNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgIGxldCBpc0hlYWRlckhpZGRlbiA9IGZhbHNlO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWTtcclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID4gbGFzdFNjcm9sbFkgJiYgIWlzSGVhZGVySGlkZGVuKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgaXNIZWFkZXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsUG9zaXRpb24gPCBsYXN0U2Nyb2xsWSAmJiBpc0hlYWRlckhpZGRlbikge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIGlzSGVhZGVySGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+IDEwMCkge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZpeGVkQmxvY2spIHtcclxuICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLmNsYXNzTGlzdC5hZGQoJ3Njcm9sbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZml4ZWRCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZICsgdmlld3BvcnRIZWlnaHQgPj0gZG9jdW1lbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdFNjcm9sbFkgPSBzY3JvbGxQb3NpdGlvbjtcclxuICAgIH0pO1xyXG5cclxuXHJcbi8vIENIQU5HRUQgQkcgQ0FSRCBCVE4gSE9WRVJcclxuICAgIGNvbnN0IGJnQ2hhbmdlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iZy1jaGFuZ2UnKTtcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmctY2hhbmdlJykpIHtcclxuICAgICAgICBiZ0NoYW5nZUJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FyZCA9IGJ1dHRvbi5jbG9zZXN0KCcuY2FyZC1wcm9kdWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2JnLXNob3cnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBidXR0b24uY2xvc2VzdCgnLmNhcmQtcHJvZHVjdCcpO1xyXG4gICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdiZy1zaG93Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuLy9DQVJELUhPVCBISURFXHJcbiAgICBjb25zdCBjcEhvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLXByb2R1Y3RfaG90Jyk7XHJcbiAgICBjb25zdCBidG5TY1Njcm9sbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4taG90Jyk7XHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcclxuICAgIGNvbnN0IHByb2R1Y3RMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtcHJvZHVjdF9fbGluaycpO1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1wcm9kdWN0X2hvdCcpKSB7XHJcbiAgICAgICAgYnRuU2NTY3JvbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNwSG90LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYnRuU2NTY3JvbGwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjcEhvdC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJ0blNjU2Nyb2xsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJvZHVjdExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjcEhvdC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJ0blNjU2Nyb2xsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4vL1NMSURFUiBGRUFUVVJFU1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItZmVhdHVyZXMnKSkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlckZlYXR1cmVzID0gbmV3IFN3aXBlcignLnNsaWRlci1mZWF0dXJlcyAnLCB7XHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogMTUwMCxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLWZlYXR1cmVzIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogJy5zbGlkZXItZmVhdHVyZXMgLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6ICcuc2xpZGVyLWZlYXR1cmVzIC5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgNTY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbi8vU0xJREVSU1xyXG4gICAgbGV0IHNsaWRlclByb2R1Y3RzO1xyXG4gICAgbGV0IHNsaWRlclB1cnBvc2U7XHJcbiAgICBsZXQgY2FyZExpc3RTbGlkZXI7XHJcbiAgICBsZXQgYXBwU2xpZGVyO1xyXG5cclxuICAgIGNvbnN0IGlkZW50aWNhbFN3aXBlcklkcyA9IFsnI3NsaWRlckRvc2FnZTEnLCAnI3NsaWRlckRvc2FnZTInLCAnI3NsaWRlckRvc2FnZTMnXTtcclxuICAgIGxldCBpZGVudGljYWxTd2lwZXJzID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFN3aXBlcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgaWYgKHNjcmVlbldpZHRoIDw9IDEwMjMpIHtcclxuICAgICAgICAgICAgaWYgKCFzbGlkZXJQcm9kdWN0cykge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyUHJvZHVjdHMgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLXByb2R1Y3RzJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMTAyMzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItcHJvZHVjdHMgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWNhcmRMaXN0U2xpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdFNsaWRlciA9IG5ldyBTd2lwZXIoJy5jYXJkLXNsaWRlcicsIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEwMjM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWw6ICcuY2FyZC1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNsaWRlclB1cnBvc2UpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclB1cnBvc2UgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLXB1cnBvc2UnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLXB1cnBvc2UgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWFwcFNsaWRlcikge1xyXG4gICAgICAgICAgICAgICAgYXBwU2xpZGVyID0gbmV3IFN3aXBlcignLmFwcC1zbGlkZXInLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAxMDIzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsOiAnLmFwcC1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChzbGlkZXJQcm9kdWN0cykge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyUHJvZHVjdHMuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlclByb2R1Y3RzID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2FyZExpc3RTbGlkZXIpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0U2xpZGVyLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdFNsaWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNsaWRlclB1cnBvc2UpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclB1cnBvc2UuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlclB1cnBvc2UgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhcHBTbGlkZXIpIHtcclxuICAgICAgICAgICAgICAgIGFwcFNsaWRlci5kZXN0cm95KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYXBwU2xpZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNjcmVlbldpZHRoIDw9IDU2Nykge1xyXG4gICAgICAgICAgICBpZiAoaWRlbnRpY2FsU3dpcGVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlkZW50aWNhbFN3aXBlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKGlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsOiBgJHtpZH0gLnN3aXBlci1wYWdpbmF0aW9uYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZGVudGljYWxTd2lwZXJzLnB1c2goc3dpcGVyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWRlbnRpY2FsU3dpcGVycy5mb3JFYWNoKHN3aXBlciA9PiBzd2lwZXIgJiYgc3dpcGVyLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICBpZGVudGljYWxTd2lwZXJzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRTd2lwZXJzKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5pdFN3aXBlcnMpO1xyXG5cclxuXHJcbi8vSElERS1TSE9XIFRFWFRcclxuICAgIGNvbnN0IGJ0bnNTZWVNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlZS1tb3JlJyk7XHJcblxyXG4gICAgYnRuc1NlZU1vcmUuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBoaWRlVGV4dCA9IHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaGlkZS10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaGlkZVRleHQpIHtcclxuICAgICAgICAgICAgICAgIGhpZGVUZXh0LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4tdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IGhpZGVUZXh0LmNsYXNzTGlzdC5jb250YWlucygnb3Blbi10ZXh0JykgPyBcItCX0LPQvtGA0L3Rg9GC0Lgg0ZbQvdGE0L7RgNC80LDRhtGW0Y5cIiA6IFwi0JHRltC70YzRiNC1INGW0L3RhNC+0YDQvNCw0YbRltGXXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbi8vU0xJREVSLUFDQ09SRElPTlxyXG4gICAgY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlLXB1cnBvc2UnKTtcclxuXHJcbiAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IHtcclxuICAgICAgICBzbGlkZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDEwMjQpIHtcclxuICAgICAgICAgICAgICAgIGV4cGFuZChzbGlkZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV4cGFuZCh0YXJnZXQpIHtcclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0YXJnZXQucGFyZW50Tm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZXhwYW5kZWQnKTtcclxuICAgIH1cclxuXHJcbi8vIEFOSU1BVElPTiBCTE9DS1MgU0VDVElPTiBBQ1RJT05cclxuICAgIGNvbnN0IGJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpb25fX2l0ZW0nKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjbG9zZXN0QmxvY2sgPSBudWxsO1xyXG4gICAgICAgIGxldCBjbG9zZXN0RGlzdGFuY2UgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgYmxvY2tzLmZvckVhY2goKGJsb2NrKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBibG9jay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3QgbWlkZGxlT2ZTY3JlZW4gPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZVRvTWlkZGxlID0gTWF0aC5hYnMocmVjdC50b3AgLSBtaWRkbGVPZlNjcmVlbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2VUb01pZGRsZSA8IGNsb3Nlc3REaXN0YW5jZSAmJiByZWN0LnRvcCA8IG1pZGRsZU9mU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZVRvTWlkZGxlO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VzdEJsb2NrID0gYmxvY2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYmxvY2tzLmZvckVhY2goYiA9PiBiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKSk7XHJcbiAgICAgICAgaWYgKGNsb3Nlc3RCbG9jaykge1xyXG4gICAgICAgICAgICBjbG9zZXN0QmxvY2suY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
