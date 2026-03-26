/**
 * Dashboard Logic for SpeechCare
 */

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

function initDashboard() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('dashboardSidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
            const icon = sidebarToggle.querySelector('i');
            icon.classList.toggle('bi-list');
            icon.classList.toggle('bi-x-lg');
        });
    }

    // Smooth transition for dashboard panels
    const panels = document.querySelectorAll('.premium-card');
    panels.forEach((panel, index) => {
        panel.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Function to update progress bars dynamically (if needed)
function updateProgress(id, value) {
    const bar = document.getElementById(id);
    if (bar) {
        bar.style.width = `${value}%`;
    }
}
