// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("TekPlay scripts initialized!");

    // --- START: LOADER SCRIPT ---
    const loaderOverlay = document.getElementById('loader-overlay');
    const bodyElement = document.body;

    if (loaderOverlay) {
        console.log("Loader overlay found. Initializing loader.");
        bodyElement.classList.add('loader-active'); // Prevent scrolling

        // Set timeout to hide loader (3 to 5 seconds)
        // Math.random() * (max - min) + min
        const loadTime = Math.random() * (5000 - 3000) + 3000; // Random between 3000ms and 5000ms
        // const loadTime = 4000; // Or a fixed time, e.g., 4 seconds

        console.log(`Loader will display for approximately ${Math.round(loadTime / 1000)} seconds.`);

        setTimeout(() => {
            loaderOverlay.classList.add('hidden');
            bodyElement.classList.remove('loader-active'); // Allow scrolling
            console.log("Loader hidden. Website content should be visible.");

            // Optional: Remove the loader from DOM after transition to save resources
            // setTimeout(() => {
            //     loaderOverlay.remove();
            // }, 500); // Must be same as CSS transition duration for opacity/visibility
        }, loadTime);
    } else {
        console.warn("Loader overlay element not found. Skipping loader.");
        bodyElement.classList.remove('loader-active'); // Ensure scrolling is enabled if loader is missing
    }
    // --- END: LOADER SCRIPT ---

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
    const desktopNavLinks = document.querySelectorAll('.main-nav .nav-link');
    const mobileInternalNavLinks = document.querySelectorAll('.mobile-nav a[href^="#"]'); // Assuming you updated this selector as per prev advice

    function setActiveLink(clickedLink, allLinks) {
        allLinks.forEach(link => link.classList.remove('active-nav-item'));
        if (clickedLink) { // Check if clickedLink is not null/undefined
            clickedLink.classList.add('active-nav-item');
        }
    }

    function handleNavLinkClick(event, allLinks) { // Combined function from previous advice
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            event.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveLink(this, allLinks);

                if (mobileNavMenu && mobileNavMenu.classList.contains('active') && event.currentTarget.closest('.mobile-nav')) {
                    mobileNavMenu.classList.remove('active');
                    navToggleMobile.setAttribute('aria-expanded', 'false');
                    mobileNavMenu.setAttribute('aria-hidden', 'true');
                    hamburgerIcon.style.display = 'block';
                    closeIcon.style.display = 'none';
                }
            }
        }
    }

    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) { handleNavLinkClick.call(this, e, desktopNavLinks); });
    });
    mobileInternalNavLinks.forEach(link => { // Assuming you updated this selector as per prev advice
        link.addEventListener('click', function(e) { handleNavLinkClick.call(this, e, mobileInternalNavLinks); });
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
        });
    });

    // --- Search Button Placeholder ---
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            console.log("Search button clicked. Implement search functionality.");
            alert("Search functionality coming soon!");
        });
    }

    // --- Profile Button Placeholder ---
    const profileButton = document.querySelector('.profile-button');
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            console.log("Profile button clicked. Implement profile/login functionality.");
            alert("Profile/Login functionality coming soon!");
        });
    }

    // --- Intersection Observer for scroll-based active nav item (optional enhancement) ---
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0 && desktopNavLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-70px 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            let currentActiveSectionId = null;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentActiveSectionId = entry.target.id;
                }
            });

            if (currentActiveSectionId) {
                 desktopNavLinks.forEach(navLink => {
                    if (navLink.getAttribute('href') === `#${currentActiveSectionId}`) {
                        setActiveLink(navLink, desktopNavLinks);
                    }
                });
                 mobileInternalNavLinks.forEach(navLink => {
                    if (navLink.getAttribute('href') === `#${currentActiveSectionId}`) {
                        setActiveLink(navLink, mobileInternalNavLinks);
                    }
                });
            } else {
                if (window.scrollY === 0) {
                    const firstNavLink = document.querySelector('.main-nav .nav-link[href="#home"], .main-nav .nav-link[href="#shows"]');
                    setActiveLink(firstNavLink, desktopNavLinks);
                    const firstMobileNavLink = document.querySelector('.mobile-nav a[href="#home"], .mobile-nav a[href="#shows"]');
                    setActiveLink(firstMobileNavLink, mobileInternalNavLinks);
                }
            }
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // =====================================================================
    // START: SFX CODE (HTML5 Audio Approach)
    // =====================================================================
    console.log("Initializing SFX (HTML5 Audio)...");

    const hoverSound = document.getElementById('sfx-hover-sound');
    const clickSound = document.getElementById('sfx-click-sound');

    let audioUnlocked = false;

    function unlockAudio() {
        if (!audioUnlocked) {
            // Attempt to play and pause to satisfy browser autoplay policies
            // Muting them first can help avoid a tiny blip of sound if they're not silent.
            if (hoverSound) {
                const wasMuted = hoverSound.muted;
                hoverSound.muted = true;
                hoverSound.play().then(() => {
                    hoverSound.pause();
                    hoverSound.currentTime = 0; // Reset
                    hoverSound.muted = wasMuted; // Restore original muted state
                }).catch(e => { /* console.warn("Unlock play/pause hover failed:", e) */ });
            }
            if (clickSound) {
                const wasMuted = clickSound.muted;
                clickSound.muted = true;
                clickSound.play().then(() => {
                    clickSound.pause();
                    clickSound.currentTime = 0; // Reset
                    clickSound.muted = wasMuted; // Restore original muted state
                }).catch(e => { /* console.warn("Unlock play/pause click failed:", e) */ });
            }
            audioUnlocked = true;
            console.log('Audio unlocked by user gesture.');
            // Remove the event listener after the first interaction as it's no longer needed
            document.body.removeEventListener('click', unlockAudioOnFirstGesture);
            document.body.removeEventListener('keydown', unlockAudioOnFirstGesture);
        }
    }
    
    // Renamed the function for clarity in the listener
    function unlockAudioOnFirstGesture() {
        unlockAudio();
    }

    // Add event listeners for the first user gesture to unlock audio
    document.body.addEventListener('click', unlockAudioOnFirstGesture, { once: true });
    document.body.addEventListener('keydown', unlockAudioOnFirstGesture, { once: true });

    // Hover SFX
    const hoverElements = document.querySelectorAll('[data-sfx-hover]');
    if (hoverElements.length > 0) {
        console.log(`Found ${hoverElements.length} elements for hover SFX.`);
        hoverElements.forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                // console.log('Mouse enter on:', elem); // Debug
                if (hoverSound && audioUnlocked) {
                    hoverSound.currentTime = 0;
                    hoverSound.play().catch(error => {
                        // This catch is important, especially for hover before audio is unlocked
                        // console.warn("Hover sound play failed (possibly autoplay policy):", error);
                    });
                } else if (!audioUnlocked) {
                    // console.log("Hover attempt: Audio not yet unlocked.");
                } else if (!hoverSound) {
                    // console.warn("hoverSound element not found");
                }
            });
        });
    } else {
        console.warn("No elements found with [data-sfx-hover]");
    }

    // Click SFX
    const clickElements = document.querySelectorAll('[data-sfx-click]');
    if (clickElements.length > 0) {
        console.log(`Found ${clickElements.length} elements for click SFX.`);
        clickElements.forEach(elem => {
            elem.addEventListener('click', (event) => { // Added event parameter
                // console.log('Click event on:', elem); // Debug
                // Ensure audio is unlocked by this click if it wasn't already by a body click
                if (!audioUnlocked) {
                    unlockAudio(); // Call the main unlock function
                }

                if (clickSound) {
                    clickSound.currentTime = 0;
                    clickSound.play().catch(error => {
                        console.error("Click sound play failed:", error);
                    });
                } else {
                    // console.warn("clickSound element not found");
                }
                // Note: If the clicked element is a link that navigates,
                // the sound might get cut off. For internal # links, it's usually fine.
            });
        });
    } else {
        console.warn("No elements found with [data-sfx-click]");
    }
    // =====================================================================
    // END: SFX CODE
    // =====================================================================

}); // End DOMContentLoaded