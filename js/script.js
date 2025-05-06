// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("TekPlay scripts initialized!");

    // --- Mobile Navigation Toggle ---
    const navToggleMobile = document.querySelector('.nav-toggle-mobile');
    const mobileNavMenu = document.getElementById('navListMobile');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (navToggleMobile && mobileNavMenu && hamburgerIcon && closeIcon) {
        navToggleMobile.addEventListener('click', () => {
            const isExpanded = mobileNavMenu.classList.toggle('active');
            navToggleMobile.setAttribute('aria-expanded', isExpanded);
            mobileNavMenu.setAttribute('aria-hidden', !isExpanded);

            if (isExpanded) {
                hamburgerIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            } else {
                hamburgerIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
    } else {
        console.warn("Mobile navigation elements not found.");
    }

    // --- Smooth Scroll for Nav Links & Active State ---
    // Desktop Nav
    const desktopNavLinks = document.querySelectorAll('.main-nav .nav-link');
    // Mobile Nav (if you add smooth scroll for it too)
    // const mobileNavLinks = document.querySelectorAll('.mobile-nav a[href^="#"]');

    function setActiveLink(clickedLink, allLinks) {
        allLinks.forEach(link => link.classList.remove('active-nav-item'));
        clickedLink.classList.add('active-nav-item');
    }

    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveLink(this, desktopNavLinks);

                    // Close mobile menu if open and a link is clicked
                    if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
                        mobileNavMenu.classList.remove('active');
                        navToggleMobile.setAttribute('aria-expanded', 'false');
                        mobileNavMenu.setAttribute('aria-hidden', 'true');
                        hamburgerIcon.style.display = 'block';
                        closeIcon.style.display = 'none';
                    }
                }
            }
        });
    });

    // --- Copyright Year Update ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Card Interaction (Placeholder for future actions) ---
    const contentCards = document.querySelectorAll('.content-item-card .card-link');
    contentCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default navigation for now
            const cardTitle = this.querySelector('.card-title').textContent;
            const cardSubtitle = this.querySelector('.card-subtitle').textContent;
            console.log(`Card clicked: "${cardTitle}" - ${cardSubtitle}. URL: ${this.href}`);
            alert(`You clicked on "${cardTitle}"!`);
            // TODO: Implement actual navigation or content loading logic here
            // For example: window.location.href = this.href;
        });
    });

    // --- Search Button Placeholder ---
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            console.log("Search button clicked. Implement search functionality.");
            alert("Search functionality coming soon!");
            // TODO: Implement search modal or page navigation
        });
    }

    // --- Profile Button Placeholder ---
    const profileButton = document.querySelector('.profile-button');
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            console.log("Profile button clicked. Implement profile/login functionality.");
            alert("Profile/Login functionality coming soon!");
            // TODO: Implement profile modal or page navigation
        });
    }

    // --- Intersection Observer for scroll-based active nav item (optional enhancement) ---
    const sections = document.querySelectorAll('section[id]'); // Assumes your main content sections have IDs
    if (sections.length > 0 && desktopNavLinks.length > 0) {
        const observerOptions = {
            root: null, // relative to document viewport
            rootMargin: '0px',
            threshold: 0.4 // 40% of section in view
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const visibleSectionId = entry.target.id;
                    desktopNavLinks.forEach(navLink => {
                        if (navLink.getAttribute('href') === `#${visibleSectionId}`) {
                            setActiveLink(navLink, desktopNavLinks);
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }


    // Add any other simple JS-based animations or interactions here
    // For example, a subtle fade-in for cards on scroll if desired,
    // but CSS animations are generally preferred for performance unless complex logic is needed.

}); // End DOMContentLoaded