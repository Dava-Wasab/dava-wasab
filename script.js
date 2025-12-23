// PREMIUM PORTFOLIO - INTERACTIVE FEATURES
// Clean animations without cursor trail

// ==========================================
// REDIRECT SYSTEM
// ==========================================
const redirectLinks = {
    'telegram-channel': 'https://t.me/DavasMueslis',
    'telegram-live': 'https://t.me/Dava_Wasab',
    'discord-server': 'https://discord.com/invite/e4qS8pr2vz',
    'discord-dm': 'https://discord.com/users/1047829202705059840',
    'bluesky': 'https://bsky.app/profile/dava-wasab.bsky.social',
    'twitter': 'https://x.com/Dava_Wasab'
};

function redirect(key) {
    const url = redirectLinks[key];
    if (url) {
        try {
            console.log(`%c🔗 Redirecting to: ${key}`, 'color: #E0FF00; font-size: 12px;');
            console.log(`%c→ ${url}`, 'color: #87C93D; font-size: 11px;');
        } catch (e) {
            // Suppress extension errors
        }
        window.open(url, '_blank');
    }
    return false;
}

// Redirect system is available but not logged to console
// Use: redirect("key"), listRedirects(), getRedirect("key")

// ==========================================
// COPY TO CLIPBOARD FUNCTION
// ==========================================
function copyToClipboard(text, event) {
    event.preventDefault();
    event.stopPropagation();

    navigator.clipboard.writeText(text).then(() => {
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Copied: ' + text;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Make function globally accessible
window.copyToClipboard = copyToClipboard;

// ==========================================
// PAYMENT CARDS CURRENCY DISPLAY
// ==========================================
function showCurrencies(cardType) {
    const currenciesElement = document.getElementById(`${cardType}-currencies`);
    if (currenciesElement) {
        currenciesElement.classList.add('show');
    }
}

function hideCurrencies() {
    const allCurrencies = document.querySelectorAll('.card-currencies');
    allCurrencies.forEach(el => {
        el.classList.remove('show');
    });
}

// Make functions globally accessible
window.showCurrencies = showCurrencies;
window.hideCurrencies = hideCurrencies;

// Make redirect function globally accessible
window.redirect = redirect;

// Function to list all redirects
window.listRedirects = function () {
    try {
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #E0FF00;');
        console.log('%c✨ Minecraft Designer • Own Site Portfolio', 'color: #E0FF00; font-size: 14px; font-weight: bold;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #E0FF00;');
        Object.entries(redirectLinks).forEach(([key, url]) => {
            console.log(`%c  ${key}`, 'color: #E0FF00; font-weight: bold;');
            console.log(`%c    ${url}`, 'color: #87C93D;');
        });
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #E0FF00;');
    } catch (e) {
        // Suppress extension errors
        console.log('Redirects:', redirectLinks);
    }
};

// Function to get specific redirect URL
window.getRedirect = function (key) {
    return redirectLinks[key] || null;
};

// ==========================================
// ANIMATED PARTICLES BACKGROUND
// ==========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        const duration = Math.random() * 25 + 20;
        particle.style.animationDuration = `${duration}s`;

        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;

        const tx = (Math.random() - 0.5) * 250;
        const ty = (Math.random() - 0.5) * 250;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        particlesContainer.appendChild(particle);
    }
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;

            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// NAVBAR SCROLL EFFECT & SCROLL HINT
// ==========================================
const navbar = document.querySelector('.navbar');
const scrollHint = document.getElementById('scrollHint');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(1, 0, 13, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';

        // Hide scroll hint
        if (scrollHint) {
            scrollHint.classList.add('hidden');
        }
    } else {
        navbar.style.background = 'rgba(1, 0, 13, 0.85)';
        navbar.style.boxShadow = 'none';

        // Show scroll hint
        if (scrollHint) {
            scrollHint.classList.remove('hidden');
        }
    }
});

// ==========================================
// ACTIVE NAV LINK
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SKIN CARD LIGHTBOX
// ==========================================
const skinCards = document.querySelectorAll('.skin-card');

