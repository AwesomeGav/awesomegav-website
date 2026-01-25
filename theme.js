// Dark Theme Management
(function() {
    'use strict';

    // Get saved theme from localStorage
    function getSavedTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    // Save theme to localStorage
    function saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    // Apply theme to document
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

    // Initialize theme on page load
    function initTheme() {
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = getSavedTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        saveTheme(newTheme);
        applyTheme(newTheme);
        return newTheme;
    }

    // Export functions to global scope
    window.themeManager = {
        init: initTheme,
        toggle: toggleTheme,
        apply: applyTheme,
        getSaved: getSavedTheme,
        save: saveTheme
    };

    // Auto-initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
