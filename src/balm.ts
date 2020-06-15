import pkg from '../package.json';
import './config';
import './utilities';
import './plugins';
import registerTasks from './tasks';
import { setConfig, setTask } from './bootstrap';
import { BalmConfig } from '@balm/index';

class Balm {
  #config: BalmConfig;

  constructor() {
    console.log(`BalmJS version: ${pkg.version}`);
    this.#config = BalmJS.config;
  }

  get config(): Partial<BalmConfig> {
    return this.#config;
  }
  set config(value: Partial<BalmConfig>) {
    this.#config = setConfig(value);
    BalmJS.config = this.#config;
  }

  set beforeTask(name: string | Function) {
    BalmJS.beforeTask = setTask(name);
  }
  set afterTask(name: string | Function) {
    BalmJS.afterTask = setTask(name);
  }

  go(recipe: Function = BalmJS.noop): void {
    if (BalmJS.utils.isFunction(recipe)) {
      registerTasks(recipe);
    } else {
      BalmJS.logger.error(
        'initialization',
        'BalmJS API: `balm.go(function(mix) {});`'
      );
    }
  }

  reset(): void {
    BalmJS.tasks = [];
    BalmJS.recipes = [];
    BalmJS.recipeIndex = 0;

    BalmJS.beforeTask = undefined;
    BalmJS.afterTask = undefined;

    BalmJS.config.useDefaults = true;
  }
}

export default Balm;
