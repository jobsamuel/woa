# woa
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

# todo

- [ ] Make `keywords` optional and return the frecuency of all unique words in text.
- [ ] Add API documentation.

# license

[MIT](http://opensource.org/licenses/MIT) License :copyright: 2015 Hearty Robot and [other contributors](https://github.com/heartyrobot/woa/graphs/contributors)