---
title: Extend existing Java classes with Groovy extension modules
date: '2018-07-23T21:32:00-0500'
readtime: 10 min
topic: groovy
author: Bud Byrd
description: |
  I've been working on an update to the http-requests library, and wanted to remove the Groovy dependency to make it more portable. I like a lot of the conveniences Groovy affords the library, as well as some of the entity converters that use Groovy classes, so I wanted to find a way to still provide those features even after ripping Groovy-specific methods out of the main interfaces.
coverPhoto: ./cover.jpg
coverAttribution: Photo by Hunter Haley on Unsplash
tags:
  - groovy
---

I've been working on an update to the [http-requests](https://github.com/budjb/http-requests) library, and wanted to remove the Groovy dependency to make it more portable. I like a lot of the conveniences Groovy affords the library, as well as some of the entity converters that use Groovy classes, so I wanted to find a way to still provide those features even after ripping Groovy-specific methods out of the main interfaces.

I tried to use meta classes to accomplish this, and Groovy even provides a _magic package_ so that you can inject your own, custom meta class automatically at runtime. This didn't quite fit my need exactly, since I need to extend the base interface and not a specific implementation (I wanted all implementations to inherit the changes). After banging my head for a while trying to find a path forward, I found Groovy extension modules.

# Extension Modules

Extension modules provide a way to add functionality to existing Java classes automatically at runtime, much in the same way that Groovy does with its own extensions to `Object` and `Collection` classes. For example, the (quite useful) `.each` method is automatically added to a wide array of object types, but yet this method is not part of Java's implementations.

Groovy gives developers a way to perform the same kind of class enhancement, if a couple of conventions are followed.

To create your own extension module, you need both a descriptor file and a class containing the extension methods. Groovy's [documentation](http://groovy-lang.org/metaprogramming.html#_extension_modules) explains how to create your own extension, but I'll provide a quick explanation and a working example.

## Descriptor File

Groovy looks on the classpath for these descriptor files to discover what extensions it should apply. The file must be located at a specific path: `META-INF/services/org.codehaus.groovy.runtime.ExtensionModule`. This file is a simple properties file, and a few properties are required. The following descriptor informs Groovy that the class `com.budjb.example.ExampleGroovyExtensions` contains extension methods that should be applied at runtime.

```properties
moduleName=Example Groovy extension.
moduleVersion=1.0.0
extensionClasses=com.budjb.example.ExampleGroovyExtensions
```

> Note that the `moduleName` and `moduleVersion` are arbitrary and used to avoid loading the same module twice.

## Extension Class

The class containing extension methods is simple; it's just a plain class full of static methods! Each method should contain **at least** one parameter, which is the instance of the object that the method was called on. This is also how Groovy identifies what classes the extension method should be applied to!

As previously mentioned, Groovy adds many methods to existing Java classes. Those methods can be found in the [DefaultGroovyMethods](https://github.com/groovy/groovy-core/blob/master/src/main/org/codehaus/groovy/runtime/DefaultGroovyMethods.java) class. As an example, there are several versions of the `each` method in this class, and the first parameter of each of those methods is the class that they will be applied to.

In the same way, custom extension methods are defined in the class pointed to in the descriptor file. Following the example descriptor above, an extension to the `String` class might look like the following.

```groovy
package com.budjb.example

class ExampleGroovyExtensions {
    /**
     * Applies the given regular expression against the string, and returns
     * the total amount of times the pattern matched the string.
     *
     * @param regex The regular expression to use.
     * @return The total number of times the pattern matched.
     */
    static int count(String self, String regex) {
        return self.findAll(regex).size()
    }
}
```

# Wrapping Up

With the above in place, the `count(String)` method will be applied to `String` at runtime. Calling `"foobar".count("o")` should return `2`.

The examples above are contained in an working example project, which you can use to base your own extension on.

The Groovy extension module feature is a very convenient, and incredibly easy, way to enhance existing classes. IntelliJ even natively supports them and automatically code-completes extension methods.

You can find a project that uses the examples above on GitHub at the [budjb/groovy-extension-module-example](https://github.com/budjb/groovy-extension-module-example).

I'd love to know how people are using this feature, so drop me a line if you have an interesting example or use case!
