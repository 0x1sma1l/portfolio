<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Writing — Ismail Muyideen</title>
</svelte:head>

<section class="index-shell">
	<header class="index-header">
		<p class="eyebrow">Notebook</p>
		<h1>Writing</h1>
		<p class="index-subtext">
			Notes are frequent and close to the work. Articles are slower and more deliberate.
		</p>
	</header>

	{#if data.entries.length === 0}
		<p class="empty-copy">No published writing yet. The notebook is being prepared.</p>
	{:else}
		<ul class="index-list writing-list">
			{#each data.entries as entry (entry.slug)}
				<li>
					<a href={`/writing/${entry.slug}`}>
						<span>{entry.title}</span>
						<small>{entry.kind} · {entry.date}</small>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>
