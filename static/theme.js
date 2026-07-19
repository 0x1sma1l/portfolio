const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');

function currentTheme() {
	return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function updateToggle() {
	if (!toggle) return;

	const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
	toggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
	toggle.setAttribute('title', `Switch to ${nextTheme} theme`);
}

function applyTheme(theme) {
	root.dataset.theme = theme;
	root.style.colorScheme = theme;
	try {
		localStorage.setItem('theme', theme);
	} catch {
		// The theme should still work when storage is unavailable.
	}
	updateToggle();
}

async function changeTheme(event) {
	const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (!document.startViewTransition || reduceMotion) {
		applyTheme(nextTheme);
		return;
	}

	const x = event.clientX;
	const y = event.clientY;
	const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
	const transition = document.startViewTransition(() => applyTheme(nextTheme));

	await transition.ready;
	root.animate(
		{
			clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]
		},
		{
			duration: 550,
			easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
			pseudoElement: '::view-transition-new(root)'
		}
	);
}

updateToggle();
toggle?.addEventListener('click', changeTheme);
