import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ITaskList } from '../states/ITask';
import { showTaskListAction } from '../actions/TaskActions';

const initState: ITaskList = {
  tasks: [],
  loading: false,
  failedMessage: '',
};

const taskReducer = reducerWithInitialState<ITaskList>(initState)
  .case(showTaskListAction.started, (state) => ({
    ...state,
    loading: true,
    failedMessage: '',
  }))
  .case(showTaskListAction.done, (state, payload) => ({
    ...state,
    tasks: payload.result,
    loading: false,
    failedMessage: '',
  }))
  .case(showTaskListAction.failed, (state, payload) => ({
    ...state,
    loading: false,
    failedMessage: payload.error,
  }))
  .build();

export default taskReducer;
