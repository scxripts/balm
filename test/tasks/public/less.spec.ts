import LessTask from '../../../packages/balm-core/src/tasks/public/less';

describe('Less Task', function() {
  let lessTask: any;

  beforeEach(function() {
    lessTask = new LessTask();
  });

  describe('default', function() {
    before(function() {
      balm.config = {
        styles: {
          extname: 'less'
        }
      };
    });

    const defaultInput = path.join(balm.config.workspace, 'src', 'styles', '**', '!(_*).less');

    it(
      `expected output: "${defaultInput}"`,
      asyncCase(function() {
        lessTask.fn();

        expect(lessTask.input).to.equal(defaultInput);
      })
    );
  });

  describe('#mix.less()', function() {
    before(function() {
      balm.config = {
        styles: {
          extname: 'less'
        }
      };
    });

    const defaultInput = [
      path.join('less', '*.less')
    ];
    const defaultOutput = 'dist';

    it(
      `expected output: "${defaultInput}"`,
      asyncCase(function() {
        lessTask.recipe(defaultInput, defaultOutput, {})();

        expect(JSON.stringify(lessTask.input)).to.equal(
          JSON.stringify([
            path.join(balm.config.workspace, 'less', '*.less')
          ])
        );
        expect(lessTask.output).to.equal(path.join(balm.config.workspace, defaultOutput));
      })
    );
  });

  describe('ERROR', function() {
    before(function() {
      balm.config = {
        styles: {
          extname: 'less'
        }
      };
    });

    it(
      'error handler',
      asyncCase(function() {
        lessTask.recipe(
          path.join(balm.config.workspace, 'src/styles/error.less'),
          'dist'
        )();
      })
    );
  });
});
