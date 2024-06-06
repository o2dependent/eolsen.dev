---
title: Music Visualizer
description: Music Visualizer using Meyda and BABYLONjs
pubDate: "Jan 30 2024"
projectLink: "https://eolsen.dev/music"
githubLink: "https://github.com/o2dependent/OlsenOS-Portfolio.git"
tags: ["Svelte", "Astro", "Meyda", "BABYLONjs"]
heroImage: "/visualizer-screenshot.jpg"
---

# Project Overview

## Purpose

I wanted to learn BABYLONjs due to their API supporting WebGPU/WebGL and have loved to work with audio for a while.

## Tech Stack

### BABYLONjs

I have been learning GLSL and have heard great things about BABYLONjs. I considered using THREEjs, but I've used THREEjs in the past and didn't like the way their API felt very much (likely due to my inexperience with WebGL/WebGPU). BABYLONjs had an API that made a lot of sense to me and their documentation was clear and concise. I was also making my decision based on the their support for WebGPU, which seems to be where 3D on the web seems to be heading. At the time I started to work on the project THREEjs didn't have a WebGPU engine to use.

### GLSL

I've been learning GLSL for a bit to make custom shaders and to understand WebGL/WebGPU more in depth. The sphere's material is a GLSL shader I wrote. Each render it's changing a color uniform using data from the Meyda stream. I also played around with making more drastic changes using the chroma data from Meyda, but it was very intense so I left that in a "seizure mode" button. It reflects the music well, but changes way too much.

### Meyda

After researching libraries to analyze audio for a bit I found Meyda which had exactly the type of feature extraction I was looking for. It is very robust in the data it's able to pull from an audio stream which made it easy to play with different audio features in different parts of the visualizer. Their documentation was a bit weird, but in charming bare bones sort of way. I never ran into any issues with this library, which felt great from a DX perspective.

### BitsUI

I needed a clean component library to use to add controls and BitsUI fits my aesthetic. I've been using it in my past couple one off projects and after ripping their default styles I found it to be one of the easiest component libraries out there. Currently it isn't as large as others, but it has had everything I need.

# Challenges Faced

## Learning BABYLONjs

I wasn't very well versed in using BABYLONjs at the time I made this. I've played with it to make some basic animation and put my blender models into for testing, but never to actually make a full project. Their documentation was very clear so learning was easy though. I'd say the biggest issues I had with it was figuring out how to manage the Ribbon used for the sphere. I needed access to every point in the sphere to move it around and it took a bit for me fully grasp how to make that happen. Luckily the community is also extremely helpful, and I was able to fix my issues quickly.

## Learning Meyda

Same as BABYLONjs, I only used this in one off test projects. Putting all the pieces together and finding what worked was fun, but a pain at times. I don't have a background in audio engineering or making real music, so I had to go deep into learning what ZCR, RMS, FFT, and many other terms meant.

# Conclusion

This is maybe one of my favorite projects I've made. It may be small, but I was able to learn new things that I have been wanting to learn for a while. I've always loved making music (even though I'm not great at it) and having a visualizer that I know in depth helps with feeling the music more. I have a couple of my songs in there, but a majority are from a friend that passed away a few years ago. His name was Max and all his music is under his artist name kthx. If you haven't listened to it go check it out, he was far more talented than me and I would love for more people to hear the art he created.
