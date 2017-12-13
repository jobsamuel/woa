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

const keywords = ['hurt', 'baBy', 'oh'];
const hr = createHeader();
const table = buildTable;

testWoa();

function testWoa() {

  // DEBUG
  runTest({id: 1, text: 'sample'});
  runTest({id: 2});
}

function createHeader() {
  return {
    title: text => buildContainer(text, '*'),
    subtitle: text => buildContainer(text, '-')
  };
}

function buildContainer(text, pattern) {
  const span = ((40 - text.length) / 2) - 1;

  if (text.length < 40) {
    console.log(`${pattern.repeat(40)}`);
    console.log(`│${' '.repeat(span)}${text}${' '.repeat(span)}│`);
    console.log(`${pattern.repeat(40)}`);
  }
}

function buildTable(data) {
  const span = text => (((40 - 13) - text.length) / 2);
  const [a, b, c] = data;

  console.log(`\n\n┌${'─'.repeat(38)}┐`);
  console.log(`│ EXPECTED │ ${' '.repeat(span(a))}${a}${' '.repeat(span(a))}│`);
  console.log(`│${'─'.repeat(38)}│`);
  console.log(`│ RECEIVED │ ${' '.repeat(span(b))}${b}${' '.repeat(span(b))}│`);
  console.log(`│${'─'.repeat(38)}│`);
  console.log(`│  RESULT  │ ${' '.repeat(span(c))}${c}${' '.repeat(span(c))}│`);
  console.log(`└${'─'.repeat(38)}┘\n\n`);
}

function runTest(config) {
  const {id, text, keywords} = config;
  let current;
  let results;

  try {
    hr.title(`Running TEST ${id}...`);

    current = woa({text, keywords});
    results = getResults(current, config);

    table(results);
  } catch (error) {
    results = getResults(error, config);

    table(results);
  } finally {
    hr.subtitle(`TEST ${id} Completed.`);
  }
}

function getResults(received, config) {
  if (received instanceof Error && (!config.text && !config.keywords)) {
    return ['ERROR', 'ERROR', 'passed ✔'];
  } else if (received instanceof Error && config.text) {
    return ['\'love\' = 0.99', 'ERROR', 'failed ✘'];
  } else if (config.text && config.keywords) {
    return ['\'life\' = 0.5', '\'life\' = 0.5', 'passed ✔'];
  } else if (config.text) {
    return ['\'love\' = 0.9', '\'love\' = 0.99', 'passed ✔'];
  }
}
