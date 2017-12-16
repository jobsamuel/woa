const woa = require('./index');

const text = `
  What is love?
  Baby don't hurt me
  Don't hurt me
  No more

  Baby don't hurt me, don't hurt me
  No more
  What is love?
  Yeah

  I don't know why you're not fair
  I give you my love, but you don't care
  So what is right and what is wrong?
  Gimme a sign

  What is love?
  Baby don't hurt me
  Don't hurt me
  No more

  What is love?
  Baby don't hurt me
  Don't hurt me
  No more

  Oh, I don't know, what can I do?
  What else can I say, it's up to you
  I know we're one, just me and you
  I can't go on

  What is love?
  Baby don't hurt me
  Don't hurt me
  No more

  What is love?
  Baby don't hurt me
  Don't hurt me
  No more

  What is love?
  What is love?
  What is love?
  Baby don't hurt me
  Don't hurt me
  No more
  Don't hurt me
  Don't hurt me

  I want no other, no other lover
  This is our life, our time
  We are together I need you forever
  Is it love?

  What is love?
  Baby don't hurt me
  Don't hurt me
  No more

  What is love?
  Baby don't hurt me
  Don't hurt me
  No more

  Yeah, yeah, (woah-woah-woah, oh, oh)
  (Woah-woah-woah, oh, oh)

  What is love?
  Baby don't hurt me
  Don't hurt me
  No more

  What is love?
  Baby don't hurt me
  Don't hurt me
  No more

  Baby don't hurt me
  Don't hurt me
  No more

  Baby don't hurt me
  Don't hurt me
  No more
  What is love?`;

const keywords = ['less', 'tOgeTher', 'ok'];

testWoa();

function testWoa() {
  runTest({id: 1});
  runTest({id: 2, text});
  runTest({id: 3, keywords});
  runTest({id: 4, text, keywords: 'together'});
}

function buildTable(id, data) {
  const [a, b, c] = data.map(txt => `${' '.repeat(span(txt).left)}${txt}${' '.repeat(span(txt).right)}`);
  const table = `
    ┌${'─'.repeat(38)}┐
    │${' '.repeat(10)}Running TEST ${id}...${' '.repeat(11)}│
    │${'─'.repeat(38)}│
    │ EXPECTED │${a}│
    │${'─'.repeat(38)}│
    │ RECEIVED │${b}│
    │${'─'.repeat(38)}│
    │  RESULT  │${c}│
    │${'─'.repeat(38)}│
    │${' '.repeat(10)}TEST ${id} Completed.${' '.repeat(11)}│
    └${'─'.repeat(38)}┘
  `;

  return table;

  function span(text) {
    const left = Math.floor((27 - text.length) / 2);
    const right = (27 - left - text.length);

    return {left, right};
  }
}

function runTest(config) {
  const {id, text, keywords} = config;
  let results;
  let output;
  let table;

  try {
    output = woa({text, keywords});
  } catch (error) {
    output = error;
  }

  results = getResults({output, config});
  table = buildTable(id, results);

  console.log(table);
}

function getResults({output, config}) {
  const references = [
    {name: 'love', value: 0.06614785992217899},
    {name: 'life', value: 0.0038910505836575876},
    {name: 'hurt', value: 0.10894941634241245},
    {name: 'time', value: 0.0038910505836575876},
    {name: 'together', value: 0.0038910505836575876}
  ];
  const test = references[Math.floor(Math.random()*5)];
  let values = [];

  if (output instanceof Error && !config.text) {
    values = ['ERROR', 'ERROR'];
  } else if (output instanceof Error) {
    values = [test.value, 'ERROR'];
  } else if (output && config.text && config.keywords) {
    values = [references[4].value, output.together];
  } else if (output && config.text) {
    values = [test.value, output[test.name]];
  }

  return values.map(val => isNaN(val) ? val : val.toFixed(5))
    .reduce((a, b, i, arr) => a === b ? arr.concat('passed ✔') : arr.concat('failed ✘'));
}
