describe('Bootstrap', function() {
  describe('#checkTask()', function() {
    describe('before task', function() {
      before(function() {
        balm.beforeTask = 1024;
      });

      it(
        'expected output: "Task must be a string or function"',
        asyncCase(function() {
          balm.go();
        })
      );
    });

    describe('after task', function() {
      before(function() {
        balm.afterTask = 'unknown';
      });

      it(
        'expected output: "Invalid task name"',
        asyncCase(function() {
          balm.go();
        })
      );
    });
  });

  describe('#go()', function() {
    describe('!function', function() {
      before(function() {
        balm.go('gg');
      });

      it('expected output: "initialization error"', asyncCase(function() {}));
    });
  });
});
