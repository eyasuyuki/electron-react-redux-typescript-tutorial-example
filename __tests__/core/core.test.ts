import fs from 'fs-extra';
import { mocked } from 'ts-jest';
import target, { __private__ } from '../../src/core/core';
import { ITask } from '../../src/states/ITask';
import path from 'path';

jest.mock('fs-extra');

jest.mock('os', () => ({
  homedir: (): string => '/home',
  platform: jest.fn(),
}));

const testTaskList: ITask[] = [
  {
    complete: false,
    deadline: new Date('2020-04-24T15:02:00.000Z'),
    id: 'x001',
    taskName: 'name001',
  },
  {
    complete: false,
    deadline: new Date('2020-04-25T12:02:00.0000Z'),
    id: 'x0002',
    taskName: 'name002',
  },
];

describe('__private__', () => {
  test('reviver', () => {
    const key1 = 'deadline';
    const value = '2020-04-25T01:02:00.000Z';
    const result1 = __private__.reviver(key1, value);
    expect(result1).toEqual(new Date(2020, 3, 25, 10, 2, 0));
    const key2 = 'other';
    const result2 = __private__.reviver(key2, value);
    expect(result2).toEqual(value);
  });
});

describe('loadTaskList', () => {
  const dataFilePath = path.join('/home', 'todo.json');
  test('success - exist data file', async () => {
    mocked(fs.pathExists).mockResolvedValue(true as never);
    mocked(fs.readJSON).mockResolvedValue({ data: testTaskList } as never);
    const taskList = await target.loadTaskList();
    expect(fs.ensureFileSync).not.toBeCalled();
    expect(fs.writeJSON).not.toBeCalled();
    expect(taskList).toEqual(testTaskList);
  });
  test('success - not exist data file', async () => {
    mocked(fs.pathExists).mockResolvedValue(false as never);
    mocked(fs.readJSON).mockResolvedValue({ data: [] } as never);
    const taskList = await target.loadTaskList();
    expect(fs.ensureFileSync).toBeCalledWith(dataFilePath);
    expect(fs.writeJSON).toBeCalledWith(dataFilePath, { data: [] } as never);
    expect(taskList).toEqual([]);
  });
});
