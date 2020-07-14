import { ITask } from '../states/ITask';

export default interface ICore {
  loadTaskList: () => Promise<ITask[]>;
  saveTask: (task: ITask) => Promise<ITask[]>;
  deleteTask: (taskId: string) => Promise<ITask[]>;
}

declare global {
  interface Window {
    core: ICore;
  }
}
