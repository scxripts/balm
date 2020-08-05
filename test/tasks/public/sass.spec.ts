import SassTask from '../../../packages/balm-core/src/tasks/public/sass';

describe('Sass Task', function () {
  let sassTask: any;

  beforeEach(function () {
    sassTask = new SassTask();
  });

  describe('default', function () {
    before(function () {
      balm.config = {
        styles: {
          extname: 'scss'
        }
      };
    });

    const defaultInput = path.join(balm.config.workspace, 'src', 'styles', '**', '!(_*).{scss,sass}');

    it(
      `expected output: "${defaultInput}"`,
      asyncCase(function () {
        sassTask.fn();

        expect(sassTask.input).to.equal(defaultInput);
      })
    );
  });

  describe('#mix.sass()', function () {
    before(function () {
      balm.config = {
        styles: {
          extname: 'scss',
          dartSass: true
        }
      };
    });

    const defaultInput = [
      path.join(balm.config.workspace, 'sass', '*.sass'),
      path.join(balm.config.workspace, 'scss', '*.scss')
    ];
    const defaultOutput = path.join(balm.config.workspace, 'dist');

    it(
      `expected output: "${defaultInput}"`,
      asyncCase(function () {
        sassTask.recipe(defaultInput, defaultOutput, {})();

        expect(JSON.stringify(sassTask.input)).to.equal(
          JSON.stringify(defaultInput)
        );
        expect(sassTask.output).to.equal(defaultOutput);
      })
    );
  });

  describe('miniprogram css', function () {
    before(function () {
      balm.config = {
        env: {
          isProd: true,
          isMP: true
        },
        styles: {
          extname: 'scss',
          dartSass: true
        }
      };
    });

    const defaultOutput = path.join(balm.config.workspace, 'dist', 'common', 'css');

    it(
      `expected output: "${defaultOutput}"`,
      asyncCase(function () {
        sassTask.fn();

        expect(sassTask.output).to.equal(defaultOutput);
      })
    );
  });
});
