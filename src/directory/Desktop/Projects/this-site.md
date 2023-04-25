---
title: This site
description: This site is built with sveltekit and tailwindcss.
projectLink: https://eolsen.dev
githubLink: https://github.com/o2dependent
tags: ['Svelte', 'Personal', 'Tailwind']
---

# Purpose

I wanted to utilize svelte and tailwind to create a complex and unique UI to showcase what I've been learning. I've developed tooling that can utilize a "plugin" or "app" ecosystem before, so I wanted to create a crude version of that by cloning OSX. OSX is the operating system that I use daily, and I like the way that it handles app management. Trying to fit the OSX look into a website is easy, but making it also _feel_ like an operating system is a difficult challenge that I was looking forward to.

# Tech Stack

## UI Framework

I chose Svelte and SvelteKit as the framework for the project. I knew that Svelte stores would make managing apps and other global state much easier compared to React or Vue. SvelteKit is just the best fullstack Svelte metaframework so its a no brainer to chose this.

## Styling

For most projects I will use Tailwind, but for this I did consider just using SCSS or PostCSS. I ended up adding Tailwind primarily to see how it would work in this scenario. I didn't find too many issues other than the normal issue of bloated HTML. Since this project is a single page with a lot of elements that come in and out of the DOM the production stylesheet should be considerably smaller than if each was styled independently.

# Challenges

## OSX Functionality

There where a few challenges with this project. The primary one was trying to mimic the OSX functionality as much as I could. There are quite a few things that I excluded. Obviously anything with key binds (like CMD + s for saving) will not be possible without running into endless compatibility issues between browsers.

## Mobile compatibility

This is one of the things that I am working on developing. Since OSX is a desktop operating system it doesn't look great on phones. I'm planning on making a very basic clone of IOS for mobile, since the apps aren't fully dependent on a mouse and keyboard.
