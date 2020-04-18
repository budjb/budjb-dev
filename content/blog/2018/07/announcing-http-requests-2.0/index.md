---
title: Announcing http-requests 2.0
date: '2018-07-31T19:56:00-0500'
readtime: 10 min
topic: java
author: Bud Byrd
description: |
  Lately, I’ve been hard at work refactoring the http-requests library in an effort to simplify the codebase and limit its scope in order to make it more maintainable. I also wanted to broaden the audience that might be able to take advantage of the library and its approach. After a critical review of the state of the library, I’ve completed version 2.0 of the library.
coverPhoto: ./cover.jpg
---

Lately, I've been hard at work refactoring the `http-requests` library in an effort to simplify the codebase and limit its scope in order to make it more maintainable. I also wanted to broaden the audience that might be able to take advantage of the library and its approach. After a critical review of the state of the library, I've completed version 2.0 of the library.

## What's new?

This is just a high-level summary of changes. See the change log for more details.

### Ported to Java

The first version of the library was written in Groovy, since that was the language the libraries predecessor was written in. The downside to this is that a Groovy dependency is always required. The updated version has been completely ported to Java, though a Groovy extension is available that keeps the Groovy DSL and entity converters that existed before.

### More Lightweight

The library focuses on using as much of the provider libraries as possible in an effort to keep it lightweight and not re-invent the wheel. Libraries like Jersey and Apache's HTTP client are great at what they do; this library simply aims to make their use much more concise and expressive.

### Filters Simplified

The filter system has been cleaned up a bit, and filters are now registered with the request instead of with the `HttpClient` or `HttpClientFactory`. This makes sense, since the client is concerned with submitting data across the network, while the request defines the properties and behavior of the operation, much as filters do.

### More Extensions!

There are new extension libraries for Spring Boot, Jackson, and Groovy.

#### Spring Boot

The Spring Boot integration makes using the `http-requests` library trivial. It adds auto-configuration of Spring beans based on which HTTP client provider is present at runtime, and automatically finds and adds any entity converters that are defined as Spring beans.

#### Jackson

While Groovy has built-in JSON conversion classes, pure Java does not. The Jackson extension adds entity converters for `Map` and `List` types.

#### Groovy

The previous Groovy implementation contained DSLs to configure requests, and entity converters for native Groovy types. This extension adds the Groovy functionality that was removed from the core library.

### Maven Central

Previous versions of the library were available on jcenter. With version 2.0, the library and all its extensions are also published to Maven Central.

## Backwards Incompatible

It's important to note that version 2.0 of the library is incompatible with version 1, and while I aimed to limit the changes to the base interfaces, applications using the previous version will need to make a few changes.

### Why Make Disruptive Changes?

I wrote the `http-requests` library to replace another library I'd previously written, the `jersey-request-builder`, which provided a Groovy DSL for configuration Jersey Client 1.x requests. I found the syntax of the Jersey Client to be relatively verbose, and I loved how concise many Groovy'isms were. As most projects do, the library had its flaws. Eventually, my team ran into dependency conflict issues with Jersey, and we ended up getting locked into outdated versions of Jersey with no easy or clear upgrade path without giving up the DSL support we'd grown accustomed to.

With the `http-requests` library, I set out to write an abstraction layer that allowed us to make HTTP requests the way we wanted to, and avoid getting trapped into specific versions of HTTP client libraries. Just like SLF4J does for logging, I wanted something where we could write code independent of the underlying HTTP client library. Version 1.0 accomplished this goal, but it too had its flaws.

Along with ease of use, a couple of guiding principles of the first version were to keep the library as lightweight as possible and utilize as much of the power of whatever HTTP client is being used as possible. In an effort to add more functionality, more custom code (such as content type parsing) started to get added, and the library had a bit of a crisis of identity.

With version 2.0, I set out to fix the things in version 1 of the library that I felt were overly complex or could have been done better. This necessarily meant making some changes that broke compatibility. I attempted to keep these changes as minimal as possible, but ultimately I wanted to correct course now instead of later. This update attempts to adhere to the libraries guiding principles and set it up for future success.

I hope that the community finds value in the approach and finds the library useful. I encourage you to give the library a try, and let me know what you think.

You can find the source for the library and file issues on [GitHub](https://github.com/budjb/http-requests).
