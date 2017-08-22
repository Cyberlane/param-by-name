import proxy from 'proxyquire';
import tape from 'tape';

const proxyquire = proxy.noCallThru();

const paramByNameProxy = stubValue =>
  proxyquire('./param-by-name', {
    './get-query-string': () => stubValue,
  }).default;

const begin = funcTest => (funcName, check) => {
  funcTest(`-| ${funcName}`, ({ test }) => {
    if (check) {
      check((checkName, tests) => {
        test(`-|=> ${checkName}`, (assert) => {
          tests(assert);
          assert.end();
        });
      });
    }
  });
};

tape('param-by-name.js', ({ test }) => {
  const testFunction = begin(test);

  testFunction('default', (check) => {
    check('no name returns empty string', (assert) => {
      const paramByName = paramByNameProxy(null);
      const result = paramByName();
      assert.equal(result, '');
    });
    check('null name returns empty string', (assert) => {
      const paramByName = paramByNameProxy(null);
      const result = paramByName(null);
      assert.equal(result, '');
    });
    check('invalid param returns empty string', (assert) => {
      const paramByName = paramByNameProxy('?foo=bar');
      const result = paramByName('name');
      assert.equal(result, '');
    });
    check('valid param returns valid value', (assert) => {
      const paramByName = paramByNameProxy('?foo=bar');
      const result = paramByName('foo');
      assert.equal(result, 'bar');
    });
    check('valid param returns valid value amongst others', (assert) => {
      const paramByName = paramByNameProxy('?foo=bar&name=Justin&extra=stuff');
      const result = paramByName('name');
      assert.equal(result, 'Justin');
    });
  });
});
