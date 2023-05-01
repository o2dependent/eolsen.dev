<script lang="ts">
	import {
		directory,
		type Directory,
		type DirectoryFile,
		type BlogFileData
	} from '$stores/directory.store';
	import Window from '$lib/window/Window.svelte';
	import type { AppWindow } from '$stores/apps.store';
	import { createHistory } from '$utils/createHistory';
	import BlogHome from './BlogHome.svelte';
	import BlogView from './BlogView.svelte';
	import BlogSideBar from './BlogSideBar.svelte';
	import AppSideBar from '$lib/appComponents/TextFileApp/AppSideBar.svelte';

	export let appWindow: AppWindow;

	const blogDir = (
		($directory?.contents?.['Desktop'] as Directory)?.contents?.['Blogs'] as Directory
	)?.contents;

	let blogs = Object?.keys?.(blogDir ?? {}).map((key) => {
		const blog = {
			...((blogDir[key as keyof typeof blogDir] as DirectoryFile).data as BlogFileData),
			name: key
		};
		return blog;
	});

	let tags = [...new Set(blogs.flatMap((blog) => blog.tags))];

	let history = createHistory('');

	let curBlog: (typeof blogs)[0] | undefined;
	let open = false;

	$: {
		console.log({ $history });
		if ($history.current) {
			curBlog = blogs.find((blog) => blog.name === $history.current);
		} else {
			curBlog = undefined;
		}
	}
</script>

<Window headerClass="!bg-cyan-900" {appWindow} startingWidth="60rem" startingHeight="40rem">
	<div slot="header" class="flex w-full flex-grow px-4">
		<button
			on:click={() => {
				history.replace('');
			}}
			disabled={$history.current === ''}
			class="mr-4 flex h-6 w-6 items-center justify-center rounded bg-black bg-opacity-0 transition-opacity hover:bg-opacity-25 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H9M19 10L21 12M19 10V20C19 20.2652 18.8946 20.5196 18.7071 20.7071C18.5196 20.8946 18.2652 21 18 21H15M9 21C9.26522 21 9.51957 20.8946 9.70711 20.7071C9.89464 20.5196 10 20.2652 10 20V16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15H13C13.2652 15 13.5196 15.1054 13.7071 15.2929C13.8946 15.4804 14 15.7348 14 16V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21M9 21H15"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<button
			on:click={() => {
				history.back();
			}}
			disabled={!$history.canGoBack}
			class="flex h-6 w-6 items-center justify-center rounded bg-black bg-opacity-0 transition-opacity hover:bg-opacity-25 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15 19L8 12L15 5"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<button
			on:click={() => {
				history.forward();
			}}
			disabled={!$history.canGoForward}
			class="flex h-6 w-6 items-center justify-center rounded bg-black bg-opacity-0 transition-opacity hover:bg-opacity-25 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M9 5L16 12L9 19"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<div class="flex w-full flex-grow items-center justify-center pr-12">
			<p>
				Blogs{curBlog ? ` - ${curBlog.name}` : ''}
			</p>
		</div>
	</div>
	<form class="flex h-full w-full min-w-fit bg-white font-mono text-sm text-black">
		{#if curBlog}
			<AppSideBar curItem={curBlog} items={blogs} title="Blogs" bind:open {history} />
		{/if}
		<div
			class="flex-grow overflow-y-auto bg-slate-800 p-4 {open && curBlog
				? 'pl-60 max-h-full'
				: 'pl-0'} transition-all duration-500"
		>
			<div
				class="mx-auto flex h-full w-full flex-col items-center px-2 {curBlog
					? ''
					: 'justify-center'}"
			>
				{#if blogs?.length}
					{#key curBlog}
						{#if curBlog}
							<BlogView {curBlog} />
						{:else}
							<BlogHome {curBlog} {blogs} {history} {tags} />
						{/if}
					{/key}
				{:else}
					<div class="flex flex-col items-center justify-center gap-2">
						<span class="text-2xl font-black text-white">No blogs found</span>
						<span class="text-sm font-thin text-white">Check back later if you'd like</span>
					</div>
				{/if}
			</div>
		</div>
	</form>
</Window>

<style>
	label::-webkit-scrollbar-thumb {
		border-radius: 10px !important;
	}
	.stage::before {
		animation: animateBg 10s linear infinite;
		background-image: linear-gradient(
			90deg,
			#897ed3,
			#5b73df,
			#498ada,
			#208ea2,
			#64b3d9,
			#42eca6,
			#64b3d9,
			#208ea2,
			#498ada,
			#5b73df,
			#897ed3
		);
		background-size: 1100% 100%;
	}
	@keyframes animateBg {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 100% 0%;
		}
	}
</style>
