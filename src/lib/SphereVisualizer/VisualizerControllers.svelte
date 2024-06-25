<script lang="ts">
	import Globe from "../icons/Globe.svelte";
	import {
		DropdownMenu,
		ScrollArea,
		Separator,
		Toolbar,
		Tooltip,
	} from "bits-ui";
	import Play from "../icons/Play.svelte";
	import Stop from "../icons/Stop.svelte";
	import ListBullet from "../icons/ListBullet.svelte";
	import { fly, fade } from "svelte/transition";
	import MagicWand from "../icons/MagicWand.svelte";
	import File from "../icons/File.svelte";
	import type { ChangeEventHandler } from "svelte/elements";
	import { cursorFlow } from "$utils/cursorFlow";
	import HorizontalAutoScroll from "./HorizontalAutoScroll.svelte";
	import { loadingGL, loadingModule } from "./visualizer-loading.store";
	import {
		audioList,
		currentAudioName,
		handleRemoteAudio,
		loadAudioBuffer,
		playing,
		setAnalyzer,
		togglePlay,
		visualizerApp,
	} from "./visualizer-app.store";

	let isDropdownOpen = false;

	export const handleFileChange: ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		const file = (event?.target as HTMLInputElement)?.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = (e) => {
				const buffer = e?.target?.result;
				loadAudioBuffer(buffer).then(setAnalyzer);
				currentAudioName?.set(
					file?.name?.split(/.mp3|.mp4/)?.[0] ?? "Custom Audio",
				);
			};

			reader.readAsArrayBuffer(file);
		}
	};
</script>

