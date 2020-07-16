import { getTaskList, showTaskListAction, } from '../../src/actions/TaskActions';
import { ITask } from '../../src/states/ITask';

const dispatch = jest.fn();

const loadTaskList = jest.fn();

(global as any).window = {
  core: {
    loadTaskList,
  },
};

const testTaskList: ITask[] = [
  {
    complete: false,
    deadline: new Date('2020-04-24T15:02:00.0000Z'),
    id: 'x001',
    taskName: 'name001',
  },
  {
    complete: false,
    deadline: new Date('2020-04-25T12:02:00.0000Z'),
    id: 'x002',
    taskName: 'name002',
  },
];

describe('getTaskList', () => {
  test('success', async () => {
    loadTaskList.mockResolvedValue(testTaskList);
    const action = showTaskListAction.done({
      result: testTaskList,
      params: null
    });
    await getTaskList(dispatch);
    expect(dispatch).toBeCalledWith(action);
  });
  test('failed', async () => {
    loadTaskList.mockRejectedValueOnce(new Error());
    const action = showTaskListAction.failed({
      error: 'ファイルの読み込みに失敗しました。',
      params: null,
    });
    await getTaskList(dispatch);
    expect(dispatch).toBeCalledWith(action);
  });
});