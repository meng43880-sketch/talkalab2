// === ГЛОБАЛЬНЫЕ ФУНКЦИИ - ДОСТУПНЫ ВЕЗДЕ ===

// Открытие формы консультации
function openConsultationForm() {
    console.log('Открытие формы консультации');
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Закрытие формы консультации
function closeConsultationForm() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Открытие инструкции
function openInstruction() {
    closeConsultationForm();
    setTimeout(() => {
        const modal = document.getElementById('instructionModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }, 300);
}

// Закрытие инструкции
function closeInstruction() {
    const modal = document.getElementById('instructionModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            openConsultationForm();
        }, 300);
    }
}

// Открытие политики конфиденциальности
function openPrivacyPolicy() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Закрытие политики конфиденциальности
function closePrivacyPolicy() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Открытие пользовательского соглашения
function openTerms() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Закрытие пользовательского соглашения
function closeTerms() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Закрытие уведомления
function closeNotification() {
    const notification = document.getElementById('successNotification');
    if (notification) {
        notification.classList.remove('show');
    }
}

// Переключение FAQ
function toggleFAQ(num) {
    const answer = document.getElementById('faq-answer-' + num);
    if (!answer) return;
    
    const question = answer.previousElementSibling;
    const icon = question.querySelector('.faq-icon');
    
    // Закрываем все остальные FAQ
    document.querySelectorAll('.faq-answer').forEach((faq, index) => {
        if (index + 1 !== num) {
            faq.classList.remove('active');
            faq.previousElementSibling.classList.remove('active');
            const prevIcon = faq.previousElementSibling.querySelector('.faq-icon');
            if (prevIcon) {
                prevIcon.classList.remove('fa-minus');
                prevIcon.classList.add('fa-plus');
            }
        }
    });

    // Переключаем текущий FAQ
    answer.classList.toggle('active');
    question.classList.toggle('active');

    if (answer.classList.contains('active')) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    } else {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    }
}

// Показать уведомление
function showNotification(type, message) {
    const notification = document.getElementById('successNotification');
    if (!notification) return;

    const icon = notification.querySelector('.success-icon i');
    const title = notification.querySelector('.success-text h4');
    const text = notification.querySelector('.success-text p');

    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
        icon.style.color = '#15bc8a';
        notification.style.background = '#15bc8a';
        title.textContent = 'Заявка успешно доставлена!';
    } else {
        icon.className = 'fas fa-exclamation-circle';
        icon.style.color = '#ef4444';
        notification.style.background = '#ef4444';
        title.textContent = 'Ошибка отправки';
    }

    text.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// === ОСНОВНОЙ КОД ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('TalkaLab - сайт загружен и инициализирован');

    // 1. НАСТРОЙКА ТЕМНОЙ ТЕМЫ
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Проверяем сохраненную тему
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }

        // Обработчик клика по переключателю
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            // Сохраняем выбор в localStorage
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }

    // 2. ФИКСИРОВАННЫЙ ХЕДЕР ПРИ СКРОЛЛЕ
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. ПРОГРЕСС-БАР СКРОЛЛА
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }

    // 4. МОБИЛЬНОЕ МЕНЮ
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Закрытие меню при клике на ссылку
        mobileMenu.querySelectorAll('.nav-link, .btn').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 5. ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Закрываем мобильное меню если открыто
                if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }

                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. АНИМАЦИИ ПРИ СКРОЛЛЕ
    const animateElements = document.querySelectorAll('.animate-up, .animate-left, .animate-right, .animate-scale');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationClass = Array.from(entry.target.classList)
                        .find(className => className.startsWith('animate-'));
                    if (animationClass) {
                        entry.target.style.animationPlayState = 'running';
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }

    // 7. ОТПРАВКА ФОРМЫ В TELEGRAM
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('clientName').value.trim();
            let telegram = document.getElementById('clientTelegram').value.trim();

            // Валидация
            if (!name || !telegram) {
                showNotification('error', 'Пожалуйста, заполните все поля');
                return;
            }

            // Добавляем @ если его нет
            if (!telegram.startsWith('@')) {
                telegram = '@' + telegram;
            }

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;

            // Настройки бота Telegram
            const botToken = '8580940089:AAHEYpW_nPjmnOU6mA47ITlV_wWFOHKIazo';
            const chatId = '-5113146363';
            
            // Формируем сообщение
            const message = `📋 *Новая заявка на консультацию*\n\n` +
                           `👤 *Имя:* ${name}\n` +
                           `📱 *Telegram:* ${telegram}\n\n` +
                           `🕐 *Время:* ${new Date().toLocaleString('ru-RU')}\n` +
                           `🌐 *Источник:* сайт TalkaLab`;

            try {
                const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: 'Markdown'
                    })
                });

                const data = await response.json();
                
                // Восстанавливаем кнопку
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                if (data.ok) {
                    showNotification('success', 'Заявка успешно доставлена! Мы свяжемся с вами в ближайшее время');
                    consultationForm.reset();
                    setTimeout(() => {
                        closeConsultationForm();
                    }, 2000);
                } else {
                    console.error('Telegram API Error:', data);
                    showNotification('error', 'Ошибка при отправке. Попробуйте позже или свяжитесь с нами напрямую: @talka_lab');
                }
            } catch (error) {
                console.error('Ошибка сети:', error);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showNotification('error', 'Ошибка сети. Проверьте подключение к интернету и попробуйте снова');
            }
        });
    }

    // 8. ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН ПРИ КЛИКЕ НА ФОН
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                if (this.id === 'consultationModal') closeConsultationForm();
                if (this.id === 'instructionModal') closeInstruction();
                if (this.id === 'privacyModal') closePrivacyPolicy();
                if (this.id === 'termsModal') closeTerms();
            }
        });
    });

    // 9. ОТКРЫВАЕМ ПЕРВЫЙ FAQ ПРИ ЗАГРУЗКЕ
    setTimeout(() => {
        if (window.innerWidth > 768) {
            const firstFaq = document.querySelector('.faq-question');
            if (firstFaq) {
                firstFaq.click();
            }
        }
    }, 1000);

    console.log('TalkaLab - все функции готовы к работе');
});

// === ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ ===
window.addEventListener('load', function() {
    console.log('Страница полностью загружена');
    
    // Проверяем, что все функции доступны
    if (typeof openConsultationForm === 'function' && 
        typeof toggleFAQ === 'function' &&
        typeof showNotification === 'function') {
        console.log('✅ Все функции работают корректно');
    } else {
        console.error('❌ Некоторые функции не загрузились!');
    }
});

// Дополнительный фикс для iOS
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}