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

    [btnClose, backdrop,  ...menuLinks].forEach(function (element) {
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
            fixedBlock.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
            fixedBlock.classList.remove('scroll');
        }

        if (window.scrollY + viewportHeight >= documentHeight) {
            fixedBlock.classList.remove('scroll');
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






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2J1cmdlcicpO1xyXG4gICAgY29uc3QgYnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IHN1Yk1lbnVUb2dnbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN1Yi1tZW51X190b2dnbGUnKTtcclxuXHJcbiAgICBidG5CdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCBiYWNrZHJvcCwgIC4uLm1lbnVMaW5rc10uZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzdWJNZW51VG9nZ2xlcy5mb3JFYWNoKGZ1bmN0aW9uICh0b2dnbGUpIHtcclxuICAgICAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKCdzdWItbWVudV9fdG9nZ2xlX2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gSEVBREVSIEFORCBESVNDTEFJTUVSIFNDUk9MTFxyXG5cclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuICAgIGNvbnN0IGZpeGVkQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlzY2xhaW1lcl9tYWluJyk7XHJcbiAgICBjb25zdCBkb2N1bWVudEhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICBsZXQgbGFzdFNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgIGxldCBpc0hlYWRlckhpZGRlbiA9IGZhbHNlO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWTtcclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID4gbGFzdFNjcm9sbFkgJiYgIWlzSGVhZGVySGlkZGVuKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgaXNIZWFkZXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsUG9zaXRpb24gPCBsYXN0U2Nyb2xsWSAmJiBpc0hlYWRlckhpZGRlbikge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIGlzSGVhZGVySGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPiAxMDApIHtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3Njcm9sbCcpO1xyXG4gICAgICAgICAgICBmaXhlZEJsb2NrLmNsYXNzTGlzdC5hZGQoJ3Njcm9sbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwnKTtcclxuICAgICAgICAgICAgZml4ZWRCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSArIHZpZXdwb3J0SGVpZ2h0ID49IGRvY3VtZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGZpeGVkQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RTY3JvbGxZID0gc2Nyb2xsUG9zaXRpb247XHJcbiAgICB9KTtcclxuXHJcblxyXG4vLyBDSEFOR0VEIEJHIENBUkQgQlROIEhPVkVSXHJcbiAgICBjb25zdCBiZ0NoYW5nZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmctY2hhbmdlJyk7XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJnLWNoYW5nZScpKSB7XHJcbiAgICAgICAgYmdDaGFuZ2VCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBidXR0b24uY2xvc2VzdCgnLmNhcmQtcHJvZHVjdCcpO1xyXG4gICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdiZy1zaG93Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkID0gYnV0dG9uLmNsb3Nlc3QoJy5jYXJkLXByb2R1Y3QnKTtcclxuICAgICAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnYmctc2hvdycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuLy9DQVJELUhPVCBISURFXHJcbiAgICBjb25zdCBjcEhvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLXByb2R1Y3RfaG90Jyk7XHJcbiAgICBjb25zdCBidG5TY1Njcm9sbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4taG90Jyk7XHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcclxuICAgIGNvbnN0IHByb2R1Y3RMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtcHJvZHVjdF9fbGluaycpO1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1wcm9kdWN0X2hvdCcpKSB7XHJcbiAgICAgICAgYnRuU2NTY3JvbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNwSG90LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYnRuU2NTY3JvbGwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjcEhvdC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJ0blNjU2Nyb2xsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJvZHVjdExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjcEhvdC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJ0blNjU2Nyb2xsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbi8vU0xJREVSIEZFQVRVUkVTXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1mZWF0dXJlcycpKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyRmVhdHVyZXMgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWZlYXR1cmVzICcsIHtcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiAxNTAwLFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItZmVhdHVyZXMgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiAnLnNsaWRlci1mZWF0dXJlcyAuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogJy5zbGlkZXItZmVhdHVyZXMgLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuLy9TTElERVJTXHJcbiAgICBsZXQgc2xpZGVyUHJvZHVjdHM7XHJcbiAgICBsZXQgc2xpZGVyUHVycG9zZTtcclxuXHJcbiAgICBjb25zdCBpZGVudGljYWxTd2lwZXJJZHMgPSBbJyNzbGlkZXJEb3NhZ2UxJywgJyNzbGlkZXJEb3NhZ2UyJywgJyNzbGlkZXJEb3NhZ2UzJ107XHJcbiAgICBsZXQgaWRlbnRpY2FsU3dpcGVycyA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTd2lwZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcblxyXG4gICAgICAgIGlmIChzY3JlZW5XaWR0aCA8PSAxMDIzKSB7XHJcbiAgICAgICAgICAgIGlmICghc2xpZGVyUHJvZHVjdHMpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclByb2R1Y3RzID0gbmV3IFN3aXBlcignLnNsaWRlci1wcm9kdWN0cycsIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEwMjM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLXByb2R1Y3RzIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzbGlkZXJQdXJwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJQdXJwb3NlID0gbmV3IFN3aXBlcignLnNsaWRlci1wdXJwb3NlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci1wdXJwb3NlIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc2xpZGVyUHJvZHVjdHMpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclByb2R1Y3RzLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJQcm9kdWN0cyA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNsaWRlclB1cnBvc2UpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclB1cnBvc2UuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlclB1cnBvc2UgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2NyZWVuV2lkdGggPD0gNTY3KSB7XHJcbiAgICAgICAgICAgIGlmIChpZGVudGljYWxTd2lwZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWRlbnRpY2FsU3dpcGVySWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWw6IGAke2lkfSAuc3dpcGVyLXBhZ2luYXRpb25gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlkZW50aWNhbFN3aXBlcnMucHVzaChzd2lwZXIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZGVudGljYWxTd2lwZXJzLmZvckVhY2goc3dpcGVyID0+IHN3aXBlciAmJiBzd2lwZXIuZGVzdHJveSh0cnVlLCB0cnVlKSk7XHJcbiAgICAgICAgICAgIGlkZW50aWNhbFN3aXBlcnMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFN3aXBlcnMoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBpbml0U3dpcGVycyk7XHJcblxyXG5cclxuLy9ISURFLVNIT1cgVEVYVFxyXG4gICAgY29uc3QgYnRuc1NlZU1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VlLW1vcmUnKTtcclxuXHJcbiAgICBidG5zU2VlTW9yZS5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhpZGVUZXh0ID0gdGhpcy5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChoaWRlVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgaGlkZVRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnb3Blbi10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gaGlkZVRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuLXRleHQnKSA/IFwi0JfQs9C+0YDQvdGD0YLQuCDRltC90YTQvtGA0LzQsNGG0ZbRjlwiIDogXCLQkdGW0LvRjNGI0LUg0ZbQvdGE0L7RgNC80LDRhtGW0ZdcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy9TTElERVItQUNDT1JESU9OXHJcbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGUtcHVycG9zZScpO1xyXG5cclxuICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSkgPT4ge1xyXG4gICAgICAgIHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4gICAgICAgICAgICAgICAgZXhwYW5kKHNsaWRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZXhwYW5kKHRhcmdldCkge1xyXG4gICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRhcmdldC5wYXJlbnROb2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdleHBhbmRlZCcpO1xyXG4gICAgfVxyXG5cclxuLy8gQU5JTUFUSU9OIEJMT0NLUyBTRUNUSU9OIEFDVElPTlxyXG4gICAgY29uc3QgYmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGlvbl9faXRlbScpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3RCbG9jayA9IG51bGw7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3REaXN0YW5jZSA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICBibG9ja3MuZm9yRWFjaCgoYmxvY2spID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IGJsb2NrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBtaWRkbGVPZlNjcmVlbiA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlVG9NaWRkbGUgPSBNYXRoLmFicyhyZWN0LnRvcCAtIG1pZGRsZU9mU2NyZWVuKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZVRvTWlkZGxlIDwgY2xvc2VzdERpc3RhbmNlICYmIHJlY3QudG9wIDwgbWlkZGxlT2ZTY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3REaXN0YW5jZSA9IGRpc3RhbmNlVG9NaWRkbGU7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0QmxvY2sgPSBibG9jaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBibG9ja3MuZm9yRWFjaChiID0+IGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpKTtcclxuICAgICAgICBpZiAoY2xvc2VzdEJsb2NrKSB7XHJcbiAgICAgICAgICAgIGNsb3Nlc3RCbG9jay5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
