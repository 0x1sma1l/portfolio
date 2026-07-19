<script lang="ts">
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Global meta tags (can be overridden in specific pages if needed) -->
	<meta
		name="description"
		content="Notes, articles, and selected work from Ismail Muyideen, a software engineer learning systems from first principles."
	/>
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Ismail Muyideen" />
	<meta property="og:image" content="https://heyismail.xyz/og-default.svg" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="alternate" type="application/rss+xml" title="Ismail Muyideen" href="/rss.xml" />
	<link rel="icon" href="/ghost_hand.svg" type="image/svg+xml" />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to content</a>

<Header />

<main id="main-content">
	{@render children()}
</main>

<Footer />
