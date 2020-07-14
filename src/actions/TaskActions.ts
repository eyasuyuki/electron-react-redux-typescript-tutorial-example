import { Dispatch } from 'redux';
import '../core/ICore';
import '../core/core';
import { actionCreatorFactory } from 'typescript-fsa';
import { ITask } from '../states/ITask';

const actionCreator = actionCreatorFactory('task-actions');

export const showTaskListAction = actionCreator.async<null, ITask[], string>(
  'shwo-task-list',
);

export const addTaskAction = actionCreator<ITask>('add');

export const toggleCompleteAction = actionCreator<string>('toggle-complete');

export const deleteTaskAction = actionCreator<string>('delete');

export const getTaskList = async (dispatch: Dispatch): Promise<void> => {
  dispatch(showTaskListAction.started(null));
  const taskList = await window.core.loadTaskList().catch((e) => {
    console.error(e);
    dispatch(
      showTaskListAction.failed({
        error: 'ファイルの読み込みに失敗しました。',
        params: null,
      }),
    );
  });
  if (!taskList) return;
  dispatch(showTaskListAction.done({ result: taskList, params: null }));
};

export const addTask = async (
  task: ITask,
  dispatch: Dispatch,
): Promise<void> => {
  dispatch(showTaskListAction.started(null));
  const taskList = await window.core.saveTask(task).catch((e) => {
    console.error(e);
    dispatch(
      showTaskListAction.failed({
        error: 'ファイルの書き込みに失敗しました。',
        params: null,
      }),
    );
  });
  if (!taskList) return;
  dispatch(showTaskListAction.done({ result: taskList, params: null }));
};

export const toggleTask = async (
  task: ITask,
  dispatch: Dispatch,
): Promise<void> => {
  dispatch(showTaskListAction.started(null));
  const taskList = await window.core.saveTask(task).catch((e) => {
    console.error(e);
    dispatch(
      showTaskListAction.failed({
        error: 'ファイルの書き込みに失敗しました。',
        params: null,
      }),
    );
  });
  if (!taskList) return;
  dispatch(showTaskListAction.done({ result: taskList, params: null }));
};

export const deleteTask = async (
  taskId: string,
  dispatch: Dispatch,
): Promise<void> => {
  dispatch(showTaskListAction.started(null));
  const taskList = await window.core.deleteTask(taskId).catch((e) => {
    console.error(e);
    dispatch(
      showTaskListAction.failed({
        error: 'ファイルの書き込みに失敗しました。',
        params: null,
      }),
    );
  });
  if (!taskList) return;
  dispatch(showTaskListAction.done({ result: taskList, params: null }));
};
