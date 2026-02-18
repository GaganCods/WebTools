document.addEventListener('DOMContentLoaded', async () => {

    // 1. Load Components
    await loadComponent('global-header', '/assets/components/header.html');
    await loadComponent('global-footer', '/assets/components/footer.html');

    // 2. Initialize UI Logic (after components are loaded)
    initMobileMenu();
    highlightActiveLink();
});

async function loadComponent(elementId, path) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}`);
        const html = await response.text();
        element.innerHTML = html;
        console.log(`Loaded ${path}`);
    } catch (error) {
        console.error(error);
        element.innerHTML = `<div class="p-4 text-red-500">Error loading component. Please run on a local server.</div>`;
    }
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const panel = document.getElementById('mobile-menu-panel');
    const backdrop = document.getElementById('mobile-menu-backdrop');

    // Safety check - if components not loaded yet or IDs changed
    if (!btn || !panel || !backdrop) return;

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
        if (isOpen) {
            // Open
            backdrop.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                backdrop.classList.remove('opacity-0');
                panel.classList.remove('invisible', 'scale-95', 'opacity-0');
                panel.classList.add('visible', 'scale-100', 'opacity-100');
            }, 10);
            document.body.classList.add('overflow-hidden');
        } else {
            // Close
            backdrop.classList.add('opacity-0');
            panel.classList.remove('visible', 'scale-100', 'opacity-100');
            panel.classList.add('invisible', 'scale-95', 'opacity-0');
            document.body.classList.remove('overflow-hidden');

            // Wait for transition to finish before hiding backdrop
            setTimeout(() => {
                backdrop.classList.add('hidden');
            }, 300);
        }
    }

    // Toggle Button
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close on Backdrop Click
    backdrop.addEventListener('click', () => {
        if (isOpen) toggleMenu();
    });

    // Close on Link Click
    panel.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isOpen) toggleMenu();
        });
    });

    // Close on Outside Click (if backdrop fails for some reason or user clicks header space)
    document.addEventListener('click', (e) => {
        if (isOpen && !panel.contains(e.target) && !btn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) toggleMenu();
    });
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;

    // Normalize path (remove trailing slash for comparison if needed, or handle both)
    // Simple check: active class for nav links that match current href
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        const linkPath = link.getAttribute('href');

        // Exact match or active parent (e.g. /tools/ for /tool/xyz)
        if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
            link.classList.add('text-blue-500'); // Desktop
            link.classList.remove('text-slate-400', 'text-slate-300');

            // Mobile specific active styles if needed
            if (link.classList.contains('mobile-link')) {
                link.classList.add('bg-slate-800', 'text-white');
            }
        }
    });
}
