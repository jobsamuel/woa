# woa [![npm version](https://img.shields.io/npm/v/woa.svg?style=flat-square)](https://www.npmjs.com/package/woa) [![downloads](https://img.shields.io/npm/dt/woa.svg?style=flat-square)](https://www.npmjs.com/package/woa) [![license](https://img.shields.io/npm/l/woa.svg?style=flat-square)](https://www.npmjs.com/package/woa)
> NodeJS module for word analytics

## installation

```bash
$ npm install woa
```

## usage

```js
// example.js

import woa from 'woa';

const text = `What is love?
  Baby, don't hurt me
  Don't hurt me no more`;

const keywords = ['hurt', 'baby', 'oh'];
const result = woa({text, keywords});

console.log(result);
```

The result will be something like this:

```json
{
  "hurt": 0.16666666666666666,
  "baby": 0.08333333333333333,
  "oh": "n/a"
}
```

## why this module?

I stumbled upon the necessity of a tool that simplifies comments processing; I just want to make easy the analysis of any text.

**woa** helps you to discover and count patterns in text using the power of Node. It's written in pure Javascript, blazing fast and easy to use.

Would you like to try it out?

## api

### `woa(config)`

Generate a JSON with the percent occurrence of each keyword in a text.

#### argument

`config` an Object containing these parameters:

- `text` The text to be processed. Must be a *String* containing Text to be processed.

- `keywords` *optional*  word or list of words to count in a text. Must be a *String* or an *Array of Strings*.

## testing

Since _woa_ is super simple, tests are super simple too:

```bash
$ npm test
```

## contribution

Feel free to fork and create a Pull Request with new features or an improvement of the current ones.

## license

[MIT](http://opensource.org/licenses/MIT) License :copyright: 2017 Jobsamuel Núñez
