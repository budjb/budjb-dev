---
title: Introducing The http-requests Library
date: '2016-05-11T21:52-0500'
readtime: 10 min
topic: groovy
author: Bud Byrd
coverPhoto: ./cover.jpg
coverAttribution: Photo by Patrik Göthe on Unsplash
tags:
  - groovy
  - http
  - spring-boot
---

I've recently put a lot of work into a new library I've named **http-requests**. I had previously written a project called **jersey-request-builder**, which is an HTTP client wrapper written on top of **Jersey Client 1.x** and implemented as a Grails plugin. Lately, I've been busy porting a bunch of Grails plugins from 2.x to 3.x, and I decided I wasn't very happy with how I had implemented the **jersey-request-builder** plugin and didn't want to put the effort into migrating it. In particular, I wanted to improve the following points.

- The request builder code structure was fairly tightly coupled with Grails, and required some changes to make it work outside of that context.
- It was even more tightly coupled with Spring Framework, and would not function as a standalone library.
- Most of all, it was tightly coupled with **Jersey Client**, and other libraries could not be plugged in as the backend to the wrapper.

Those problems were my primary focus when I sat down and wrote the **http-requests** library. Now, the library is a set of standalone groovy JARs with no Grails or Spring Framework dependencies. It was written with modularity in mind, as **Jersey Client 1.x**, **Jersey Client 2.x**, and **Apache HttpComponents Client** are all supported as backends.

I also kept the things I liked best from the **jersey-request-builder**. In particular, most requests can be built with either a flat properties object or groovy DSL. Request entity converters can be plugged in to handle custom object types, and entity converters for common object types are built in. For more complicated requests, a powerful filter system is available, with several built-in filters to provide common functionality like request logging, content encoding, or different authentication schemes.

Additionally, since I'm a big Grails fan, there's a **Grails 3.x** plugin available that automatically handles loading the library, filters, and entity converters.

I've recently released version **0.1.7.BETA** of the library. Previous to this version, there had been a lot of iteration on the codebase and the structure and interfaces were a bit volatile. With this release, all of the major things I wanted to bake into the library are complete and I expect the library to be quite a bit more stable. Assuming no issues are found with this release, I anticipate a non-beta release soon.

If you'd like to give the library a shot, its various JARs can be found on **jCenter**. For detailed instructions on how to install and use the library, the library is [well documented](https://budjb.github.io/http-requests/latest).

This article is just intended to be an introduction of the library to the world and include some of my motivations behind it. I'll be posting more articles on how to use it, along with advanced use cases that are not covered in the documentation. As always, feedback is welcome, and [issues](https://github.com/budjb/http-requests/issues) will always be reviewed.
