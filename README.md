# Redux Loading Manager

[Redux](https://redux.js.org/) reducer and selector for automatically manage loading states.

[![build status](https://img.shields.io/travis/reduxjs/redux-loading-manager/master.svg?style=flat-square)](https://travis-ci.org/reduxjs/redux-loading-manager)
[![npm version](https://img.shields.io/npm/v/redux-loading-manager.svg?style=flat-square)](https://www.npmjs.com/package/redux-loading-manager)
[![npm downloads](https://img.shields.io/npm/dm/redux-loading-manager.svg?style=flat-square)](https://www.npmjs.com/package/redux-loading-manager)

## Installation

```shell
npm install redux-loading-manager
```
or
```shell
yarn add redux-loading-manager
```


## Motivation

The better part of Redux applications want to manage requests performing to show some spinners or loading placeholders. Often, reducers of such applications look like this:

An action creator that returns a function to perform asynchronous dispatch:

```js
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const initialState = {
  isLoading: false,
  user: null,
  error: null
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, isLoading: true };

    case FETCH_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.user };

    case FETCH_USER_ERROR:
      return { ...state, isLoading: false, error: action.error };
  }
}
```

The larger the application, the more handlers:

```js
switch (action.type) {
  case FETCH_USER_REQEST:
    return { ...state, isUserFetching: true };

  case SEND_MESSAGE_REQUEST:
    return { ...state, isMessageSending: true };

  case REMOVE_ARTICLE_REQUEST:
    return { ...state, isArticleRemoving: true };

  // ...
}
```

Redux loading manager handles all of the requests and automatically stores their loading states, so you no longer need to serve tens of `isLoading` flags.


## Usage

First, put the loading reducer in your root reducer:

```js
import { combineReducers } from 'redux';
import createLoadingReducer from 'redux-loading-manager';

export default combineReducers({
  ...yourReducers,
  loading: createLoadingReducer()
});
```

Then, use `selectIsLoading` selector to get loading state of any request by passing a `request` action type as an argument:

```js
import { selectIsLoading } from 'redux-loading-manager';

import types from './types';

export const selectUserLoadingState = state => selectIsLoading(state, types.FETCH_USER_REQUEST);
```

And use it wherever you want!

```js
const mapStateToProps = state => ({
  isUserLoading: selectUserLoadingState(state)
});
```

## Options

Redux loading manager allows you to pass an `options` argument to `createLoadingReducer` function.

| Option         | Type   | Default value | Description                                                    |
|----------------|--------|---------------|----------------------------------------------------------------|
| requestPostfix | String | _REQUEST      | Postfix of request action types. Sets `isLoading` to true.     |
| successPostfix | String | _SUCCESS      | Postfix of success action types. Sets `isLoading` to false.    |
| errorPostfix   | String | _ERROR        | Postfix of error action types. Also sets `isLoading` to false. |

If you want to use the loading reducer with the other name, you should pass its name as the third argument of `selectIsLoading` function:

```js
// rootReducer.js
import { combineReducers } from 'redux';
import createLoadingReducer from 'redux-loading-manager';

export default combineReducers({
  loadingState: createLoadingReducer()
});
```

```js
// selectors.js
import { selectIsLoading } from 'redux-loading-manager';
import types from './types';

export const selectUserLoadingState = state => selectIsLoading(state, types.FETCH_USER_REQUEST, 'loadingState');
```
