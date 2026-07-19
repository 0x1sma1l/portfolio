<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head><title>{page.status} — Ismail Muyideen</title></svelte:head>

<section class="error-page">
	<p class="eyebrow">{page.status}</p>
	<h1>{page.status === 404 ? 'That page does not exist.' : 'Something went wrong.'}</h1>
	<p>{page.error?.message ?? 'The request could not be completed.'}</p>
	<a href="/">Return home</a>
</section>
