// Get the buttons
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const scrollToBottomBtn = document.getElementById('scrollToBottomBtn');

// Show the buttons based on scroll position
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }

    if (document.body.scrollTop < document.body.scrollHeight - window.innerHeight - 20 ||
        document.documentElement.scrollTop < document.documentElement.scrollHeight - window.innerHeight - 20) {
        scrollToBottomBtn.style.display = 'block';
    } else {
        scrollToBottomBtn.style.display = 'none';
    }
};

// Scroll to the top when the top button is clicked
scrollToTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Scroll to the bottom when the bottom button is clicked
scrollToBottomBtn.onclick = function() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
};
