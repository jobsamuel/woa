import fs from 'fs';

class Woa {
    constructor(text, options) {
        if (typeof text !== 'string') {
            throw new Error('The first argument must be a String.');
        } else if (options && typeof options !== 'object') {
            throw new Error('The second argument must be an Object.');
        }

        this._text = cleanText(text);
        this._words = this._text.split(' ');
        this._options = options || false;
    }

    frecuency(keywords, callback) {
        const _counts = {};
        const _frecuency = {};
        let _keywords;
        let _kw;
        let _pr;

        if (typeof keywords === 'string') {
            _kw = [];
            _kw.push(keywords.toLowerCase());
        } else if (typeof keywords !== 'object' || keywords[0] === undefined) {
            throw new Error('The argument must be an Array of strings.');
        }

        _keywords = _kw || keywords.map(k => k.toLowerCase());

        _keywords.forEach(_k => {
            this._words.forEach(function(_w) {
                const _v = new RegExp(_k);

                if (_v.test(_w)) {
                    _counts[_k] ? _counts[_k] += 1 : _counts[_k] = 1;
                }
            });
            
            if (_counts[_k]) {
                _frecuency[_k] = _counts[_k] / this._words.length
            } else {
                _frecuency[_k] = 'n/a';
            }
        });

        if (callback && typeof callback === 'function') {
            return callback(_frecuency);
        }

        return _frecuency;
    }
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

export default Woa;
