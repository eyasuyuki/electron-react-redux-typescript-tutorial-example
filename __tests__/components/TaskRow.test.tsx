import 'jsdom-global/register'; //at the top of file, even before importing React
import enzyme, { mount } from 'enzyme';
// @ts-ignore
import EnzymeAdapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import React from 'react';
import TaskRow from '../../src/components/TaskRow';
import { ITask } from '../../src/states/ITask';
import { deleteTask } from '../../src/actions/TaskActions';


beforeAll(() => {
  enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
  });
});

const dispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => dispatch,
}));

jest.mock('../../src/actions/TaskActions');

describe('TaskRow', () => {
  const task: ITask = {
    complete: true,
    deadline: new Date('2020-01-01T12:00:00.000Z'),
    id: 'task001',
    taskName: 'task-name',
  };
  test('complete', () => {
    const wrapper = mount(<TaskRow data={task} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('click delete', () => {
    const wrapper = mount(<TaskRow data={task} />);
    const deleteButton = wrapper.find('div.deleteButton');
    deleteButton.simulate('click');
    expect(deleteTask).toBeCalledWith('task001', dispatch);
  });
});
