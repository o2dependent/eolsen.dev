<script lang="ts">
	import Lua from "./lua.png";
	import LuaStanding from "./lua_standing.png";
	import Omen from "./omen.png";
	import AboutPhoto from "../about_photo.jpeg";
	import { fly } from "svelte/transition";
	const getBirthday = () => {
		const birthday = new Date("1998-01-31");
		const today = new Date();
		const age = today.getFullYear() - birthday.getFullYear();
		const m = today.getMonth() - birthday.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
			return age - 1;
		}
		return age;
	};
	let index = 0;
	let slideDir = 1;
	const setIndex = (newIndex: number) => {
		slideDir = newIndex < index ? -1 : 1;
		index = newIndex;
	};
</script>

<div
	style="grid-template-columns: 153px 1fr;"
	class="grid flex-grow items-center justify-center gap-12 px-8"
>
	<div
		class="grid h-[153px] w-[153px] place-items-center overflow-hidden rounded-full ring-[3px] ring-white"
	>
		<img
			class="zoom-photo h-full w-full object-cover transition-transform duration-[3s] hover:-translate-y-20 hover:translate-x-16 hover:scale-[400%]"
			src={AboutPhoto.src}
			alt=""
		/>
	</div>
	<div class="flex h-full flex-col gap-4 py-8">
		<div class="flex flex-grow flex-col gap-4 overflow-hidden">
			<div>
				<h1 class="text-3xl font-medium">
					<span class="font-extralight">Ethan</span> Olsen
				</h1>
				<div class="relative h-4 w-full">
					{#key index}
						<p
							in:fly={{ x: 64 * slideDir }}
							out:fly={{ x: -64 * slideDir }}
							class="absolute text-xs"
						>
							{[
								"Cross platform developer",
								"Hobby game developer",
								"Fan of cats",
							][index]}
						</p>
					{/key}
				</div>
			</div>
			<div class="relative h-full flex-grow overflow-hidden">
				{#key index}
					<div
						in:fly={{ x: 64 * slideDir }}
						out:fly={{ x: -64 * slideDir }}
						class="absolute flex w-72 flex-col gap-0.5"
					>
						{#if index === 0}
							<p class="w-full text-xs opacity-80">
								I am a full stack cross platform web developer with a focus on
								developing internal development frameworks and tools to increase
								developer and admin productivity. My primary experience is in UI
								and UX design and development, backend development, and database
								management.
							</p>
						{:else if index === 1}
							<p class="w-full text-xs opacity-80">
								I'm currently playing with tools like Godot and Unity to create
								games as a hobby. Super Meat Boy, Enter the Gungeon, and Nuclear
								Throne are a few of the games I've been modeling games after to
								learn these engines. I've made a game for my little brother that
								I will be releasing soon on itch.io.
							</p>
						{:else if index === 2}
							<div>
								<p class="w-full text-xs opacity-80">
									I've got two cats, Omen and Lua. They are both a year old and
									are very cute. Omen is a standard issue cat and Lua is a short
									tail tortoise shell cat. I ended up getting to name Lua which
									means "moon" in portuguese. It is also a scripting language I
									like. Please don't tell my girlfriend she does not know.
								</p>
							</div>
						{/if}
					</div>
				{/key}
			</div>
		</div>
		<div class="flex w-full gap-2">
			<button
				class="rounded bg-[#56545C] py-[1px] px-1.5 text-xs text-white disabled:cursor-not-allowed disabled:opacity-75"
				disabled={index === 0}
				type="button"
				on:click={() => {
					setIndex(index - 1);
				}}
			>
				<svg
					width="14"
					height="14"
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
				class="rounded bg-[#56545C] py-[1px] px-1.5 text-xs text-white disabled:cursor-not-allowed disabled:opacity-75"
				disabled={index === 2}
				type="button"
				on:click={() => {
					setIndex(index + 1);
				}}
			>
				<svg
					width="14"
					height="14"
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
		</div>
	</div>
</div>
{#if index === 2}
	<img
		in:fly={{ x: 100, delay: 500, duration: 1000 }}
		class="absolute -bottom-4 -left-8 h-32 -scale-x-100"
		src={Omen.src}
		alt="Omen"
	/>

	<img
		in:fly={{ x: 100, delay: 750, duration: 1000 }}
		class="absolute -bottom-8 -right-8 h-32"
		src={Lua.src}
		alt="Lua"
	/>
	<img
		in:fly={{ y: 1200, delay: 1750, duration: 4000 }}
		class="absolute -bottom-32 right-1/4 h-52"
		src={LuaStanding.src}
		alt="Lua Standing"
	/>
{/if}

<style>
	.zoom-photo {
		background-size: 200%;
	}
</style>
