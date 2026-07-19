if (navigator.clipboard) {
	for (const figure of document.querySelectorAll('figure[data-rehype-pretty-code-figure]')) {
		const code = figure.querySelector('code');
		if (!code) continue;

		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'code-copy';
		button.textContent = 'Copy';
		button.setAttribute('aria-label', 'Copy code to clipboard');
		button.addEventListener('click', async () => {
			await navigator.clipboard.writeText(code.textContent ?? '');
			button.textContent = 'Copied';
			window.setTimeout(() => (button.textContent = 'Copy'), 1500);
		});
		figure.append(button);
	}
}
