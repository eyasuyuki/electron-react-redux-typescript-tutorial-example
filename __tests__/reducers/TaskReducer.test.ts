/* eslint-disable @typescript-eslint/no-explicit-any */
import reducer from '../../src/reducers/TaskReducer';
import { ITaskList } from '../../src/states/ITask';

describe('TaskReducer', () => {
  test('showTaskListAction: STARTED', () => {
    const beforeState: ITaskList = {
      failedMessage: 'before',
      loading: false,
      tasks: [],
    };
    const afterState = reducer(beforeState, {
      type: 'task-actions/show-task-list_STARTED',
    } as any);
    expect(afterState).toEqual({
      failedMessage: '',
      loading: true,
      tasks: [],
    });
  })
});