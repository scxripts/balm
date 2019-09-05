import './task';
import requireDir from 'require-dir';
import DefaultTask from './default';

const PRIVATE_TASKS = requireDir('./private');
const PUBLIC_TASKS = requireDir('./public');

function registerTasks(): void {
  const AwesomeTasks = BalmJS.utils.mergeDeep(PRIVATE_TASKS, PUBLIC_TASKS);

  Object.values(AwesomeTasks).forEach((AwesomeTask: any) => {
    const awesomeTask = new AwesomeTask();
    gulp.task(awesomeTask.taskName, awesomeTask.fn);
  });

  const defaultTask = new DefaultTask();
  gulp.task(defaultTask.taskName, gulp.series(BalmJS.tasks));
}

export default registerTasks;
