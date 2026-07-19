<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ label: 'Writing', href: '/writing' },
		{ label: 'Work', href: '/work' }
	];
</script>

<header class="site-header">
	<div class="site-header__inner">
		<a class="wordmark" href="/" aria-label="Ismail Muyideen, home">
			<img src="/ghost_hand.svg" alt="" width="32" height="32" />
			<span>15MA1L</span>
		</a>

		<nav aria-label="Primary navigation">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={page.url.pathname.startsWith(link.href) ? 'page' : undefined}
					>{link.label}</a
				>
			{/each}

			<button class="theme-toggle" type="button" aria-label="Switch to dark theme">
				<svg class="theme-toggle__sun" aria-hidden="true" viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="3.5" />
					<path
						d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
					/>
				</svg>
				<svg class="theme-toggle__moon" aria-hidden="true" viewBox="0 0 24 24">
					<path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
				</svg>
			</button>
		</nav>
	</div>
</header>
