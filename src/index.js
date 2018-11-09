const createLoadingReducer = ({
  requestPostfix = '_REQUEST',
  successPostfix = '_SUCCESS',
  errorPostfix = '_ERROR',
} = {}) => {
  return (state = {}, action) => {
    if (action.type.endsWith(requestPostfix)) {
      return {
        ...state,
        [action.type]: true,
      };
    }

    return [successPostfix, errorPostfix].reduce((prevState, postfix) => {
      if (action.type.endsWith(postfix)) {
        const typeBase = action.type.slice(0, -postfix.length);
        const nextState = {...prevState};
        delete nextState[typeBase + requestPostfix];

        return nextState;
      }

      return prevState;
    }, state);
  };
};

export const createIsLoadingSelector = (type, reducerName = 'loading') => state => !!state[reducerName][type];

export default createLoadingReducer;
