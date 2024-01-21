---
title: EOlsen Personal Site (sveltekit version)
description: My personal site built with sveltekit and tailwindcss.
pubDate: "Mar 21 2023"
projectLink: https://eolsen.dev
githubLink: https://github.com/o2dependent
tags: ["Svelte", "Personal", "Tailwind"]
heroImage: "/blog-placeholder-4.jpg"
---

# Project Overview

## Purpose

The purpose of this project was to demonstrate my skills in creating a sophisticated and distinctive user interface using Svelte and Tailwind. I wanted to showcase my learning achievements by developing a crude version of the OSX operating system. As an avid OSX user, I appreciate its efficient app management system. My aim was to replicate the OSX look on a website and, more importantly, capture the overall experience of using an operating system.

## Tech Stack

### UI Framework: Svelte and SvelteKit

I made the deliberate choice to utilize Svelte and SvelteKit as the framework for this project. Compared to React or Vue, I recognized that Svelte stores would greatly simplify the management of apps and global state. SvelteKit, being the top-tier full-stack Svelte metaframework, was the obvious and ideal choice for this endeavor.

### Styling: Tailwind

While Tailwind is my go-to styling tool for most projects, I did consider alternative options like SCSS or PostCSS for this particular project. However, after careful consideration, I decided to incorporate Tailwind to explore its compatibility in this context. Thankfully, I encountered minimal issues, with the exception of the potential problem of generating bloated HTML. Given that this project consists of a single page with numerous dynamic elements entering and leaving the DOM, the production stylesheet should be significantly smaller compared to styling each element independently.

# Challenges Faced

## Replicating OSX Functionality

One of the primary challenges encountered in this project was striving to faithfully mimic the functionality of the OSX operating system. Although I attempted to include as many features as possible, there were certain aspects that had to be excluded. For instance, implementing key bindings such as CMD + S for saving proved to be impractical due to the endless compatibility issues arising across various browsers. Nevertheless, I aimed to capture the essence of OSX's functionality within the limitations of web development.

## Mobile Compatibility

Enhancing mobile compatibility emerged as another challenge during the course of this project. Considering that OSX is primarily designed for desktop operating systems, its visual appeal on mobile phones is less than optimal. To address this issue, I plan to develop a basic clone of iOS specifically tailored for mobile devices. Fortunately, the apps in this project are not heavily dependent on mouse and keyboard interactions, making the implementation of an iOS-like interface feasible.

By undertaking this project, I aimed to demonstrate my expertise in developing complex user interfaces using Svelte and Tailwind, while tackling the challenges of emulating OSX functionality and ensuring mobile compatibility. The combination of these technologies and my commitment to refining the user experience can contribute to the success of future projects.
