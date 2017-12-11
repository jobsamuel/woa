const woa = require('./index');

const text = `What is love?
  Baby, don't hurt me
  Don't hurt me no more`;

const keywords = ['hurt', 'baBy', 'oh'];

try {
  console.log(`\n${'*'.repeat(20)}`);
  console.log('Test 1:');
  console.log(`${'-'.repeat(20)}`);
  console.log('Expected: ERROR');
  console.log(`${'-'.repeat(20)}`);
  console.log('Received: ↴↴↴↴↴');
  console.log(woa('what?'));
} catch (e) {
  console.log(e);
} finally {
  console.log(`${'-'.repeat(20)}`);
  console.log('Test 1 done!');
  console.log(`${'*'.repeat(20)}\n\n`);
}

try {
  console.log(`${'*'.repeat(20)}`);
  console.log('Test 2:');
  console.log(`${'-'.repeat(20)}`);

  const test = woa({text});
  const obj = {
    what: 0.08333333333333333,
    is: 0.08333333333333333,
    love: 0.08333333333333333,
    baby: 0.08333333333333333,
    dont: 0.16666666666666666,
    hurt: 0.16666666666666666,
    me: 0.16666666666666666,
    no: 0.08333333333333333,
    more: 0.08333333333333333
  }

  console.log(`Expected: ${JSON.stringify(obj, null, 2)}`);
  console.log(`${'-'.repeat(20)}`);
  console.log(`Received: ${JSON.stringify(test, null, 2)}`);
} catch (e) {
  console.log(e);
} finally {
  console.log(`${'-'.repeat(20)}`);
  console.log('Test 2 done!');
  console.log(`${'*'.repeat(20)}\n\n`);
}

try {
  console.log(`${'*'.repeat(20)}`);
  console.log('Test 3:');
  console.log(`${'-'.repeat(20)}`);

  const test = woa({text, keywords});
  const obj = {
    hurt: 0.16666666666666666,
    baby: 0.08333333333333333,
    oh: 'n/a'
  }

  console.log(`Expected: ${JSON.stringify(obj, null, 2)}`);
  console.log(`${'-'.repeat(20)}`);
  console.log(`Received: ${JSON.stringify(test, null, 2)}`);
} catch (e) {
  console.log(e);
} finally {
  console.log(`${'-'.repeat(20)}`);
  console.log('Test 3 done!');
  console.log(`${'*'.repeat(20)}\n\n`);
}

try {
  console.log(`${'*'.repeat(20)}`);
  console.log('Test 4:');
  console.log(`${'-'.repeat(20)}`);

  const test = woa({text: 'no more', keywords});
  const obj = {
    hurt: 'n/a',
    baby: 'n/a',
    oh: 'n/a'
  }

  console.log(`Expected: ${JSON.stringify(obj, null, 2)}`);
  console.log(`${'-'.repeat(20)}`);
  console.log(`Received: ${JSON.stringify(test, null, 2)}`);
} catch (e) {
  console.log(e);
} finally {
  console.log(`${'-'.repeat(20)}`);
  console.log('Test 4 done!');
  console.log(`${'*'.repeat(20)}\n\n`);
}
