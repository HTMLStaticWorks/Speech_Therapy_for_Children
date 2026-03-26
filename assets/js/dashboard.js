document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const roleSwitcher = document.getElementById('roleSwitcher');
    const parentView = document.getElementById('parentView');
    const adminView = document.getElementById('adminView');
    const sidebar = document.getElementById('dashboardSidebar');
    const backdrop = document.getElementById('dashboardSidebarBackdrop');
    const topbarToggle = document.getElementById('dashboardTopbarToggle');
    const sidebarClose = document.getElementById('dashboardSidebarClose');
    const sidebarLinks = Array.from(document.querySelectorAll('.sidebar-link[data-parent-target]'));

    function getCurrentRole() {
        return roleSwitcher?.value === 'admin' ? 'admin' : 'parent';
    }

    function setActivePanel(targetId) {
        const role = getCurrentRole();
        const panels = document.querySelectorAll(`#${role}View .dashboard-panel`);

        panels.forEach((panel) => {
            panel.classList.toggle('active', panel.id === targetId);
        });

        sidebarLinks.forEach((link) => {
            const expected = role === 'admin' ? link.dataset.adminTarget : link.dataset.parentTarget;
            link.classList.toggle('active', expected === targetId);
        });
    }

    function applyRole(role) {
        const isAdmin = role === 'admin';
        if (parentView) parentView.style.display = isAdmin ? 'none' : 'block';
        if (adminView) adminView.style.display = isAdmin ? 'block' : 'none';

        const activeLink = sidebarLinks.find((link) => link.classList.contains('active')) || sidebarLinks[0];
        const target = isAdmin ? activeLink?.dataset.adminTarget : activeLink?.dataset.parentTarget;
        if (target) {
            setActivePanel(target);
        }
    }

    function openSidebar() {
        if (!sidebar) return;
        sidebar.classList.add('show');
        backdrop?.classList.add('show');
        body.classList.add('overflow-hidden');
    }

    function closeSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove('show');
        backdrop?.classList.remove('show');
        body.classList.remove('overflow-hidden');
    }

    roleSwitcher?.addEventListener('change', (event) => {
        applyRole(event.target.value);
        if (window.innerWidth <= 1024) {
            closeSidebar();
        }
    });

    sidebarLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const role = getCurrentRole();
            const target = role === 'admin' ? link.dataset.adminTarget : link.dataset.parentTarget;
            if (target) {
                setActivePanel(target);
            }
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });

    topbarToggle?.addEventListener('click', openSidebar);
    sidebarClose?.addEventListener('click', closeSidebar);
    backdrop?.addEventListener('click', closeSidebar);

    const params = new URLSearchParams(window.location.search);
    const initialRole = params.get('role') === 'admin' ? 'admin' : 'parent';
    if (roleSwitcher) {
        roleSwitcher.value = initialRole;
    }
    applyRole(initialRole);
});
