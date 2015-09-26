# woa [![npm version](https://badge.fury.io/js/woa.svg)](http://badge.fury.io/js/woa) [![npm](https://img.shields.io/npm/dm/woa.svg)]()
> NodeJS module for word analytics

# installation

```bash
$ npm install woa
```

# usage

Example.js

```js
var Woa = require('woa');

var text = 'What is love?' +
    'Baby, don\'t hurt me' +
    'Don\'t hurt me no more';

var keywords = ['hurt', 'baby', 'oh'];

var words = new Woa(text);

words.frecuency(keywords, function (result) {
    console.log(result);
});
```

The result will be something like this:

```json
{
    "hurt": 0.16666666666666666,
    "baby": 0.08333333333333333,
    "oh": "n/a"
}
```
# why this module?

We stumble upon the necessity of a tool that simplify comment processing for [Instagram Analytics](https://github.com/heartyrobot/node-instagram-analytics); we just want to make easy the analysis of any text.

**woa** helps you to discover and count patterns in text using the power of Node. It's written in pure javascript, blazing fast and easy to use.

Would you like to try it out?

# api methods

### new Woa(text)

Constructs a new Woa text from a string.

#### arguments

`text` The text to be processed. Must be a *string*.

### frecuency(keywords, onComplete)

Generate a JSON with the percent occurrence of each keyword in a text.

#### arguments

`keywords` Word or list of words to count in a text. Must be an *Array of strings* or a *string*.

`onComplete` A *optional* callback function that will be called when the text analysis is completed. The callback will be passed a JSON with the result.

# todo

- [ ] Make `keywords` optional and return the frecuency of all unique words in text.
- [x] Add API documentation.

# contribution

Feel free to fork and create a Pull Request with new methods or an improvement of the old ones.

# license

[MIT](http://opensource.org/licenses/MIT) License :copyright: 2015 Hearty Robot and [other contributors](https://github.com/heartyrobot/woa/graphs/contributors)