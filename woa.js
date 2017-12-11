function woa(config) {
  if (typeof config !== 'object') {
    const msg = `Expected an Object Argument but received: ${typeof config}.`;

    throw new Error(msg);
  } else if (!config.hasOwnProperty('text') || typeof config.text !== 'string') {
    const msg = '\'text\' property is required and it should be an String, ' +
      `but received: ${typeof config.text}`;

    throw new Error(msg);
  }

  const text = cleanText(config.text);
  const words = text.split(' ');
  const keywords = getKeywords(config.keywords, words);
  const counts = {};
  const frecuency = {};

  keywords.map(kw => {
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

function cleanText(text) {
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
        keywords = [...keywords, word.toLowerCase()];
      }
    }
  }

  return keywords;
}

export default woa;
