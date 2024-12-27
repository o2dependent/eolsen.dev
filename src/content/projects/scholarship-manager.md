---
title: Scholarship Manager
description: A scholarship management application for a local highschool so they can better track student's scholarships and reimbursement payments.
pubDate: "Jan 30 2024"
projectLink: ""
githubLink: ""
tags: ["React", "Remix", "Supabase", "Postgres"]
heroImage: "/scholarship-manager.png"
---

# Project Overview

## Purpose

My client needed an application to replace their current excel file workflow when managing student's scholarships and reimbursement payments.

## Tech Stack

### UI Framework: React and Remix

I chose this because I wanted to try out Remix. I only used Remix in small projects where I wasn't doing much other than making a basic React app, and was far too confident going into this project. I have become very accustom to Astro's way of setting up API endpoints and handling server side data, which made it kinda jarring at first. Overall I don't think I would use Remix over Astro again for various reasons I will touch on in the Challenges section.

### Styling: Radix

# Challenges

## Remix SSR

I had so many issues getting Radix to work with Remix that I almost switched to Astro. At this point I can't remember the exact issue I had, but the error wasn't helpful and would cause elements to not function if JS was required. For a few of these I just wrapped them in a "<ClientOnly />" component I made. It makes the user experience a little worse, but at least worked. If I did switch to Astro I would've done the same, but it would've been a lot less painful for sure.

## Data Security and RLS

Setting up RLS in Supabase is clear and straightforward, but due to the sensitivity of the data I had to take extra precautions when creating roles for admin, super admin, and students. I used a script that allowed me to set user's role and imbed that into the RLS rules for each table. I also had a "just-in-case" set up on each API endpoint to pull the user's HTTPOnly cookies and check rules before even attempting the DB call.

## Radix constraints

This doesn't really fall on Radix as a UI kit as much as it falls on me for focusing on minor aspects of my design vision instead of conceding overall unimportant things. This is a personal failing and made me burn hours of time trying to fix something unnecessary. I realized this late, because while I have done this in the past I always rationalized it as the better choice instead of a waste of time that could be fixed later if needed.

## Client communication

The client was very good at communicating, but I was not able to make the language I used clear enough for them. I used too many technical terms and it muddied what I needed from them when it came to data, UX, and general app requirements. I have since been researching client communication since I realized that was the issue to make future client calls easier.

# Conclusion

This project was a good learning experience because the client never worked with a developer before. I was able to learn how to communicate more efficiently with client like this which is a skill that has been very valuable. Using Remix was a blunder and I will from now on stick to tech that I more proficient in to make development time faster. I was also able to hone my skills using Supabase and make a lot of presets that will make development time much faster.
