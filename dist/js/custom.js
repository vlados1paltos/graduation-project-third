    // Находим кнопку по уникальному id.
    const scrollTopButton = document.getElementById('scrollTopButton');

    if (scrollTopButton) {
        // Функция проверяет, насколько пользователь прокрутил страницу.
        const toggleScrollTopButton = function () {
        if (window.scrollY > 500) {
            // Показываем кнопку через CSS-класс.
            scrollTopButton.classList.add('scroll-top-button--visible');

            // Добавляем HTML-атрибут title, когда кнопка видима.
            scrollTopButton.setAttribute('title', 'Вернуться наверх');
        } else {
            // Скрываем кнопку.
            scrollTopButton.classList.remove('scroll-top-button--visible');

            // Удаляем атрибут, когда кнопка скрыта.
            scrollTopButton.removeAttribute('title');
        }
        };

        // При каждой прокрутке браузер запускает toggleScrollTopButton.
        document.addEventListener('scroll', toggleScrollTopButton);

        // При нажатии на кнопку запускается переданная функция.
        scrollTopButton.addEventListener('click', function () {
            // Прокручиваем окно к координате top: 0, то есть наверх.
            window.scroll({
                top: 0,
                behavior: 'smooth',
            });
        });

        // Проверяем положение страницы сразу после загрузки.
        toggleScrollTopButton();
    }