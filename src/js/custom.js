window.addEventListener('DOMContentLoaded', () => {
    // ==================================================
    // Кнопка возврата к началу страницы
    // ==================================================

    // Находим кнопку по уникальному id.
    const scrollTopButton = document.getElementById('scrollTopButton');

    if (scrollTopButton) {
        // Показываем кнопку после прокрутки страницы на 500 пикселей.
        const toggleScrollTopButton = function () {
            if (window.scrollY > 500) {
                scrollTopButton.classList.add(
                    'scroll-top-button--visible'
                );

                // Добавляем подсказку, пока кнопка отображается.
                scrollTopButton.setAttribute(
                    'title',
                    'Вернуться наверх'
                );
            } else {
                scrollTopButton.classList.remove(
                    'scroll-top-button--visible'
                );

                scrollTopButton.removeAttribute('title');
            }
        };

        // Проверяем положение страницы при прокрутке.
        document.addEventListener('scroll', toggleScrollTopButton);

        // Плавно возвращаем пользователя к началу страницы.
        scrollTopButton.addEventListener('click', function () {
            window.scroll({
                top: 0,
                behavior: 'smooth',
            });
        });

        // Проверяем положение страницы сразу после загрузки.
        toggleScrollTopButton();
    }

    // ==================================================
    // Проверка формы подписки
    // ==================================================

    const contactForm = document.getElementById('contactForm');
    const emailInput = document.getElementById('emailAddress');
    const submitButton = document.getElementById('submitButton');
    const emailStatus = document.getElementById('emailStatus');

    // Защитная проверка: код запускается только при наличии всех элементов.
    if (
        contactForm &&
        emailInput &&
        submitButton &&
        emailStatus
    ) {
        // Обновляет текст, классы поля и состояние кнопки.
        const validateEmail = function () {
            const hasValue = emailInput.value.trim().length > 0;

            // checkValidity() проверяет type="email" и required.
            const isValid = hasValue && emailInput.checkValidity();

            // Кнопка доступна только при корректном email.
            submitButton.disabled = !isValid;

            // Bootstrap-классы визуально показывают состояние поля.
            emailInput.classList.toggle('is-valid', isValid);
            emailInput.classList.toggle(
                'is-invalid',
                hasValue && !isValid
            );

            emailStatus.classList.remove(
                'email-status--error',
                'email-status--success'
            );

            if (!hasValue) {
                emailStatus.textContent = 'Введите email';
                return;
            }

            if (!isValid) {
                emailStatus.textContent = 'Проверьте формат email';
                emailStatus.classList.add('email-status--error');
                return;
            }

            emailStatus.textContent = 'Email введён корректно';
            emailStatus.classList.add('email-status--success');
        };

        // Проверяем email после каждого изменения поля.
        emailInput.addEventListener('input', validateEmail);

        // Обрабатываем отправку формы без перезагрузки страницы.
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!emailInput.checkValidity()) {
                validateEmail();
                return;
            }

            emailStatus.textContent = 'Спасибо! Email принят.';
            emailStatus.classList.remove('email-status--error');
            emailStatus.classList.add('email-status--success');

            contactForm.reset();
            emailInput.classList.remove('is-valid', 'is-invalid');
            submitButton.disabled = true;

            // Через три секунды возвращаем начальную подсказку.
            window.setTimeout(validateEmail, 3000);
        });

        // Устанавливаем начальное состояние формы.
        validateEmail();
    }

    // ==================================================
    // Плавное появление секций при прокрутке
    // ==================================================

    // Находим все секции страницы.
    const sections = document.querySelectorAll('section');

    if (sections.length > 0) {
        // Сначала добавляем каждой секции начальное скрытое состояние.
        sections.forEach(function (section) {
            section.classList.add('reveal-section');
        });

        // Observer следит за появлением секций в области экрана.
        const sectionObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    // Проверяем, появилась ли секция в области просмотра.
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            'reveal-section--visible'
                        );

                        // После появления больше не следим за этой секцией.
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                // Анимация запускается, когда видно 15% секции.
                threshold: 0.15,
            }
        );

        // Передаём каждую секцию под наблюдение.
        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }
});