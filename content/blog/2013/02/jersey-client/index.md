---
title: Simplifying Jersey Client with a builder-style syntax
date: '2013-02-08T09:22-0500'
readtime: 10 min
author: Bud Byrd
coverPhoto: ./cover.jpg
coverAttribution: Photo by 贝莉儿 DANIST on Unsplash
---

I recently looked into an issue my friend was having with an HTTP call and its failure to correctly convert JSON. The conversion problem is partly due to the resource that he was hitting returning a newline before the actual JSON text. I found he was using HTTPBuilder, which provides a builder-style syntax to create requests. The syntax was easy to use, but the library itself is old and relies on old libraries.

I didn't feel comfortable with the library, so I looked into using the Jersey client to do requests since the JaxRS grails plugin we use provides it. Jersey itself works well, but the syntax can be a bit verbose and while you can chain functions together to avoid a bunch of lines of code, it must be done in the correct order due to the object types these functions return. To ease the transition to Jersey, I decided to write a builder-style class that hides the ugliness of Jersey client.

## RequestBuilder

The RequestBuilder source can be found in this [gist](https://gist.github.com/budjb/ce90727caadbe9859dceee4593587966).

##Using RequestBuilder
The RequestBuilder supports the GET, POST, PUT, and DELETE method, as well as query parameters, headers, and automatic JSON conversion. Each HTTP method also has a shortcut function that only requires a URL to hit.

###Supported properties

- **uri** - The request URI. This is the only required property.
- **query** - A map of key/value pairs to use in the query string. These are escaped for you.
- **headers** - A map of headers in key/value pairs.
- **form** - A map of key/value pairs to use as an encoded form. This format is what web browsers use when posting web forms to a server. Note that if anything is set in here, the form will be used as the content of the request and **body** will be ignored.
- **accept** - What content MIME-type to request back from the server.
- **body** - Request body. Only useful with POST or PUT methods.
- **convertJson** - Whether to automatically convert the response to a JSON map or list based on the content-type returned from the server. Defaults to true.
- **binaryResponse** - If true, will not convert the response and instead return a byte array. Useful when you expect some binary data back from the server. Defaults to false.

###Examples

```groovy
// Get a person named Bud via query parameters
result = new RequestBuilder().get {
    uri = 'http://example.com/person'
    query = [
        name: 'Bud',
        sex: 'Male'
    ]
    accept = 'application/json'
}

// Add a new person named John with an encoded form
result = new RequestBuilder().post {
    uri = 'http://example.com/person'
    form = [
        name: 'John',
        sex: 'Male',
        age: 32
    ]
}

// Get a person named John via a RESTful call,
// using the shortcut function
result = new RequestBuilder().get('http://example.com/person/John')
```

##Error Handling
The response handler will look at the response status code, and return the content of the response with no exceptions thrown if the status code is in the 200 range. If anything else is encountered, a **ResponseStatusException** is thrown with both the status code and the content that would have been returned.

```groovy
def result
try {
    // I'm expecting to get a 404 status back
    result = new RequestBuilder().get {
        uri = 'http://example.com/person/DoesNotExist'
    }
}
catch (ResponseStatusException e) {
    println "Status code: ${e.status}"
    println "Response content: ${e.content}"
}
```

##In Closing...
I believe this builder greatly simplifies making HTTP calls using Jersey. I know of the Apache Components library and how robust it is, but I used Jersey client merely because I was already using it. I hope this code helps someone, and just leave a comment if you have any questions or if I missed something.
