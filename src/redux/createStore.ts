import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createWrapper } from 'next-redux-wrapper'

import createRootReducer from './rootReducer'
import ApiClient from './ApiClient'

function createStore(state: object = {}) {
  // create client instance
  const client = new ApiClient()

  // create app reducer
  const reducer = createRootReducer()

  // create redux middlewares
  // TODO: add redux logger
  const middlewares = [thunk.withExtraArgument(client)]

  const enhancers = [applyMiddleware(...middlewares)]

  const store = _createStore(reducer, state, compose(...enhancers))

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  // if (module.hot) {
  //   module.hot.accept('./globalReducer', () => {
  //     store.replaceReducer(createReducer(store.injectedReducers))
  //   })
  // }

  //
  // if (__DEVELOPMENT__ && module.hot) {
  //   module.hot.accept('./modules/reducer', () => {
  //     store.replaceReducer(require('./modules/reducer'));
  //   });
  // }

  // return create store factory
  return store
}

const initStore = () => createStore()

const wrapper = createWrapper(initStore)

export default wrapper
