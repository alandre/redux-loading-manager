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
        const {[typeBase + requestPostfix]: omitted, ...nextState} = prevState;

        return nextState;
      }

      return prevState;
    }, state);
  };
};

export const selectIsLoading = (state, type, reducerName = 'loading') => !!state[reducerName][type];

export default createLoadingReducer;
