---
title: 'Quick Tip: How To Include Logback Configuration In Grails Plugins'
date: '2018-07-24T09:17:00-0500'
readtime: 10 min
topic: groovy
author: Bud Byrd
description: |
    By default, Grails excludes the logback.groovy file (among others) when plugins are assembled into JAR files, and for good reason. A plugin should not include the logger configuration, since the plugin would unexpectedly influence the configuration of the applications that include it.
coverIconPreset: lightbulb
---

By default, Grails excludes the `logback.groovy` file (among others) when plugins are assembled into JAR files, and for good reason. A plugin should not include the logger configuration, since the plugin would unexpectedly influence the configuration of the applications that include it.

I had a use case where I actually *wanted* this behavior, however. At my work, we write small applications that roughly provide a feature. They're not quite microservices, but they're not monolithic either. Since we write so many applications, we want to ensure that, as much as they can, they behave similarly. I needed to add a standard logger configuration to our standard library, but found that the `logback.groovy` file was excluded from the build.

To include the Logback configuration in a plugin build, simply add the following to your `build.gradle` file:

```groovy
jar {
    getExcludes().remove('logback.groovy')
}
```
