function Woa (text) {
    if (typeof text !== 'string') {
        throw new Error('The argument must be a string.');
    }
    this._text = text.toLowerCase();
    this._words = this._text.split(' ');
}

Woa.prototype.frecuency = function (keywords, callback) {

    var self = this;
    var _counts = {};
    var _frecuency = {};
    var _keywords;
    var _result;
    var _kw;

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
    _result = JSON.stringify(_frecuency, undefined, 2);
    if (callback && typeof callback === 'function') {
        return callback(_result);
    }
    return _result;
}

module.exports = Woa;