{#if !$loadingGL && !$loadingModule}
	<div
		in:fade
		class="fixed bottom-2 left-1/2 w-fit -translate-x-1/2 max-w-xl md:w-full flex items-center justify-center"
	>
		<Toolbar.Root
			class="flex h-12 items-center justify-center rounded-10px border border-border bg-background-alt px-[4px] py-1 shadow-mini w-full max-w-screen-sm"
		>
			<div class="flex items-center">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<div class="rounded-9px" use:cursorFlow>
							<Toolbar.Button
								on:click={!$loadingGL ? togglePlay : undefined}
								class="inline-flex items-center justify-center rounded-9px px-3 py-2 text-sm font-medium text-foreground/80 transition-all hover:bg-muted active:scale-98 active:bg-dark-10"
							>
								{#if $playing}
									<Stop class="size-6" />
								{:else}
									<Play class="size-6" />
								{/if}
							</Toolbar.Button>
						</div>
					</Tooltip.Trigger>
					<Tooltip.Content
						transition={fly}
						transitionConfig={{ y: 8, duration: 150 }}
						sideOffset={8}
					>
						<div class="bg-background">
							<Tooltip.Arrow
								class="rounded-[2px] border-l border-t border-dark-10"
							/>
						</div>
						<div
							class="flex items-center justify-center rounded-input border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
						>
							{#if $playing}
								Stop
							{:else}
								Play
							{/if}
						</div>
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger>
						<div class="rounded-9px" use:cursorFlow>
							<Toolbar.Button
								on:click={() => $visualizerApp?.seizureModeToggle()}
								data-state={$visualizerApp?.seizureMode ? "active" : undefined}
								class="inline-flex items-center justify-center rounded-9px px-3 py-2 text-sm  font-medium text-foreground/80 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 [data-state=active]:bg-dark-10"
							>
								<MagicWand class="size-6" />
							</Toolbar.Button>
						</div>
					</Tooltip.Trigger>
					<Tooltip.Content
						transition={fly}
						transitionConfig={{ y: 8, duration: 150 }}
						sideOffset={8}
					>
						<div class="bg-background">
							<Tooltip.Arrow
								class="rounded-[2px] border-l border-t border-dark-10"
							/>
						</div>
						<div
							class="flex items-center justify-center rounded-input border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
						>
							Color seizure mode
						</div>
					</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<div class="rounded-9px" use:cursorFlow>
							<Toolbar.Button
								on:click={() => $visualizerApp?.toggleWireframe()}
								data-state={$visualizerApp?.seizureMode ? "active" : undefined}
								class="inline-flex items-center justify-center rounded-9px px-3 py-2 text-sm  font-medium text-foreground/80 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 [data-state=active]:bg-dark-10"
							>
								<Globe class="size-6" />
							</Toolbar.Button>
						</div>
					</Tooltip.Trigger>
					<Tooltip.Content
						transition={fly}
						transitionConfig={{ y: 8, duration: 150 }}
						sideOffset={8}
					>
						<div class="bg-background">
							<Tooltip.Arrow
								class="rounded-[2px] border-l border-t border-dark-10"
							/>
						</div>
						<div
							class="flex items-center justify-center rounded-input border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
						>
							Toggle Wireframe
						</div>
					</Tooltip.Content>
				</Tooltip.Root>

				<!-- FEATURE: RECORDING - LOW QUALITY RECORDING | NEED TO ADD AUDIO INTO AUDIO -->
				<div>
					<!-- <Tooltip.Root>
					<Tooltip.Trigger class="h-full flex justify-center items-center">
						<Toolbar.Button

							on:click={() => (willRecord = !willRecord)}
							class="inline-flex items-center justify-center rounded-9px h-full px-1.5 py-0 text-sm font-medium text-foreground/80 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 [data-state=active]:bg-dark-10"
						>
							<DotFilled class="size-10 {willRecord ? 'text-red-500' : ''}" />
						</Toolbar.Button>
					</Tooltip.Trigger>
					<Tooltip.Content
						transition={fly}
						transitionConfig={{ y: 8, duration: 150 }}
						sideOffset={8}
					>
						<div class="bg-background">
							<Tooltip.Arrow
								class="rounded-[2px] border-l border-t border-dark-10"
							/>
						</div>
						<div
							class="flex items-center justify-center rounded-input border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
						>
							Record canvas
						</div>
					</Tooltip.Content>
				</Tooltip.Root> -->
				</div>
			</div>
			<Separator.Root class="-my-1 mx-1 w-[1px] self-stretch bg-dark-10" />
			<div
				class="flex items-center w-32 h-full md:w-full md:flex-grow px-3 shadow-inner bg-muted rounded mx-1 text-muted-foreground whitespace-nowrap"
			>
				<HorizontalAutoScroll text={$currentAudioName}></HorizontalAutoScroll>
			</div>
			<Separator.Root class="-my-1 mx-1 w-[1px] self-stretch bg-dark-10" />

			<DropdownMenu.Root
				open={isDropdownOpen}
				onOpenChange={(o) => (isDropdownOpen = o)}
			>
				<DropdownMenu.Trigger class="">
					<div class="flex items-center">
						<div class="rounded-9px" use:cursorFlow>
							<Toolbar.Button
								class="inline-flex items-center justify-center rounded-9px px-3 py-2 text-sm  font-medium text-foreground/80 transition-all hover:bg-muted active:scale-98 active:bg-dark-10"
							>
								<ListBullet class="mr-2 size-6" />
								<span class="whitespace-nowrap hidden md:block">
									Change music
								</span>
							</Toolbar.Button>
						</div>
					</div>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					class="w-full max-w-[229px] rounded-xl border border-muted bg-background px-1 py-1.5 shadow-popover"
					transition={fly}
					sideOffset={8}
					side="top"
				>
					<DropdownMenu.Label class="py-3 pl-3 pr-1.5"
						>AudioList</DropdownMenu.Label
					>
					<DropdownMenu.Separator
						class="my-1 -ml-1 -mr-1 block h-px bg-muted"
					/>
					<ScrollArea.Root class="relative h-[205px] bg-muted rounded-md">
						<ScrollArea.Viewport class="h-full w-full">
							<ScrollArea.Content>
								{#each audioList ?? [] as { name, url }}
									<div class="rounded-button" use:cursorFlow>
										<DropdownMenu.Item
											on:click={() => handleRemoteAudio(url, name)}
											class="flex pl-3 pr-1.5 h-10 select-none items-center rounded-button py-3 text-sm font-medium !ring-0 !ring-transparent data-[highlighted]:bg-dark-10"
										>
											<div class="flex items-center">
												{name}
											</div>
										</DropdownMenu.Item>
									</div>
								{:else}
									<p class="pl-3">No audio here!</p>
								{/each}
							</ScrollArea.Content>
						</ScrollArea.Viewport>
						<ScrollArea.Scrollbar
							orientation="vertical"
							class="flex h-full w-2.5 touch-none select-none rounded-full border-l border-l-transparent p-px transition-all hover:w-3 hover:bg-dark-10"
						>
							<ScrollArea.Thumb
								class="relative flex-1 rounded-full bg-muted-foreground opacity-40 transition-opacity hover:opacity-100"
							/>
						</ScrollArea.Scrollbar>
						<ScrollArea.Corner />
					</ScrollArea.Root>

					<DropdownMenu.Separator
						class="my-1 -ml-1 -mr-1 block h-px bg-muted"
					/>
					<div class="rounded-button" use:cursorFlow>
						<DropdownMenu.Item
							on:click={() => {
								const fileInput = document.getElementById("file-input");
								fileInput?.click();
							}}
							class="relative flex h-10 select-none items-center rounded-button py-3 pl-3 pr-1.5 text-sm font-medium !ring-0 !ring-transparent data-[highlighted]:bg-muted cursor-pointer"
						>
							<File class="mr-2" />
							<p>Custom input</p>
						</DropdownMenu.Item>
					</div>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Toolbar.Root>
	</div>
	<input
		id="file-input"
		class="absolute z-50 left-0 top-0 opacity-0 w-0 h-0 cursor-pointer"
		type="file"
		accept=".mp3, .mp4"
		on:change|stopPropagation={handleFileChange}
	/>
{/if}
