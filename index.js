function Woa () {}

Woa.prototype.frecuency = function (text, keywords, callback) {

    var _counts = {};
    var _frecuency = {};
    var _text = text.toLowerCase();
    var _words = _text.split(' ');
    var _keywords = keywords.map(function (k) { return k.toLowerCase() });

    _keywords.forEach(function (_k) {
        _words.forEach(function (_w) {
            var __k = new RegExp(_k);
            if (__k.test(_w)) {
                _counts[_k] ? _counts[_k] += 1 : _counts[_k] = 1;
            }
        });
        _frecuency[_k] = _counts[_k] / _words.length
    });
    callback(JSON.stringify(_frecuency, undefined, 2));
}

module.exports = Woa;