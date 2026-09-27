// --- Form to WhatsApp Direct Integration ---
function sendToWhatsApp(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value || 'Not provided';
    const message = document.getElementById('message').value;
    
    const whatsappNumber = "917982319408"; 
    const whatsappText = `Hello Shiv Shakti Heat Product!%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Requirement:* ${message}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
    
    window.open(whatsappURL, '_blank');
}

// Prefill contact form from Product Cards
function prefillForm(text) {
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.value = text;
        document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
    }
}

// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
    if(themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
} else {
    htmlElement.classList.remove('dark');
    if(themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });
}

// --- Mobile Menu Toggle ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if(mobileMenu.classList.contains('hidden')){
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        }
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        });
    });
}

// --- Gallery Filtering Logic ---
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-brand-red', 'dark:bg-brand-orange', 'text-white');
            b.classList.add('bg-white', 'text-gray-700', 'dark:bg-darkCard', 'dark:text-gray-300');
        });
        btn.classList.remove('bg-white', 'text-gray-700', 'dark:bg-darkCard', 'dark:text-gray-300');
        btn.classList.add('bg-brand-red', 'dark:bg-brand-orange', 'text-white');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        
        if(typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });
});

// --- GSAP & ScrollTrigger Animations ---
document.addEventListener("DOMContentLoaded", (event) => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.gsap-fade-up').forEach(element => {
            gsap.fromTo(element, 
                { y: 40, autoAlpha: 0 }, 
                { 
                    y: 0, 
                    autoAlpha: 1, 
                    duration: 0.8, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        gsap.utils.toArray('.gsap-fade-in').forEach(element => {
            gsap.fromTo(element, 
                { autoAlpha: 0, scale: 0.95 }, 
                { 
                    autoAlpha: 1, 
                    scale: 1,
                    duration: 1, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        gsap.utils.toArray('.gsap-stagger-parent').forEach(parent => {
            const items = parent.querySelectorAll('.gsap-stagger-item');
            gsap.fromTo(items, 
                { y: 30, autoAlpha: 0 }, 
                { 
                    y: 0, 
                    autoAlpha: 1, 
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: parent,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
});