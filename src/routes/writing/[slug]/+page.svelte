<script lang="ts" module>
	import type { ContentModule } from '$lib/content/types';

	const modules = import.meta.glob('/src/content/writing/*.svx', {
		eager: true
	}) as Record<string, ContentModule<unknown>>;
</script>

<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const resolveContent = (slug: string) => {
		const module = modules[`/src/content/writing/${slug}.svx`];
		if (!module) throw new Error(`Missing writing module for ${slug}`);
		return module.default;
	};
	const Content = $derived(resolveContent(data.entry.slug));
</script>

<svelte:head>
	<title>{data.entry.title} — Ismail Muyideen</title>
	<meta name="description" content={data.entry.description ?? data.entry.title} />
	<link rel="canonical" href={`https://heyismail.xyz/writing/${data.entry.slug}`} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.entry.title} />
	<meta property="og:description" content={data.entry.description ?? data.entry.title} />
	<meta property="og:url" content={`https://heyismail.xyz/writing/${data.entry.slug}`} />
	<meta property="article:published_time" content={`${data.entry.date}T00:00:00Z`} />
	{#if data.entry.updated}<meta
			property="article:modified_time"
			content={`${data.entry.updated}T00:00:00Z`}
		/>{/if}
	<script src="/code-copy.js" defer></script>
</svelte:head>

<article class="reading-shell">
	<header class="article-header">
		<div class="article-meta-row">
			<a class="article-back" href="/writing" aria-label="Back to writing">← Writing</a>
			<p class="article-kicker">{data.entry.kind} · {data.entry.date}</p>
		</div>
		<h1>{data.entry.title}</h1>
		{#if data.entry.description}<p class="article-deck">{data.entry.description}</p>{/if}
	</header>

	<div class="prose">
		<Content />
	</div>
</article>
