---
title: 'JAX-RS and HashMaps'
date: '2012-02-24T15:40-0500'
readtime: 5min
topic: groovy
author: Bud Byrd
coverPhoto: ./cover.jpg
slug: jax-rs-and-hashmaps
---
I started working with the Grails framework recently when I started working for my new company. We were writing an application that provided a RESTful service, and my team had opted to use JAX-RS to implement that service.

One of the frustrations I had while learning Grails had to do with some of the convenience Groovy provides. In particular, I ran into an issue where JAX-RS did not know how to handle maps, yet it handled lists (even with nested maps!) just fine.  That's certainly a workaround if I had to return a map, but it does not make sense to have an API call return a list of a map when only a single map makes sense.

##The Problem

```groovy
@GET
@Path("/api/test")
@Produces(["application/xml", "application/json"])
Response getTestCall() {
    ok [name: "Bud", foo: "bar"]
}
```

JAX-RS uses annotations to set up resources.  The _GET_ annotation tells the application that the function response to GET requests.  The _Path_ annotation defines the url associated with the call.  _Produces_ tells the application that the call will return either XML or JSON, depending on what the client requests.

The only line of code in the function is a great example of the grooviness that Groovy provides.  _ok_ is a static method that is imported above this code that simply returns a Response object with the 200 OK HTTP status.  The function takes generic input (more on this soon) to use as the body for the response.  Groovy does not require you to use parenthesis for functions in some cases, as you can see in this line.  The notation after _ok_ is what is used to create a new _LinkedHashMap_ object.  Really convenient right?  So what happens when we hit this API call?

> A message body writer for Java class java.util.LinkedHashMap, and Java type class java.util.LinkedHashMap, and MIME media type application/xml was not found

Out of the box, this code does not work.  Neither JAX-RS nor the Grails plugin include a message body writer that will convert a _LinkedHashMap_ into XML or JSON.  If we were to add a set of brackets to the map, we have turned our map into a list containing a single map, and this works since a body writer that will convert a list object is included.  While this could be considered a viable workaround, a list implies multiple (possible) results, while for the specific call it does not make sense to return multiple items.

##The Solution
A message body writer is a component of JAX-RS that helps convert some input object type to the requested output type.  JAX-RS has several registered providers that do this.  It will look at each registered provider and determine if that specific provider will output the requested type to a string, and if it is able to convert the input object type.  So I merely had to write one of these providers.

The grails plugin makes it easy to register a new provider.  The [documentation](http://code.google.com/p/grails-jaxrs/wiki/AdvancedFeatures#Custom_providersI) sets certain requirements for a new provider to magically work:

* must be annotated with `@javax.ws.rs.ext.Provider`
* must have a file name matching `*Reader.groovy` if the corresponding class implements `javax.ws.rs.ext.MessageBodyReader`
* must have a file name matching `*Writer.groovy` if the corresponding class implements `javax.ws.rs.ext.MessageBodyWriter`

Also the file must be placed in a specific folder within your grails project: **grails-app/providers** (note that you will also need the directory structure defined by your package name, so **grails-app/providers/com/budjb/util/jaxrs** in my example).  Simply drop the following code into **HashMapWriter.groovy** in that directory and the above call works as expected.

```groovy
/**
 * Copyright 2012 Bud Byrd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.budjb.util.jaxrs

import static org.grails.jaxrs.support.ConverterUtils.*
import static org.grails.jaxrs.support.ProviderUtils.*
import org.codehaus.groovy.grails.commons.GrailsApplication
import grails.converters.JSON
import grails.converters.XML
import javax.ws.rs.Produces
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyWriter
import javax.ws.rs.ext.Provider
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Type
import java.lang.annotation.Annotation

/**
 * JaxRS message writer supporting hash maps.
 *
 * @author Bud Byrd
 */
@Provider
@Produces(['text/xml', 'application/xml', 'text/json', 'application/json'])
class HashMapWriter implements MessageBodyWriter<Object> {
	/**
	 * Inject the grails application.
	 */
	GrailsApplication grailsApplication

	/**
	 * Returns the size of the converted text.
	 * We return -1 because we won't be figuring it out.
	 *
	 * @return Size of the converted text.
	 */
	public long getSize(Object t, Class type, Type genericType, Annotation[] annotations, MediaType mediaType) {
		-1
	}

	/**
	 * Determines if this writer supports the input and output types/objects.
	 *
	 * @return Whether this writer can do the conversion.
	 */
	public boolean isWriteable(Class type, Type genericType, Annotation[] annotations, MediaType mediaType) {
		if (!isXmlType(mediaType) && !isJsonType(mediaType)) {
			return false
		}

		HashMap.class.isAssignableFrom(type)
	}

	/**
	 * Converts the input object to the requested output type.
	 */
	public void writeTo(Object t, Class type, Type genericType, Annotation[] annotations, MediaType mediaType, MultivaluedMap httpHeaders, OutputStream entityStream) {
		if (isXmlType(mediaType)) {
			def writer = new OutputStreamWriter(entityStream, getDefaultXMLEncoding(grailsApplication))
			def converter = new XML(t)
			converter.render(writer)
		}
		else {
			def writer = new OutputStreamWriter(entityStream, getDefaultJSONEncoding(grailsApplication))
			def converter = new JSON(t)
			converter.render(writer)
		}
	}
}
```

And that's it! Now you can return hash maps within a API service where it makes sense.
