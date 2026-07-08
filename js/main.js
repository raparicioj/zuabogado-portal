/* ==========================================================================
   ZUABOGADO.CL - Controladores de Interacciones UX y Formularios
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto Scroll en Cabecera (Header)
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 2. Menú de Navegación Móvil (Burger)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleNav = () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    };

    burger.addEventListener('click', toggleNav);
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                toggleNav();
            }
        });
    });

    // 3. Acordeón para Preguntas Frecuentes (FAQs)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            
            // Cerrar otros abiertos (Opcional, pero otorga limpieza UX)
            const activeItems = document.querySelectorAll('.faq-item.active');
            activeItems.forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle item activo
            faqItem.classList.toggle('active');

            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // 4. Modal "Evaluar mi Caso"
    const evalBtn = document.getElementById('eval-btn');
    const modal = document.getElementById('eval-modal');
    const closeModal = document.querySelector('.close-modal');

    if (evalBtn && modal) {
        evalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // 5. Validación y Envío de Formulario Principal de Contacto
    const contactForm = document.getElementById('consultation-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            formFeedback.style.display = 'none';
            formFeedback.className = 'form-feedback';

            if (!name || !email || !message) {
                showFeedback(formFeedback, 'Por favor, complete todos los campos obligatorios (*).', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showFeedback(formFeedback, 'Ingrese un correo electrónico válido.', 'error');
                return;
            }

            // Simulación de envío
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando Asesoría...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                showFeedback(formFeedback, 'Su solicitud de asesoría ha sido enviada con éxito. Nuestro equipo revisará su caso y se contactará en un plazo máximo de 2 horas hábiles.', 'success');
                contactForm.reset();
            }, 1200);
        });
    }

    // 6. Validación de Formulario de Modal "Evaluar mi Caso"
    const evalForm = document.getElementById('eval-form');
    const evalFeedback = document.getElementById('eval-feedback');

    if (evalForm) {
        evalForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('eval-name').value.trim();
            const email = document.getElementById('eval-email').value.trim();
            const message = document.getElementById('eval-message').value.trim();

            evalFeedback.style.display = 'none';
            evalFeedback.className = 'form-feedback';

            if (!name || !email || !message) {
                showFeedback(evalFeedback, 'Complete los campos obligatorios.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showFeedback(evalFeedback, 'Ingrese un correo válido.', 'error');
                return;
            }

            const submitBtn = evalForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Analizando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                showFeedback(evalFeedback, 'Su caso ha sido ingresado para evaluación. Un abogado experto lo contactará en breve.', 'success');
                setTimeout(() => {
                    evalForm.reset();
                    modal.style.display = 'none';
                    evalFeedback.style.display = 'none';
                }, 3000);
            }, 1200);
        });
    }

    // Funciones auxiliares
    function showFeedback(element, msg, type) {
        element.textContent = msg;
        element.classList.add(type);
        element.style.display = 'block';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Scroll Suave para Enlaces Internos
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