skinCards.forEach((card, index) => {
    card.addEventListener('click', function () {
        const img = this.querySelector('.skin-image');
        const imgSrc = img.src;

        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(1, 0, 13, 0.98);
            backdrop-filter: blur(20px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 40px;
        `;

        const lightboxImg = document.createElement('img');
        lightboxImg.src = imgSrc;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 20px;
            box-shadow: 0 20px 80px rgba(0, 0, 0, 0.8);
            transform: scale(0.95);
            transition: transform 0.3s ease;
        `;

        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: rgba(224, 255, 0, 0.1);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(224, 255, 0, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            color: #E0FF00;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 300;
        `;

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = 'rgba(224, 255, 0, 0.2)';
            closeBtn.style.transform = 'scale(1.1)';
        });

        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'rgba(224, 255, 0, 0.1)';
            closeBtn.style.transform = 'scale(1)';
        });

        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            lightbox.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 10);

        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.95)';
            document.body.style.overflow = '';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        };

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === closeBtn) {
                closeLightbox();
            }
        });

        const closeOnEsc = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', closeOnEsc);
            }
        };
        document.addEventListener('keydown', closeOnEsc);
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.widget, .skin-card, .social-card').forEach(element => {
    observer.observe(element);
});

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%) scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: translate(-50%, -50%) scale(15);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// LOADING SCREEN
// ==========================================
// Hide loader as soon as DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        // Check if all critical resources are loaded
        if (document.readyState === 'complete') {
            hideLoader(loader);
        } else {
            window.addEventListener('load', () => hideLoader(loader));
        }
    }
});

function hideLoader(loader) {
    // Quick fade out
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }, 200); // Minimal delay for smooth appearance
}

// ==========================================
// CONSOLE BRANDING
// ==========================================
try {
    console.log('%c DAVA_WASAB ', 'background: #E0FF00; color: #01000D; font-size: 20px; font-weight: bold; padding: 10px 20px;');
    console.log('%c Minecraft Designer • Own Site Portfolio ', 'color: #F0FFD0; font-size: 14px; padding: 5px 0;');
    console.log('%c DM me in Discord: Dava_Wasab ', 'color: #E0FF00; font-size: 12px;');
    console.log('%c or with link: https://discord.com/users/1047829202705059840 ', 'color: #87C93D; font-size: 12px;');
} catch (e) {
    // Suppress extension errors
}

// ==========================================
// GALLERY TABS
// ==========================================
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryContainers = document.querySelectorAll('.gallery-container');

galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetGallery = tab.getAttribute('data-gallery');

        // Remove active class from all tabs
        galleryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Hide all galleries
        galleryContainers.forEach(container => {
            container.classList.remove('active');
        });

        // Show target gallery
        const targetContainer = document.getElementById(`gallery-${targetGallery}`);
        if (targetContainer) {
            targetContainer.classList.add('active');
        }
    });
});

// ==========================================
// DYNAMIC AGE CALCULATION
// ==========================================
function calculateAge() {
    const birthDate = new Date(2010, 7, 23); // August 23, 2010 (month is 0-indexed)
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If birthday hasn't occurred this year yet, subtract 1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function updateAge() {
    const ageElement = document.querySelector('.stat-value');
    if (ageElement && ageElement.textContent.includes('Y.O.')) {
        const currentAge = calculateAge();
        ageElement.textContent = `${currentAge} Y.O.`;
    }
}

// ==========================================
// IMAGE PROTECTION
// ==========================================
// Disable right-click on images
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Disable dragging images
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Disable image selection
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.style.userSelect = 'none';
    img.style.webkitUserSelect = 'none';
    img.style.mozUserSelect = 'none';
    img.style.msUserSelect = 'none';
    img.setAttribute('draggable', 'false');
});

// ==========================================
// UTC+2 DIGITAL CLOCK
// ==========================================
function updateClock() {
    const clockElement = document.getElementById('utcClock');
    if (!clockElement) return;

    const now = new Date();
    // Get UTC time and add 2 hours
    const utcPlus2 = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (2 * 3600000));

    const hours = String(utcPlus2.getHours()).padStart(2, '0');
    const minutes = String(utcPlus2.getMinutes()).padStart(2, '0');
    const seconds = String(utcPlus2.getSeconds()).padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    const timeElement = clockElement.querySelector('.clock-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// ==========================================
// VISITOR COUNTER WITH SMOOTH ANIMATION
// ==========================================
function initVisitorCounter() {
    const today = new Date().toDateString();
    const now = Date.now();

    // Get stored data
    let visitorData = localStorage.getItem('visitorData');
    if (visitorData) {
        try {
            visitorData = JSON.parse(visitorData);
            if (!Array.isArray(visitorData.todayVisits)) {
                visitorData.todayVisits = [];
            }
            if (!Array.isArray(visitorData.activeSessions)) {
                visitorData.activeSessions = [];
            }
        } catch (e) {
            visitorData = {
                date: today,
                todayVisits: [],
                activeSessions: []
            };
        }
    } else {
        visitorData = {
            date: today,
            todayVisits: [],
            activeSessions: []
        };
    }

    // Reset counter if new day
    if (visitorData.date !== today) {
        visitorData = {
            date: today,
            todayVisits: [],
            activeSessions: []
        };
    }

    // Generate unique visitor ID
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
        visitorId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('visitorId', visitorId);
    }

    // Add to today's visits
    if (!visitorData.todayVisits.includes(visitorId)) {
        visitorData.todayVisits.push(visitorId);
    }

    // Clean up old sessions (5 minutes)
    visitorData.activeSessions = visitorData.activeSessions.filter(s => now - s.time < 300000);

    // Update current session
    const existingSession = visitorData.activeSessions.findIndex(s => s.id === visitorId);
    if (existingSession !== -1) {
        visitorData.activeSessions[existingSession].time = now;
    } else {
        visitorData.activeSessions.push({ id: visitorId, time: now });
    }

    // Save data
    localStorage.setItem('visitorData', JSON.stringify(visitorData));

    // Get elements
    const todayCount = document.getElementById('todayCount');
    const onlineCount = document.getElementById('onlineCount');

    // Calculate counts with proper logic
    const onlineTotal = Math.max(1, visitorData.activeSessions.length);
    const todayTotal = Math.max(onlineTotal + 1, visitorData.todayVisits.length);

    // Animate counters with smooth transition
    if (todayCount && onlineCount) {
        animateCounter(onlineCount, 0, onlineTotal, 1200);
        setTimeout(() => {
            animateCounter(todayCount, 0, todayTotal, 1200);
        }, 300);
    }

    // Visitor stats (silent mode for production)

    // Update sessions every 30 seconds
    setInterval(() => {
        const currentTime = Date.now();
        let data = JSON.parse(localStorage.getItem('visitorData'));

        if (data) {
            data.activeSessions = data.activeSessions.filter(s => currentTime - s.time < 300000);

            const session = data.activeSessions.find(s => s.id === visitorId);
            if (session) {
                session.time = currentTime;
            }

            localStorage.setItem('visitorData', JSON.stringify(data));

            const newOnlineTotal = Math.max(1, data.activeSessions.length);
            const newTodayTotal = Math.max(newOnlineTotal + 1, data.todayVisits.length);

            if (onlineCount && todayCount) {
                const currentOnline = parseInt(onlineCount.textContent) || 0;
                const currentToday = parseInt(todayCount.textContent) || 0;

                if (currentOnline !== newOnlineTotal) {
                    animateCounter(onlineCount, currentOnline, newOnlineTotal, 800);
                }

                if (currentToday !== newTodayTotal) {
                    setTimeout(() => {
                        animateCounter(todayCount, currentToday, newTodayTotal, 800);
                    }, 200);
                }
            }
        }
    }, 30000);
}

// ==========================================
// COPY NAME TO CLIPBOARD
// ==========================================
function initCopyableName() {
    // Find all elements with copyable-name class
    const copyableElements = document.querySelectorAll('.copyable-name');

    copyableElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.style.transition = 'color 0.2s ease';

        element.addEventListener('click', (e) => {
            e.preventDefault();

            // Copy to clipboard
            const textToCopy = 'Dava_Wasab';

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showCopyNotification(element);
                }).catch(() => {
                    fallbackCopy(textToCopy, element);
                });
            } else {
                fallbackCopy(textToCopy, element);
            }
        });

        element.addEventListener('mouseenter', () => {
            element.style.color = 'var(--accent-green)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.color = '';
        });
    });
}

function fallbackCopy(text, element) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showCopyNotification(element);
    } catch (err) {
        console.error('Copy failed');
    }

    document.body.removeChild(textarea);
}

function showCopyNotification(element) {
    const notification = document.createElement('div');
    notification.textContent = '✓ Copied!';
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--accent-green);
        color: var(--bg-dark);
        padding: 16px 32px;
        border-radius: 12px;
        font-family: 'Unbounded', sans-serif;
        font-weight: 700;
        font-size: 18px;
        z-index: 999999;
        animation: copyNotification 0.5s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'copyNotificationOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 1500);
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==========================================
// RIPPLE EFFECT ON WIDGETS
// ==========================================
document.querySelectorAll('.widget').forEach(widget => {
    widget.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ==========================================
// INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Create particles background
    createParticles();

    // Update age on load
    updateAge();

    // Check age daily (in case page stays open)
    setInterval(updateAge, 86400000); // 24 hours

    // Apply image protection to all images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.style.userSelect = 'none';
        img.setAttribute('draggable', 'false');
    });

    // Start clock
    updateClock();
    setInterval(updateClock, 1000); // Update every second

    // Initialize visitor counter
    initVisitorCounter();

    // Initialize copyable name
    initCopyableName();

    // Initialize ripple effect on widgets
    document.querySelectorAll('.widget').forEach(widget => {
        widget.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
