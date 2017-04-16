function woa(config) {
  if (typeof config !== 'object') {
    throw new Error(`Expected an Object Argument but received: ${typeof config}.`);
  } else if (!config.hasOwnProperty('text') || (typeof config.text !== 'string' && !Array.isArray(config.text))) {
    throw new Error(`\'text\' property is required and it should be an String or an Array of Strings, but received: ${typeof config.text}`);
  }

  const text = cleanText(config.text);
  const words = text.split(' ');
  const keywords = getKeywords(config.keywords, words);
  const counts = {};
  const frecuency = {};

  keywords.forEach(function(k) {
    words.forEach(function(w) {
      const v = new RegExp(k);

      if (v.test(w)) {
        counts[k] ? counts[k] += 1 : counts[k] = 1;
      }
    });

    if (counts[k]) {
      frecuency[k] = counts[k] / words.length
    } else {
      frecuency[k] = 'n/a';
    }
  });

  return frecuency;
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

function getKeywords(defined, auto) {
  let kw;

  if (defined && Array.isArray(defined)) {
    kw = defined;
  } else if (defined) {
    kw = Array.of(defined);
  } else {
    kw = [];

    auto.map(w => {
      if (kw.indexOf(w) === -1) {
        kw.push(w);
      }
    });
  }

  return kw.map(w => w.toLowerCase());
}

export default woa;
