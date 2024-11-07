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

//HIDE-SHOW TEXT
    const btnsSeeMore = document.querySelectorAll('.see-more');

    btnsSeeMore.forEach((btn) => {
        btn.addEventListener('click', function() {
            // Використовуємо `this` для роботи саме з поточною кнопкою
            const hideText = this.parentElement.querySelector('.hide-text');

            // Перевіряємо, чи знайдено блок із текстом, і перемикаємо його видимість
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






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2J1cmdlcicpO1xyXG4gICAgY29uc3QgYnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IHN1Yk1lbnVUb2dnbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN1Yi1tZW51X190b2dnbGUnKTtcclxuXHJcbiAgICBidG5CdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCBiYWNrZHJvcCwgLi4ubWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHN1Yk1lbnVUb2dnbGVzLmZvckVhY2goZnVuY3Rpb24gKHRvZ2dsZSkge1xyXG4gICAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoJ3N1Yi1tZW51X190b2dnbGVfYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vLyBIRUFERVIgQU5EIERJU0NMQUlNRVIgU0NST0xMXHJcblxyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgZml4ZWRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNjbGFpbWVyX21haW4nKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFk7XHJcbiAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID4gMTAwKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdzY3JvbGwnKTtcclxuICAgICAgICAgICAgZml4ZWRCbG9jay5jbGFzc0xpc3QuYWRkKCdzY3JvbGwnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgIGZpeGVkQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gQ0hBTkdFRCBCRyBDQVJEIEJUTiBIT1ZFUlxyXG4gICAgY29uc3QgYmdDaGFuZ2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJnLWNoYW5nZScpO1xyXG5cclxuICAgIGJnQ2hhbmdlQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2FyZCA9IGJ1dHRvbi5jbG9zZXN0KCcuY2FyZC1wcm9kdWN0Jyk7XHJcbiAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnYmctc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2FyZCA9IGJ1dHRvbi5jbG9zZXN0KCcuY2FyZC1wcm9kdWN0Jyk7XHJcbiAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnYmctc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vL0NBUkQtSE9UIEhJREVcclxuICAgIGNvbnN0IGNwSG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtcHJvZHVjdF9ob3QnKTtcclxuICAgIGNvbnN0IGJ0blNjU2Nyb2xsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1ob3QnKTtcclxuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xyXG5cclxuICAgIGJ0blNjU2Nyb2xsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY3BIb3QuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIGJ0blNjU2Nyb2xsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNwSG90LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICBidG5TY1Njcm9sbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICB9KTtcclxuXHJcbi8vU0xJREVSXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1mZWF0dXJlcycpKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyRmVhdHVyZXMgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWZlYXR1cmVzICcsIHtcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgICAgICBzcGVlZDogMTUwMCxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLWZlYXR1cmVzIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogJy5zbGlkZXItZmVhdHVyZXMgLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6ICcuc2xpZGVyLWZlYXR1cmVzIC5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuLy9ISURFLVNIT1cgVEVYVFxyXG4gICAgY29uc3QgYnRuc1NlZU1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VlLW1vcmUnKTtcclxuXHJcbiAgICBidG5zU2VlTW9yZS5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8g0JLQuNC60L7RgNC40YHRgtC+0LLRg9GU0LzQviBgdGhpc2Ag0LTQu9GPINGA0L7QsdC+0YLQuCDRgdCw0LzQtSDQtyDQv9C+0YLQvtGH0L3QvtGOINC60L3QvtC/0LrQvtGOXHJcbiAgICAgICAgICAgIGNvbnN0IGhpZGVUZXh0ID0gdGhpcy5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgIC8vINCf0LXRgNC10LLRltGA0Y/RlNC80L4sINGH0Lgg0LfQvdCw0LnQtNC10L3QviDQsdC70L7QuiDRltC3INGC0LXQutGB0YLQvtC8LCDRliDQv9C10YDQtdC80LjQutCw0ZTQvNC+INC50L7Qs9C+INCy0LjQtNC40LzRltGB0YLRjFxyXG4gICAgICAgICAgICBpZiAoaGlkZVRleHQpIHtcclxuICAgICAgICAgICAgICAgIGhpZGVUZXh0LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4tdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IGhpZGVUZXh0LmNsYXNzTGlzdC5jb250YWlucygnb3Blbi10ZXh0JykgPyBcItCX0LPQvtGA0L3Rg9GC0Lgg0ZbQvdGE0L7RgNC80LDRhtGW0Y5cIiA6IFwi0JHRltC70YzRiNC1INGW0L3RhNC+0YDQvNCw0YbRltGXXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbi8vU0xJREVSLUFDQ09SRElPTlxyXG4gICAgY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlLXB1cnBvc2UnKTtcclxuXHJcbiAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IHtcclxuICAgICAgICBzbGlkZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXhwYW5kKHNsaWRlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV4cGFuZCh0YXJnZXQpIHtcclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0YXJnZXQucGFyZW50Tm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZXhwYW5kZWQnKTtcclxuICAgIH1cclxuXHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
