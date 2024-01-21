---
title: Crossplatform CI/CD
description: CI/CD for testing, deployment, and merging crossplatform project.
pubDate: "Dec 04 2022"
projectLink: ""
githubLink: ""
tags: ["CI/CD"]
heroImage: "/blog-placeholder-2.jpg"
---

# CI/CD Pipeline for Crossplatform Products

## Purpose

In our quest to deliver and test crossplatform products efficiently, I embarked on creating a robust CI/CD pipeline for automated deployments. However, this task presented several challenges, particularly concerning the workflow for developers and deploying iOS and Android applications to the Apple and Google Play stores.

## Tech Stack

Initially, I implemented a basic version using GitLab's CI/CD system. It proved easy to manage, and I encountered no significant issues except for the documentation. Unfortunately, porting the setup to AWS proved to be a nightmare. AWS documentation was difficult to navigate, and permission-related hurdles hindered quick testing. Hence, I will primarily focus on the GitLab CI/CD portion, as further progress on the AWS platform was impeded.

## CI/CD Steps and Rules

My primary goal when setting up the pipeline was to optimize efficiency and transparency during deployments. To achieve this, I ensured that code was linted, tested, and reviewed before pushing it to any development or production server. If a developer pushed to an unprotected branch, the pipeline would run linting and testing to identify any arising issues and enforce linting standards. On the other hand, when a developer merged into a protected branch, the pipeline would execute linting, testing, and require review by a lead developer on the team. Once merged, a lead developer could create a tagged version to deploy the application to the respective environment associated with that branch (dev, staging, prod, etc).

## Challenges

### Web Deployment

Deploying the products to the web posed relatively few challenges for both the web and API codebases. Since we utilized AWS for web application hosting, we simply built the application, pushed it to CloudFront, and cleared the CloudFront cache to ensure prompt updates without waiting for the CDN cache to expire. The same process applied to the API server, except the build was pushed to our EC2 instance. Issues primarily arose from caching or AWS account permission problems, as our designated "AWS guy" was unresponsive and unhelpful.

### Mobile Deployment

Mobile deployment presented greater complexity. We utilized Capacitor to bundle our web applications into mobile apps, allowing for seamless updates to devices whenever there were HTML, CSS, or JavaScript changes without modifications to the native code. However, for native changes, I had to find a suitable pipeline implementation compatible with GitLab. To achieve this, I shamelessly followed [this article](https://medium.com/@naman.mittal/automate-ios-deployment-process-by-ci-cd-using-gitlab-ci-and-fastlane-547d824ee41a) to successfully set it up.

## Conclusion

I am passionate about crafting CI/CD pipelines as they empower new developers by automating tasks that often pose challenges. Furthermore, such pipelines promote transparency within the team, eliminating the need for extensive communication during every deployment. Leveraging a self-built system like this can save significant costs compared to third-party platforms such as [Ionic AppFlow](https://ionic.io/docs/appflow). Looking ahead, I aspire to implement and refine similar pipelines on a larger scale, tailored to enterprise-level requirements.
