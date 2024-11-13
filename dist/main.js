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
                        568: {
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






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2J1cmdlcicpO1xyXG4gICAgY29uc3QgYnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IHN1Yk1lbnVUb2dnbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN1Yi1tZW51X190b2dnbGUnKTtcclxuXHJcbiAgICBidG5CdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCBiYWNrZHJvcCwgLi4ubWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHN1Yk1lbnVUb2dnbGVzLmZvckVhY2goZnVuY3Rpb24gKHRvZ2dsZSkge1xyXG4gICAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoJ3N1Yi1tZW51X190b2dnbGVfYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vLyBIRUFERVIgQU5EIERJU0NMQUlNRVIgU0NST0xMXHJcblxyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgZml4ZWRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNjbGFpbWVyX21haW4nKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFk7XHJcbiAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID4gMTAwKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdzY3JvbGwnKTtcclxuICAgICAgICAgICAgZml4ZWRCbG9jay5jbGFzc0xpc3QuYWRkKCdzY3JvbGwnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgIGZpeGVkQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gQ0hBTkdFRCBCRyBDQVJEIEJUTiBIT1ZFUlxyXG4gICAgY29uc3QgYmdDaGFuZ2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJnLWNoYW5nZScpO1xyXG5cclxuICAgIGJnQ2hhbmdlQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2FyZCA9IGJ1dHRvbi5jbG9zZXN0KCcuY2FyZC1wcm9kdWN0Jyk7XHJcbiAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnYmctc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2FyZCA9IGJ1dHRvbi5jbG9zZXN0KCcuY2FyZC1wcm9kdWN0Jyk7XHJcbiAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnYmctc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vL0NBUkQtSE9UIEhJREVcclxuICAgIGNvbnN0IGNwSG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtcHJvZHVjdF9ob3QnKTtcclxuICAgIGNvbnN0IGJ0blNjU2Nyb2xsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1ob3QnKTtcclxuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xyXG5cclxuICAgIGJ0blNjU2Nyb2xsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY3BIb3QuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIGJ0blNjU2Nyb2xsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNwSG90LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICBidG5TY1Njcm9sbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICB9KTtcclxuXHJcbi8vU0xJREVSIEZFQVRVUkVTXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1mZWF0dXJlcycpKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyRmVhdHVyZXMgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWZlYXR1cmVzICcsIHtcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiAxNTAwLFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItZmVhdHVyZXMgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiAnLnNsaWRlci1mZWF0dXJlcyAuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogJy5zbGlkZXItZmVhdHVyZXMgLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuLy9TTElERVJTXHJcbiAgICBsZXQgc2xpZGVyUHJvZHVjdHM7XHJcbiAgICBsZXQgc2xpZGVyUHVycG9zZTtcclxuXHJcbiAgICBjb25zdCBpZGVudGljYWxTd2lwZXJJZHMgPSBbJyNzbGlkZXJEb3NhZ2UxJywgJyNzbGlkZXJEb3NhZ2UyJywgJyNzbGlkZXJEb3NhZ2UzJ107XHJcbiAgICBsZXQgaWRlbnRpY2FsU3dpcGVycyA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTd2lwZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcblxyXG4gICAgICAgIGlmIChzY3JlZW5XaWR0aCA8PSAxMDIzKSB7XHJcbiAgICAgICAgICAgIGlmICghc2xpZGVyUHJvZHVjdHMpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclByb2R1Y3RzID0gbmV3IFN3aXBlcignLnNsaWRlci1wcm9kdWN0cycsIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDU2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItcHJvZHVjdHMgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNsaWRlclB1cnBvc2UpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclB1cnBvc2UgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLXB1cnBvc2UnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLXB1cnBvc2UgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChzbGlkZXJQcm9kdWN0cykge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyUHJvZHVjdHMuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlclByb2R1Y3RzID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2xpZGVyUHVycG9zZSkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyUHVycG9zZS5kZXN0cm95KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyUHVycG9zZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzY3JlZW5XaWR0aCA8PSA1NjcpIHtcclxuICAgICAgICAgICAgaWYgKGlkZW50aWNhbFN3aXBlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZGVudGljYWxTd2lwZXJJZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihpZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbDogYCR7aWR9IC5zd2lwZXItcGFnaW5hdGlvbmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpY2FsU3dpcGVycy5wdXNoKHN3aXBlcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlkZW50aWNhbFN3aXBlcnMuZm9yRWFjaChzd2lwZXIgPT4gc3dpcGVyICYmIHN3aXBlci5kZXN0cm95KHRydWUsIHRydWUpKTtcclxuICAgICAgICAgICAgaWRlbnRpY2FsU3dpcGVycyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0U3dpcGVycygpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluaXRTd2lwZXJzKTtcclxuXHJcblxyXG4vL0hJREUtU0hPVyBURVhUXHJcbiAgICBjb25zdCBidG5zU2VlTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWUtbW9yZScpO1xyXG5cclxuICAgIGJ0bnNTZWVNb3JlLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgaGlkZVRleHQgPSB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmhpZGUtdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGhpZGVUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBoaWRlVGV4dC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuLXRleHQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBoaWRlVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4tdGV4dCcpID8gXCLQl9Cz0L7RgNC90YPRgtC4INGW0L3RhNC+0YDQvNCw0YbRltGOXCIgOiBcItCR0ZbQu9GM0YjQtSDRltC90YTQvtGA0LzQsNGG0ZbRl1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vL1NMSURFUi1BQ0NPUkRJT05cclxuICAgIGNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZS1wdXJwb3NlJyk7XHJcblxyXG4gICAgc2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiB7XHJcbiAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMDI0KSB7XHJcbiAgICAgICAgICAgICAgICBleHBhbmQoc2xpZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBleHBhbmQodGFyZ2V0KSB7XHJcbiAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGFyZ2V0LnBhcmVudE5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2V4cGFuZGVkJyk7XHJcbiAgICB9XHJcblxyXG4vL0FOSU1BVElPTiBCTE9DS1MgU0VDVElPTiBBQ1RJT05cclxuICAgIGNvbnN0IGJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpb25fX2l0ZW0nKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjbG9zZXN0QmxvY2sgPSBudWxsO1xyXG4gICAgICAgIGxldCBjbG9zZXN0RGlzdGFuY2UgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgYmxvY2tzLmZvckVhY2goKGJsb2NrKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBibG9jay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3QgbWlkZGxlT2ZTY3JlZW4gPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZVRvTWlkZGxlID0gTWF0aC5hYnMocmVjdC50b3AgLSBtaWRkbGVPZlNjcmVlbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2VUb01pZGRsZSA8IGNsb3Nlc3REaXN0YW5jZSAmJiByZWN0LnRvcCA8IG1pZGRsZU9mU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZVRvTWlkZGxlO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VzdEJsb2NrID0gYmxvY2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYmxvY2tzLmZvckVhY2goYiA9PiBiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKSk7XHJcbiAgICAgICAgaWYgKGNsb3Nlc3RCbG9jaykge1xyXG4gICAgICAgICAgICBjbG9zZXN0QmxvY2suY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
