const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const menuItems = document.querySelectorAll('.header__item a');

menuItems.forEach(item => {
    if (item.getAttribute('href') === currentPage) {
        item.classList.add('active');
    }

    item.addEventListener('mouseenter', () => {
        item.style.color = '#cec6ba';
    });

    item.addEventListener('mouseleave', () => {
        item.style.color = '';
    });
});
