import ScriptTask from '../../../src/tasks/public/script';

describe('script task', function() {
  let scriptTask: any;

  beforeEach(function() {
    scriptTask = new ScriptTask();
  });

  describe('default', function() {
    before(function() {
      balm.config = {
        scripts: {
          entry: './src/scripts/main.js'
        }
      };
    });

    const defaultInput = './src/scripts/main.js';

    it(`expected output: "${defaultInput}"`, function(done) {
      scriptTask.fn(done);

      expect(scriptTask.input).to.equal(defaultInput);
    });
  });

  describe('#mix.js()', function() {
    before(function() {
      balm.config = {
        logs: {
          level: 2
        }
      };
    });

    const defaultInput = './src/scripts/index.js';
    const defaultOutput = 'dist/js';

    it(`expected output: "${defaultInput}"`, function(done) {
      scriptTask.recipe(defaultInput, defaultOutput, {})(done);

      expect(scriptTask.input).to.equal(defaultInput);
      expect(scriptTask.output).to.equal(defaultOutput);
    });
  });
});