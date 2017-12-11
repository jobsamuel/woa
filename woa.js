function woa({text, keywords} = {}) {
  if (arguments.length === 0 || typeof arguments[0] !== 'object') {
    const msg = `Expected an Object Argument but received: ${typeof arguments[0]}.`;

    throw new Error(msg);
  } else if (!text || typeof text !== 'string') {
    const msg = `'text' is required and it should be a String, but received: ${typeof text}.`;

    throw new Error(msg);
  }

  const cleanText = sanitizeText(text);
  const words = cleanText.split(' ');
  const processedKeywords = getKeywords(keywords, words);
  const counts = {};
  const frecuency = {};

  processedKeywords.map(kw => {
    words.map(w => {
      const value = new RegExp(kw);

      if (value.test(w)) {
        counts[kw] ? counts[kw] += 1 : counts[kw] = 1;
      }
    });

    frecuency[kw] = counts[kw] ? counts[kw] / words.length : 'n/a';
  });

  return frecuency;
}

function sanitizeText(text) {
  return text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]|\u0027/g, '')
    .replace(/\W+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function getKeywords(defined, auto) {
  let keywords = [];

  if (defined && Array.isArray(defined)) {
    keywords = defined;
  } else if (defined) {
    keywords = Array.of(defined);
  } else {
    for (let word of auto) {
      if (!keywords.includes(word)) {
        keywords = [...keywords, word];
      }
    }
  }

  return keywords.map(kw => kw.toLowerCase());
}

export default woa;
