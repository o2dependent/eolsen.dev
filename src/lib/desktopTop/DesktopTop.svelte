<script lang="ts">
	import type { AppTabs, Tab } from "./appTabs";
	import { clickOutside } from "../../utils/clickOutside";
	import {
		apps,
		addApp,
		focusApp,
		type AppWindow,
		type AppNames,
	} from "$stores/apps.store";
	import CurrentTime from "./CurrentTime.svelte";
	import { activeTab, appTabs } from "./appTabs";
	import DesktopTopRight from "./DesktopTopRight.svelte";

	let activeApp: AppWindow | undefined;

	const systemInfoContent: Tab["content"] = [
		{
			name: "About this site",
			onClick: () => {
				const app = $apps?.find?.((app) => app?.name === "About Site");
				if (app) {
					focusApp(app.id);
				} else {
					addApp("About Site");
				}
			},
		},
		{
			name: "Shut Down",
			onClick: () => {
				// navigate back to "/"
				window.location.href = "/";
			},
		},
	];

	$: {
		activeApp = [...$apps].reverse().find((app) => app.name !== "About Site");
	}
</script>

<div
	class="z-10 flex w-full bg-black/20 px-[1.125rem] text-sm shadow-sm"
	use:clickOutside={() => activeTab.set("")}
>
	<div id="desktop-top-left" class="flex flex-grow items-center">
		<div class="relative">
			<button
				type="button"
				on:mouseenter={() => {
					if ($activeTab) {
						activeTab.set("system-info");
					}
				}}
				on:click={() => {
					activeTab.set($activeTab === "system-info" ? "" : "system-info");
				}}
				class:active={$activeTab === "system-info"}
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 512 512"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						cx="256"
						cy="256"
						r="235"
						stroke="#F8FAFC"
						stroke-width="42"
					/>
					<mask
						id="mask0_9209_886"
						style="mask-type:alpha"
						maskUnits="userSpaceOnUse"
						x="31"
						y="31"
						width="449"
						height="449"
					>
						<circle cx="255.5" cy="255.5" r="224.5" fill="#F8FAFC" />
					</mask>
					<g mask="url(#mask0_9209_886)">
						<mask
							id="mask1_9209_886"
							style="mask-type:alpha"
							maskUnits="userSpaceOnUse"
							x="-43"
							y="-23"
							width="560"
							height="554"
						>
							<rect
								x="-42.0186"
								y="438.588"
								width="557.981"
								height="91.5437"
								fill="#F8FAFC"
							/>
							<rect
								x="-42.0186"
								y="-22.4004"
								width="557.981"
								height="91.5437"
								fill="#F8FAFC"
							/>
							<path
								d="M-42.0186 287.105H271.846V232.614H-42.0186L-41.9421 123.634H516.038L515.962 384.097H-42.0186V287.105Z"
								fill="#F8FAFC"
							/>
						</mask>
						<g mask="url(#mask1_9209_886)">
							<rect
								x="-42.0186"
								y="-22.4004"
								width="557.981"
								height="557.981"
								fill="#F8FAFC"
							/>
						</g>
					</g>
				</svg>
			</button>
			{#if $activeTab === "system-info"}
				<div class="dropdown">
					{#each systemInfoContent as content}
						<button
							type="button"
							on:click={() => {
								content.onClick();
								activeTab.set("");
							}}>{content.name}</button
						>
					{/each}
				</div>
			{/if}
		</div>
		{#if activeApp && appTabs[activeApp.name]}
			{#each appTabs[activeApp.name] as tab}
				<div class="relative">
					<button
						type="button"
						on:mouseenter={() => {
							if ($activeTab) {
								$activeTab = tab.name;
							}
						}}
						on:click={() => {
							$activeTab = $activeTab === tab.name ? "" : tab.name;
						}}
						class:active={$activeTab === tab.name}
					>
						{tab.name}
					</button>
					{#if $activeTab === tab.name}
						<div class="dropdown">
							{#each tab.content as content}
								<button
									type="button"
									on:click={() => {
										content.onClick();
										activeTab.set("");
									}}>{content.name}</button
								>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
	<DesktopTopRight />
</div>

<style lang="postcss">
	#desktop-top-left > div {
		@apply relative h-6;
	}
	#desktop-top-left > div > button {
		@apply h-full rounded bg-white bg-opacity-0 px-3 py-0.5 text-left text-opacity-50 transition-colors;
	}
	#desktop-top-left > div > button.active {
		@apply bg-opacity-25 text-opacity-100;
	}
	.dropdown {
		@apply absolute left-0 top-full z-50 flex min-w-[10rem] flex-col rounded-lg border border-neutral-700 bg-neutral-800/80 p-1 backdrop-blur-md;
	}
	.dropdown > button {
		@apply w-full rounded px-2 text-left;
	}
	.dropdown > button:hover {
		@apply bg-blue-500 text-white;
	}
</style>
