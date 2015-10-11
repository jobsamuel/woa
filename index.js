var fs = require('fs');

function Woa (text, options) {
    if (typeof text !== 'string') {
        throw new Error('The first argument must be a String.');
    } else if (options && typeof options !== 'object') {
        throw new Error('The second argument must be an Object.');
    }
    this._text = cleanText(text);
    this._words = this._text.split(' ');
    this._options = options || false;
}

function cleanText (text) {
    var tx = '';
    var _tx;
    var t1;
    var t2;
    try { _tx = fs.readFileSync(text, 'utf8') } catch (e) { _tx = text };
    t1 = _tx.toLowerCase().split(' ');
    t2 = t1.map(function (t) { return t.replace(/[^a-z]/g, ' ') });
    t2.forEach(function (t) { tx = tx + ' ' + t });
    return tx.replace(/\s{2,}/g, ' ').replace(/^\s|\s$/g, '');
}

Woa.prototype.frecuency = function (keywords, callback) {
    var self = this;
    var _counts = {};
    var _frecuency = {};
    var _keywords;
    var _kw;
    var _pr;
    if (typeof keywords === 'string') {
        _kw = [];
        _kw.push(keywords.toLowerCase());
    } else if (typeof keywords !== 'object' || keywords[0] === undefined) {
        throw new Error('The argument must be an Array of strings.');
    }
    _keywords = _kw || keywords.map(function (k) { return k.toLowerCase() });
    _keywords.forEach(function (_k) {
        self._words.forEach(function (_w) {
            var __k = new RegExp(_k);
            if (__k.test(_w)) {
                _counts[_k] ? _counts[_k] += 1 : _counts[_k] = 1;
            }
        });
        if (_counts[_k]) {
            _frecuency[_k] = _counts[_k] / self._words.length
        } else {
            _frecuency[_k] = 'n/a';
        }
    });
    if (callback && typeof callback === 'function') {
        return callback(_frecuency);
    }
    return _frecuency;
}

module.exports = Woa;