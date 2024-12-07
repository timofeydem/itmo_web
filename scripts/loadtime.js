(function () {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;

        const footer = document.querySelector('footer');

        if (footer) {
            const loadInfo = document.createElement('h5');
            loadInfo.textContent = `Страница загружена за ${loadTime} мс`;
            loadInfo.classList.add('footer__text');

            footer.appendChild(loadInfo);
        }
    });
})();
