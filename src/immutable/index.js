import { Map } from 'immutable';

const createLoadingReducer = ({
  requestPostfix = '_REQUEST',
  successPostfix = '_SUCCESS',
  errorPostfix = '_ERROR',
} = {}) => {
  return (state = Map(), action) => {
    if (action.type.endsWith(requestPostfix)) {
      return state.set(action.type, true);
    }

    return [successPostfix, errorPostfix].reduce((prevState, postfix) => {
      if (action.type.endsWith(postfix)) {
        const typeBase = action.type.slice(0, -postfix.length);
        return prevState.delete(typeBase + requestPostfix);
      }

      return prevState;
    }, state);
  };
};

export const createIsLoadingSelector = (type, reducerName = 'loading') => state => !!state.get(reducerName).get(type);

export default createLoadingReducer;
