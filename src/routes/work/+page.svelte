<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Work — Ismail Muyideen</title>
	<meta name="description" content="Selected products and engineering work by Ismail Muyideen." />
</svelte:head>

<section class="index-shell">
	<header class="index-header">
		<p class="eyebrow">Selected work</p>
		<h1>A few things I’ve worked on.</h1>
		<p class="index-subtext">Products, tools, and experiments with enough substance to explain.</p>
	</header>

	<ul class="index-list work-list">
		{#each data.entries as entry (entry.slug)}
			<li>
				<details>
					<summary>
						<span><strong>{entry.title}</strong> — {entry.summary}</span>
						<small>{entry.year} · {entry.role}</small>
					</summary>
					<div class="work-detail">
						<p>{entry.details}</p>
						<p class="work-focus"><span>Focus</span> {entry.topics.join(', ')}</p>
						{#if entry.links}
							<div class="work-links">
								{#if entry.links.live}<a href={entry.links.live}>Visit project</a>{/if}
								{#if entry.links.source}<a href={entry.links.source}>View source</a>{/if}
							</div>
						{/if}
					</div>
				</details>
			</li>
		{/each}
	</ul>
</section>
