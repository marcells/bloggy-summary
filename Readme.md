# bloggy-marked

> A markdown parser for blog posts in bloggy, a small and lightweight blog engine for node.js.

## Quickstart

That's everything you need. Just call the `engine.extendWith()` function of the bloggy engine.

```Javascript
var engine = require('bloggy')();

engine.extendWith(require('bloggy-query'));
engine.extendWith(require('bloggy-marked')); // Take care that bloggy-marked currently depends on bloggy-query
```

## Additional options

You're able to change the following settings.

```Javascript
var engine = require('bloggy')(),
    bloggyMarked = require('bloggy-marked');

// Enable syntax highlighting of code blocks (using highlight.js)
bloggyMarked.enableHighlighting();


// Make some fixes to the marked renderer to play well with bootstrap (add table and img-thumbnail class and fix image path)
// engine.setup({
//     baseDirectory: ...,
//     entryUrl: ...,
//     marked: {
//         imageUrl: 'http://mspi.es/images/blog/{imageUrl}'
//     },
//     ...
// });
bloggyMarked.enableBootstrapCompatibility();


// You can take full control over the parsing process (if you override this function, the two methods above aren't used)
bloggyMarked.parseMarkdownContent = function (markdownContent, options, callback) {
    // The options parameter contains engine.getOptions()
    // Do the markdown parsing here and finish it with
    callback('htmlContent');
};

engine.extendWith(bloggyMarked);

```

License
-------

The MIT License (MIT)

Copyright (c) 2014 Marcell Spies

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.