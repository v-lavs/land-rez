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
    const scCardsInner = document.querySelector('.scroll-cards__inner');
    const btnScScroll = document.querySelector('.btn-hot');
    btnScScroll.addEventListener('click', function (e) {
        e.preventDefault();
        scCardsInner.classList.toggle('to-left');
        btnScScroll.classList.toggle('to-left');
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

});






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4vLyAgICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XHJcbi8vICAgICBjb25zdCBoZWFkZXJTYk9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4vLyAgICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1idXJnZXInKTtcclxuLy8gICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaWRlYmFyIC5tZW51X19saW5rJyk7XHJcbi8vXHJcbi8vICAgICBidG5CdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4vLyAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcclxuLy8gICAgICAgICBoZWFkZXJTYk9wLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcclxuLy8gICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ2VsLXZpc2libGUnKTtcclxuLy8gICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgbWVudUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcclxuLy8gICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuLy8gICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICB9KTtcclxuLy9cclxuLy8gICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbi8vICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbi8vICAgICB9KTtcclxuXHJcbi8vIENIQU5HRUQgQkcgQ0FSRCBCVE4gSE9WRVJcclxuICAgIGNvbnN0IGJnQ2hhbmdlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iZy1jaGFuZ2UnKTtcclxuXHJcbiAgICBiZ0NoYW5nZUJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBidXR0b24uY2xvc2VzdCgnLmNhcmQtcHJvZHVjdCcpO1xyXG4gICAgICAgICAgICBjYXJkLnN0eWxlLmJhY2tncm91bmQgPSAncmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA3NSUgODQlLCByZ2JhKDcwLCAxODIsIDAsIDAuMikgMjUlLCAjZmZmZmZmIDUwJSknO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2FyZCA9IGJ1dHRvbi5jbG9zZXN0KCcuY2FyZC1wcm9kdWN0Jyk7XHJcbiAgICAgICAgICAgIGNhcmQuc3R5bGUuYmFja2dyb3VuZCA9ICdyYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDc1JSA4NCUsIHJnYmEoNzAsIDE4MiwgMCwgMCkgMjUlLCAjZmZmZmZmIDUwJSknO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vL1NDUk9MTCBDQVJEIEhJREVcclxuICAgIGNvbnN0IHNjQ2FyZHNJbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtY2FyZHNfX2lubmVyJyk7XHJcbiAgICBjb25zdCBidG5TY1Njcm9sbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4taG90Jyk7XHJcbiAgICBidG5TY1Njcm9sbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHNjQ2FyZHNJbm5lci5jbGFzc0xpc3QudG9nZ2xlKCd0by1sZWZ0Jyk7XHJcbiAgICAgICAgYnRuU2NTY3JvbGwuY2xhc3NMaXN0LnRvZ2dsZSgndG8tbGVmdCcpO1xyXG4gICAgfSk7XHJcblxyXG4vL1NMSURFUlxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItZmVhdHVyZXMnKSkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlckZlYXR1cmVzID0gbmV3IFN3aXBlcignLnNsaWRlci1mZWF0dXJlcyAnLCB7XHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgc3BlZWQ6IDE1MDAsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci1mZWF0dXJlcyAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6ICcuc2xpZGVyLWZlYXR1cmVzIC5zd2lwZXItYnV0dG9uLW5leHQnLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiAnLnNsaWRlci1mZWF0dXJlcyAuc3dpcGVyLWJ1dHRvbi1wcmV2JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbi8vU0xJREVSLUFDQ09SRElPTlxyXG4gICAgY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlLXB1cnBvc2UnKTtcclxuXHJcbiAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IHtcclxuICAgICAgICBzbGlkZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXhwYW5kKHNsaWRlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
