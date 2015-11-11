import fs from 'fs';

function woa(text, keywords, callback) {
    if (typeof text !== 'string') {
        throw new Error('The first parameter must be a String.');
    }

    const _text = cleanText(text);
    const _words = _text.split(' ');
    const _counts = {};
    const _frecuency = {};
    let _keywords;
    let _kw;

    if (!keywords || typeof keywords === 'function') {
        _kw = getKeywords(_words);
    } else if (typeof keywords === 'string') {
        _kw = [];
        _kw.push(keywords.toLowerCase());
    } else if (keywords && callback && (typeof keywords !== 'object' || keywords[0] === undefined)) {
        throw new Error('The second parameter must be a string or an array of strings.');
    } else if (!callback && (typeof keywords !== 'object' || keywords[0] === undefined)) {
        throw new Error('The second parameter must be a string, an Array of strings or a callback function.');
    }

    _keywords = _kw || keywords.map(k => k.toLowerCase());

    _keywords.forEach(function(_k) {
        _words.forEach(function(_w) {
            const _v = new RegExp(_k);

            if (_v.test(_w)) {
                _counts[_k] ? _counts[_k] += 1 : _counts[_k] = 1;
            }
        });
        
        if (_counts[_k]) {
            _frecuency[_k] = _counts[_k] / _words.length
        } else {
            _frecuency[_k] = 'n/a';
        }
    });

    if (callback && typeof callback === 'function') {
        return callback(_frecuency);
    } else if (keywords && typeof keywords === 'function') {
        return keywords(_frecuency);
    }

    return _frecuency;
}

function cleanText(text) {
    let tx = '';
    let ty;
    let t1;
    let t2;

    try { 
        ty = fs.readFileSync(text, 'utf8');
    } catch (e) { 
        ty = text;
    };

    t1 = ty.toLowerCase().split(' ');
    
    t2 = t1.map(t => t.replace(/[^a-z]/g, ' '));
    
    t2.forEach(t => tx = tx + ' ' + t);

    return tx.replace(/\s{2,}/g, ' ').trim();
}

function getKeywords(text) {
    let someWords = [];

    text.forEach(function(w) {
        if (someWords.indexOf(w) === -1) {
            someWords.push(w);
        }
    });

    return someWords;
}

export default woa;
