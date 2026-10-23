// --- 1. Parallax Scroll Effect ---
const layers = document.querySelectorAll('.parallax-layer');

// Listen for scroll events on the window
window.addEventListener('scroll', () => {
    // Get the current scroll position in pixels
    let scrollPosition = window.scrollY;

    // Loop through each layer and calculate its new position
    layers.forEach(layer => {
        // Read the custom data-speed attribute we set in the HTML
        let speed = layer.getAttribute('data-speed');
        
        // Calculate the Y offset. 
        // We use scrollPosition * speed so each layer moves at a different rate.
        let yOffset = scrollPosition * speed;
        
        // Apply the transform. Using translateY is highly performant.
        layer.style.transform = `translateY(${yOffset}px)`;
    });
});

// --- 2. Scroll Reveal Animations (Content Section) ---
const revealElements = document.querySelectorAll('.reveal');

// Configuration for the observer
const observerOptions = {
    root: null, // viewport
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px"
};

// Create the Intersection Observer
const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // If the element is in view
        if (entry.isIntersecting) {
            // Add the 'active' class to trigger the CSS transition
            entry.target.classList.add('active');
            
            // Unobserve the element so it only animates once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Attach the observer to every element with the '.reveal' class
revealElements.forEach(el => {
    scrollObserver.observe(el);
});
