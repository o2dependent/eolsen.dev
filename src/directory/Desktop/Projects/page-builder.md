---
title: CMS Page builder
description: A content management system designed for building out custom apps with a page builder.
projectLink: https://github.com/o2dependent
githubLink: https://github.com/o2dependent
tags: ['React', 'Nest.js']
---

# Project Overview

## Purpose

The purpose of this project was to develop a Content Management System (CMS) that enables easy management and composition of app pages. The CMS needed to support content swapping, feature hiding/showing, and overall user experience management. The goal was to emulate the dynamic data handling capabilities of [Sanity.io](https://sanity.io). Additionally, the CMS aimed to provide a streamlined developer experience with minimal setup requirements and consistent results across all applications.

## Tech Stack

### React

React served as the foundation for all frontend repositories, making it a necessary component for building the CMS and CMS library. React's robust type safety support ensures the stability of the application in production. However, in hindsight, if I were to rebuild this project, I would have opted for Svelte due to its superior global state management and developer experience.

### Nest.js

I am a strong advocate for Nest.js for similar reasons as my support for React. Its excellent type safety features make it a reliable choice for production environments. The modular nature of Nest.js allowed me to focus on creating CMS modules specifically for content type and page data management. Since most functionality remains consistent across applications, integrating these modules into the existing content manager was a fantastic solution.

# Challenges Faced

## Type Safety

Implementing end-to-end type safety proved challenging, especially considering the project's use of Postgres without GraphQL. With manual endpoint creation and the need to represent return types and errors in the frontend services, maintaining type safety throughout the system became complex. To address this, I devised a modular content type creation system that provided default endpoints. I then manually added these endpoint types to the frontend library. While not the optimal solution, it effectively addressed the situation. The decision not to use GraphQL stemmed from team familiarity and reluctance to learn additional technologies.

## File Management

Handling images and files within the CMS presented its own set of challenges. While AWS S3 facilitated easy file uploading and downloading, integrating file management into the CMS was problematic. The previous CMS used in our app development lacked image storage in the database, resulting in inconsistent updates when content managers attempted to modify files like logos. To overcome this, I structured the CMS to link files through a separate "file and images" tab, allowing filtering by type (image, document, miscellaneous), internal title, and upload date.

## Versioning

As the CMS spanned two libraries shared across two repositories per project, maintaining version synchronization was crucial to avoid issues in production. To achieve this, I implemented a CI/CD testing pipeline where both libraries were built into a test application, and tests were run before package publishing. However, since this was not set up in a monorepo, triggering the pipeline required tagging each library repository individually. I will discuss potential improvements to this process in the conclusion.

# Conclusion

While the CMS effectively facilitated simple content management for client app development, it fell short of the developer experience I had envisioned. Some limitations were imposed by technology restrictions, while others stemmed from my own design shortcomings. Given the opportunity to redo this project, I would adopt a significantly different approach to enhance developer-friendliness.

Firstly, I would address the convoluted endpoint system. The decision to refrain from using GraphQL for the data layer resulted in the need to manually define generalized CRUD endpoints for content, files, users, and pages on the backend. Factory functions were then employed to generate service functions based on the frontend's content type. Implementing GraphQL would have streamlined this process, allowing for GraphQL fragments within the frontend library to handle data fetching. Furthermore, excess data retrieval issues in production would have been mitigated.

Type safety holds great importance to me, and I consider it the biggest shortcoming of this project. The necessity to manually define generalized endpoints on the backend and translate those types
