---
title: CMS Page builder
description: A content management system designed for building out custom apps with a page builder.
projectLink: https://github.com/o2dependent
githubLink: https://github.com/o2dependent
tags: ['React', 'Nest.js']
---

# Purpose

The CMS was built around the idea of being able to manage and compose pages for the app. The apps being built needed to swap out content, hide/show features, and manage the user experience of the app. The goal was to mimic how (Sanity.io)[https://sanity.io] handles dynamic data. This system also needs to have a good developer experience so that there is minimal set up and consistent results across all applications.

# Tech Stack

## React

React is the base for all other frontend repos so this was required to build out the CMS and CMS library. React has great type safety support so it makes it great for a solid app that doesn't unexpectedly break in prod. If I remade this I would have used svelte though due to the better global state management as well as better developer experience.

## Nest.js

I am a big fan of Nest.js for the same reason I am a fan of React. It has great type safety which makes it rock solid in prod. Nest.js is modular so I only needed to create CMS modules to manage the content types and page data. Most of the functionality will be the same for all apps, so being able to bake this into the existing content manager is fantastic.

# Challenges

## Type Safety

End to end type safety is a pain for most projects, but building out the e2e type safety systems was especially difficult. Since I was using Postgres without Graphql all endpoints needed to written by hand and all of those return types, along with errors, needed to be represented with the services used on the frontend. My solution was to create a modular system for content type creation that comes with default endpoints and add those endpoint types manually to the frontend library. This is certainly not the best solution, but it worked for the situation. I had push back on using Graphql since the team didn't know it and did not want to learn any more new technology to use the stack.

## Files

Images and files are always a bit of pain to handle in any project. Since we were using AWS S3 for storage uploading and downloading files was easy, but it was integrating file management into the CMS that caused issues. The previous CMS that was used for our app development had pitfalls in this area that I wanted to solve. The old CMS didn't save images in the DB so that you could change the file in one place and have it cascade into all entries that used that file. This caused non-stop issues when content managers tried to change the logo and it only changed in one spot. I set it up so that the files would be linked by a file table and managed through a separate "file and images" tab in the CMS. Each file could be filtered by type (image, doc, misc), internal title, and upload date.

## Versioning

Since the CMS is spread across two libraries and will be shared to two repos per project the libraries need to be versioned in sync so that there isn't any issues in prod. This is handled through a CI/CD testing pipeline where both will be built into a test application and tests will be run before publishing the packages. This is a pain because this wasn't set up in a mono repo so the pipeline needs to be triggered via a tag in each of the library repos. I will go over how I could have fixed this in the conclusion of this writeup.

# Conclusion

While the CMS works well for building out apps for clients to manage content simply it did not have the developer experience I was hoping for. Some of this was due to a restriction in what tech I could use and some of it was because of my own failures in designing the system. If I were to redo this today I would take a drastically different approach to make it easier for the developer.

The first issue is the messy endpoint system. Since I was not allowed to use GraphQL for our data layer I had to write out general use CRUD endpoints for content, files, user, and pages in the backend. I then had to write factory functions to return service functions for those endpoints based on what content type I was getting on the frontend. If GraphQL was implemented this could have been reduced to just having GraphQL fragments for in the frontend library to handle fetching all this data. We also wouldn't have as much of a problem with excess data being fetched in prod.

Type safety is very important to me. Good typing can drastically improve the developer experience of a library and I can say for certain that this is the biggest failure of this project. Having to write out general use endpoints on the backend and translate those types to the frontend was time consuming, and having a new dev touch any part of the system without translating those type changes over to the other library causes endless headaches. This could be easily fixed if GraphQL was used since you can generate types from GraphQL. This would make the whole system a lot more robust and more stable for new devs.

Lastly I would have changed the UI framework to something that is more modern. React is no doubt a great framework, but since this was meant to be built out with the future in mind I would have liked to use Svelte. Svelte is by far the most loved UI framework for frontend devs. It also runs faster and has a smaller bundle size compared to React apps. Svelte also makes it easy to write web components for integration with other frameworks if we need to work on an app that isn't using Svelte yet. This means that your Svelte devs are more productive and versatile using and master one framework.
