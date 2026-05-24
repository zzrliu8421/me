document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    const geoShapes = ['geo-triangle', 'geo-square', 'geo-diamond', 'geo-circle', 'geo-cross', 'geo-ring', 'geo-dots'];

    function createGeoElements(selector, count) {
        const section = document.querySelector(selector);
        if (!section) return;
        const container = document.createElement('div');
        container.className = 'geo-container';
        for (let i = 0; i < count; i++) {
            const shape = document.createElement('div');
            const type = geoShapes[Math.floor(Math.random() * geoShapes.length)];
            shape.className = 'geo ' + type;
            const size = 10 + Math.random() * 22;
            const dur = 15 + Math.random() * 20;
            shape.style.setProperty('--size', size + 'px');
            shape.style.setProperty('--dur', dur + 's');
            shape.style.left = (5 + Math.random() * 90) + '%';
            shape.style.top = (5 + Math.random() * 90) + '%';
            shape.style.animationDelay = -(Math.random() * dur) + 's';
            container.appendChild(shape);
        }
        section.prepend(container);
    }

    createGeoElements('.timeline', 11);
    createGeoElements('.projects', 9);
    createGeoElements('.footer', 5);

    document.querySelectorAll('.hero-bg-pattern').forEach(pattern => {
        const text = 'S Y L V Y   ';
        for (let i = 0; i < 15; i++) {
            const row = document.createElement('div');
            row.className = 'pattern-row';
            row.textContent = text.repeat(8);
            pattern.appendChild(row);
        }
    });

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        html.setAttribute('data-theme', 'light');
        themeIcon.className = 'ri-sun-fill';
    } else {
        html.removeAttribute('data-theme');
        themeIcon.className = 'ri-moon-fill';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        if (currentTheme === 'light') {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeIcon.className = 'ri-moon-fill';
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.className = 'ri-sun-fill';
        }
    });

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navbar');
    const navClose = document.querySelector('.nav-close');

    function closeMenu() {
        nav.classList.remove('active');
        burger.classList.remove('active');
    }

    burger.addEventListener('click', function () {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // 程序员语录轮播
    const quotes = [
        '"It works on my machine"',
        '"It was working yesterday"',
        '"Must be a compiler bug"',
        '"Code is poetry in motion"',
        '"Every bug tells a story"',
        '"Simplicity is the ultimate sophistication"',
        '"There is no place like 127.0.0.1"',
        '"99 bugs in the code, take one down..."',
        '"Sleep is for the weak, coffee is for the strong"',
        '"I don\'t always test my code, but when I do..."'
    ];

    const quoteElement = document.getElementById('quote');
    let currentQuoteIndex = 0;

    function rotateQuote() {
        quoteElement.style.opacity = '0';
        quoteElement.style.transform = 'translateY(10px) scale(0.98)';
        quoteElement.style.filter = 'blur(2px)';

        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quoteElement.textContent = quotes[currentQuoteIndex];

            quoteElement.style.opacity = '1';
            quoteElement.style.transform = 'translateY(0) scale(1)';
            quoteElement.style.filter = 'blur(0)';
        }, 350);
    }

    if (quoteElement) {
        quoteElement.style.transition = 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease';
        setInterval(rotateQuote, 4000);
    }

    // iOS 风格滚动格言效果
    const quoteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.3 });

    document.querySelectorAll('.quote-animate').forEach(quote => {
        quoteObserver.observe(quote);
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach((el, i) => {
        el.style.setProperty('--delay', `${i * 0.08}s`);
        revealObserver.observe(el);
    });

    document.querySelectorAll('.bento-card').forEach((el, i) => {
        el.classList.add('scroll-reveal');
        el.style.setProperty('--delay', `${i * 0.1}s`);
        revealObserver.observe(el);

        el.addEventListener('mousemove', (e) => {
            if (!el.classList.contains('visible')) return;
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            el.style.setProperty('--tilt-transform', `translateY(-6px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`);
        });

        el.addEventListener('mouseleave', () => {
            el.style.removeProperty('--tilt-transform');
        });
    });

    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('scroll-reveal');
        el.style.setProperty('--delay', '0s');
        revealObserver.observe(el);
    });

    document.querySelectorAll('.section-subtitle').forEach(el => {
        el.classList.add('scroll-reveal');
        el.style.setProperty('--delay', '0.15s');
        revealObserver.observe(el);
    });

    document.querySelectorAll('.timeline-item').forEach((el, i) => {
        el.classList.add('scroll-reveal');
        el.style.setProperty('--delay', `${i * 0.15}s`);
        revealObserver.observe(el);
    });

    document.querySelectorAll('.project-item').forEach((el, i) => {
        el.classList.add('scroll-reveal');
        el.style.setProperty('--delay', `${i * 0.08}s`);
        revealObserver.observe(el);
    });

    const footer = document.querySelector('.footer');
    if (footer) {
        const footerObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.2 });
        footerObs.observe(footer);
    }

    let ticking = false;

    function onParallaxScroll() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrollY < vh) {
            const progress = scrollY / vh;
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            heroContent.style.opacity = 1 - progress * 1.2;
        }

        const heroQuote = document.querySelector('.hero > .hero-quote');
        if (heroQuote && scrollY < vh) {
            heroQuote.style.transform = `translateY(${scrollY * 0.15}px)`;
        }

        document.querySelectorAll('.hero > .hero-bg-pattern').forEach(p => {
            if (scrollY < vh) {
                p.style.transform = `translateY(${scrollY * 0.1}px)`;
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onParallaxScroll);
            ticking = true;
        }
    }, { passive: true });

    const heroSection = document.querySelector('.hero');
    const revealLayer = document.querySelector('.hero-reveal');

    if (heroSection && revealLayer) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            revealLayer.style.transition = 'none';
            revealLayer.style.clipPath = `circle(150px at ${x}px ${y}px)`;
        });

        heroSection.addEventListener('mouseleave', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            revealLayer.style.transition = 'clip-path 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
            revealLayer.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    function typeWriter(element, mainText, sourceText, typeSpeed = 80, deleteSpeed = 50, callback) {
        let phase = 'main';
        let mainIndex = 0;
        let sourceIndex = 0;
        let isDeleting = false;
        
        const sourceInfo = parseSource(sourceText);
        
        function parseSource(text) {
            const result = {
                prefix: '',
                content: ''
            };

            const brMatch = text.match(/^(<br\s*\/?>)/);
            if (brMatch) {
                result.prefix = brMatch[1];
                text = text.substring(brMatch[1].length);
            }

            const smallMatch = text.match(/^<small>([\s\S]*)<\/small>$/);
            if (smallMatch) {
                result.content = smallMatch[1];
            } else {
                result.content = text;
            }

            return result;
        }
        
        function buildDisplayText() {
            let html = mainText.substring(0, mainIndex);
            
            if (phase === 'source' || phase === 'complete') {
                html += sourceInfo.prefix;
                html += '<small>';
                html += sourceInfo.content.substring(0, sourceIndex);
                html += '</small>';
            }
            
            return html;
        }
        
        function render() {
            const displayText = buildDisplayText();
            
            if (phase === 'main' && !isDeleting) {
                element.textContent = displayText;
            } else {
                element.innerHTML = displayText;
            }
        }
        
        function type() {
            if (isDeleting) {
                deleteChar();
                return;
            }
            
            if (phase === 'main') {
                if (mainIndex < mainText.length) {
                    mainIndex++;
                    render();
                    setTimeout(type, typeSpeed);
                } else {
                    phase = 'source';
                    sourceIndex = 0;
                    setTimeout(type, typeSpeed);
                }
            } else if (phase === 'source') {
                if (sourceIndex < sourceInfo.content.length) {
                    sourceIndex++;
                    render();
                    setTimeout(type, typeSpeed);
                } else {
                    phase = 'complete';
                    setTimeout(() => {
                        isDeleting = true;
                        deleteChar();
                    }, 10000);
                }
            }
        }
        
        function deleteChar() {
            if (phase === 'complete' || phase === 'source') {
                if (sourceIndex > 0) {
                    sourceIndex--;
                    render();
                    setTimeout(deleteChar, deleteSpeed);
                } else {
                    phase = 'main';
                    deleteChar();
                }
            } else if (phase === 'main') {
                if (mainIndex > 0) {
                    mainIndex--;
                    render();
                    setTimeout(deleteChar, deleteSpeed);
                } else {
                    element.innerHTML = '';
                    phase = 'main';
                    mainIndex = 0;
                    sourceIndex = 0;
                    isDeleting = false;
                    if (callback) callback();
                }
            }
        }
        
        render();
        type();
    }

    function fetchHitokoto() {
        const hitokotoElement = document.getElementById('hitokoto');
        if (!hitokotoElement) return;
        
        fetch(`https://v1.hitokoto.cn?c=a&c=b&c=c&c=d&c=e&c=f&c=g&c=h&c=i&c=j&c=k&c=l`)
            .then(response => {
                if (!response.ok) throw new Error('网络请求失败');
                return response.json();
            })
            .then(data => {
                let text = data.hitokoto;
                let sourceText = '';
                if (data.from || data.from_who) {
                    sourceText += '<br><small>—— ';
                    if (data.from_who) {
                        sourceText += data.from_who;
                        if (data.from) sourceText += ' · ';
                    }
                    if (data.from) {
                        sourceText += data.from;
                    }
                    sourceText += '</small>';
                }
                typeWriter(hitokotoElement, text, sourceText, 80, 50, fetchHitokoto);
            })
            .catch(error => {
                console.error('获取一言失败:', error);
                hitokotoElement.innerHTML = '一言加载失败，正在重试...';
                setTimeout(fetchHitokoto, 3000);
            });
    }

    setTimeout(fetchHitokoto, 600);

    const avatarClickArea = document.getElementById('avatarClickArea');
    const heroAvatar = document.querySelector('.hero-avatar');

    const messages = [
        "Hi! 很高兴见到你 👋",
        "你发现了一个小秘密 ✨",
        "感谢你的访问 💖",
        "要不要一起喝杯咖啡？ ☕",
        "今天天气不错！",
        "愿你有个美好的一天！"
    ];

    let clickCount = 0;

    function triggerConfettiAndMessage(e, targetElement) {
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const x = (rect.left + rect.right) / 2 / window.innerWidth;
            const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

            confetti({
                particleCount: 150,
                spread: 360,
                startVelocity: 30,
                origin: { x, y }
            });
        } else {
            confetti({
                particleCount: 150,
                spread: 360,
                startVelocity: 30,
                origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
            });
        }

        clickCount++;
        const messageText = messages[clickCount % messages.length];
        
        const messageEl = document.createElement('div');
        messageEl.textContent = messageText;
        messageEl.classList.add('danmaku-message');
        messageEl.style.left = `${e.clientX}px`;
        messageEl.style.top = `${e.clientY}px`;

        document.body.appendChild(messageEl);

        setTimeout(() => {
            messageEl.remove();
        }, 3500);
    }

    if (avatarClickArea) {
        avatarClickArea.addEventListener('click', (e) => {
            avatarClickArea.style.animation = 'likeCardPop 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)';
            avatarClickArea.addEventListener('animationend', () => {
                avatarClickArea.style.animation = '';
            }, { once: true });
            triggerConfettiAndMessage(e, avatarClickArea);
        });
    }

    if (heroAvatar) {
        heroAvatar.addEventListener('click', (e) => {
            triggerConfettiAndMessage(e, heroAvatar);
        });
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
});
