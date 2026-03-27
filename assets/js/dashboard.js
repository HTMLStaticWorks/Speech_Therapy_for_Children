document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const roleSwitcherBtn = document.getElementById('roleSwitcherBtn');
    const activeRoleText = document.getElementById('activeRoleText');
    const roleSwitcherItems = document.querySelectorAll('#roleSwitcherMenu .dropdown-item');
    const parentView = document.getElementById('parentView');
    const adminView = document.getElementById('adminView');
    const sidebar = document.getElementById('dashboardSidebar');
    const backdrop = document.getElementById('dashboardSidebarBackdrop');
    const topbarToggle = document.getElementById('dashboardTopbarToggle');
    const sidebarClose = document.getElementById('dashboardSidebarClose');
    const sidebarLinks = Array.from(document.querySelectorAll('.sidebar-link[data-parent-target]'));
    const profileImage = document.getElementById('dashboardProfileImage');
    const profileName = document.getElementById('dashboardProfileName');
    const profileRole = document.getElementById('dashboardProfileRole');
    
    // Track current role in state
    let currentRole = 'parent';

    const roleProfiles = {
        admin: {
            name: 'Sarah Collins',
            role: 'Speech Therapist',
            image: 'assets/images/team_1.png',
            alt: 'Sarah Collins profile'
        },
        parent: {
            name: 'Mark Smith',
            role: 'Parent',
            image: 'assets/images/team_2.png',
            alt: 'Mark Smith profile'
        }
    };

    function getCurrentRole() {
        return currentRole;
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
        currentRole = role;
        const isAdmin = role === 'admin';
        if (parentView) parentView.style.display = isAdmin ? 'none' : 'block';
        if (adminView) adminView.style.display = isAdmin ? 'block' : 'none';

        const profile = roleProfiles[role] || roleProfiles.parent;
        if (profileImage) {
            profileImage.src = profile.image;
            profileImage.alt = profile.alt;
        }
        if (profileName) profileName.textContent = profile.name;
        if (profileRole) profileRole.textContent = profile.role;

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

    roleSwitcherItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const role = e.target.dataset.value;
            activeRoleText.textContent = e.target.textContent;
            applyRole(role);
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
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

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeSidebar();
        }
    });

    const params = new URLSearchParams(window.location.search);
    const initialRole = params.get('role') === 'admin' ? 'admin' : 'parent';
    if (activeRoleText) {
        activeRoleText.textContent = initialRole === 'admin' ? 'Admin View' : 'Parent View';
    }
    applyRole(initialRole);
});
