---
title: CSS Only Scroll Watcher!
description: CSS finally has a way of animating scroll without JS! Lets go over how to use it and some use cases for it.
pubDate: "Dec 20 2023"
heroImage: "/scroll-watcher.webp"
tags:
  - CSS
  - Mini
---

Scroll animations have always been a great way to spice up a website and draw attention in a stylish way. The only problem is that some of these animations looks clunky due to delays in events firing and document paints as well as issues that come with more complex scroll animations. Luckily there is now a way that you can implement smooth CSS only scroll animation with no JavaScript (except polyfills for compatibility...).

## Basic scroll watcher with "scroll()"

Lets start off with an example that is seen on a lot of blog sites which is the scroll watcher. This tracks a users scroll progress at the top of the page to give them a good idea on how far through an article they are. I don't have one on my site, because I found these distracting, but they can be very helpful for course lessons.

We'll start off with a basic container at the top of the page that I will set to `position: fixed;` so it is always in view. I'll add a slight background color to it to notify to the user that it is a progress bar as well. Then we add our scroll watcher class that will be inside our container. We will be animating the scale as we scroll so the `scale` property will be set to `0 1` so only our inline axis is shrunk.

```css
.scroll-watcher-container {
	height: 0.5rem;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #ffffff40;
}
.scroll-watcher {
	height: 100%;
	width: 100%;
	background-color: #fff;
	scale: 0 1;
}
```

Now that we have our scroll watcher styles set lets add in the animation and tie the progress to the window's scroll state! We will be modifying the `scale` property to fully expand the element and all we need to do after that is add the `animation: scroll-watcher-animation linear;` and `animation-timeline: scroll();` properties!

```css
.scroll-watcher-container {
	height: 0.5rem;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #ffffff40;
}
.scroll-watcher {
	height: 100%;
	width: 100%;
	background-color: #fff;
	transform-origin: left;
	scale: 0 1;
	animation: scroll-watcher-animation linear;
	animation-timeline: scroll();
}
@keyframes scroll-watcher-animation {
	to {
		scale: 1 1;
	}
}
```

Tada that is all! Now the `scroll()` timeline value also accepts params to designate what axis to listen to so if you have a horizontal scroll you can set it to `x` or `inline` , but it default to `y` or `block`. Play around with it in the codepen below if you'd like!

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/o2dependent/embed/jOJmdxr?default-tab=css%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/o2dependent/pen/jOJmdxr">
  Untitled</a> by Ethan Olsen (<a href="https://codepen.io/o2dependent">@o2dependent</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
