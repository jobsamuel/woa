# woa [![npm version](https://img.shields.io/npm/v/woa.svg?style=flat-square)](https://www.npmjs.com/package/woa) [![downloads](https://img.shields.io/npm/dt/woa.svg?style=flat-square)](https://www.npmjs.com/package/woa) [![license](https://img.shields.io/npm/l/woa.svg?style=flat-square)](https://www.npmjs.com/package/woa)
> NodeJS module for word analytics

# installation

```bash
$ npm install woa
```

# usage

Example.js

```js
import woa from 'woa';

const text = 'What is love?' +
    'Baby, don\'t hurt me' +
    'Don\'t hurt me no more';

const keywords = ['hurt', 'baby', 'oh'];
const result = woa(text, keywords);

console.log(result);
```

The result will be this:

```json
{
    "hurt": 0.16666666666666666,
    "baby": 0.08333333333333333,
    "oh": "n/a"
}
```

Also, you can use an external text file with a callback:

```js
// ...

const words = 'path/to/text.txt';
const keywords = ['gimme', 'a', 'sign'];

woa(words, keywords, function(result) {
    console.log(result);
});
```

# why this module?

We stumble upon the necessity of a tool that simplify comment processing for [Instagram Analytics](https://github.com/heartyrobot/node-instagram-analytics); we just want to make easy the analysis of any text.

**woa** helps you to discover and count patterns in text using the power of Node. It's written in pure javascript, blazing fast and easy to use.

Would you like to try it out?

# api

### woa(text, keywords, onComplete)

Generate a JSON with the percent occurrence of each keyword in a text.

#### arguments

`text` The text to be processed. Must be a *String* containing either Text to be processed or a file path to it.

`keywords` *optional*  word or list of words to count in a text. Must be a *String* or an *Array of Strings*.

`onComplete` An *optional* callback function that will be called when the text analysis is completed. The callback will be passed a JSON with the result.

# todo

- [x] Make `keywords` optional and return the frecuency of all unique words in text.
- [x] Add API documentation.

# contribution

Feel free to fork and create a Pull Request with new features or an improvement of the current ones. Just keep in mind this [Javascript Style Guide](https://github.com/airbnb/javascript/tree/master/es5) when you're coding your contribution.

# license

[MIT](http://opensource.org/licenses/MIT) License :copyright: 2015 Hearty Robot and [other contributors](https://github.com/heartyrobot/woa/graphs/contributors)