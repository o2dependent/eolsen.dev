---
title: Crossplatform CI/CD
description: CI/CD for testing, deployment, and merging crossplatform project.
projectLink: ''
githubLink: ''
tags: ['CI/CD']
---

# Purpose

We needed a way to deliver and test crossplatform products so I looked into creating a CI/CD pipeline to handle automatic deployments. There were quite a few struggles that come with this task. Some of which come down to how the workflow would be handled for the developer and how to deploy IOS and Android application to the Apple and Google Play store.

# Tech Stack

A basic version of this was written to use GitLab's CI/CD system, before moving over to AWS and using all of their services. GitLab's CI/CD system was very easy to manage and I didn't run into any issues except for the docs. Trying to port that to AWS was horrible. Not only are the AWS difficult to read, but account permission issues made it impossible to test quickly. I will be primarily be focusing on the GitLab CI/CD portion from now on, because I was unable to work further on the AWS platform.

# CI/CD Steps and Rules

My primary concern when setting up the pipeline was to make is more efficient and transparent when a deployment is made. To get there though you have to make sure the code is linted, tested, and reviewed before pushing to any dev or production server. If a developer _pushed to a branch that isn't protected_ it will run a lint and test to track where issues may have arose and to assure that linting standards are followed. If a developer _merged into a protected branch_ it will run lint, test, and finally will need to be reviewed by a lead developer on that team. Once merged a lead developer would be able to create a tag with a version number to deploy that application to the environment that branch is attached to (dev, staging, prod, etc).

# Challenges

## Web Deployment

Deploying the products to web is pretty simple for both the web and api code bases. Since we were using AWS for the hosting of our web application we simply built the application, pushed that to CloudFront, and cleared the CloudFront cache to make sure we don't have to wait for the CDN cache to clear. The same process took place for the api server, but pushed the build to our EC2 instance instead. Issues mainly came up with caching issues or AWS account permission issues, because our "AWS guy" was not very responsive or helpful.

## Mobile Deployment

Mobile deployment is where things get tricky. We used Capacitor to bundle our web applications to mobile application so if there weren't any changes in the native code and it was just an HTML, CSS, or JavaScript change we could just push to CloudFront and have it update to all devices. For native changes though I had to find a pipeline implementation that could work with GitLab so I shamelessly followed [this article](https://medium.com/@naman.mittal/automate-ios-deployment-process-by-ci-cd-using-gitlab-ci-and-fastlane-547d824ee41a) to get it up and running. (anticlimactic... i know.)

# Conclusion

I am a big fan of writing CI/CD pipelines. Learning to automate tasks that new developers struggle with is very rewarding. It also makes it so all deployments are transparent to the team, so I don't have to talk to the entire team each time I deploy. A system like this can be very expensive to use a 3rd part platform like [Ionic AppFlow](https://ionic.io/docs/appflow) so saving money each month is very valuable. I'd love to be able to get something like this up and running at a larger scale in the future and make it more refined to enterprise use.
