/*
 * MeReducer
 */
import { createReducer, createAsyncAction } from './tools'
// import { createReducer, createAsyncAction } from 'redux-action-tools'

import API from '../../utils/api'
import { IClient } from '../../interface/client.type'

const USER_LIST = 'admin/USER_LIST'

const initialState = {
  userList: []
}

const getUserList = (_, client: IClient) => client.get(API.userList)

// hot replace
const USER_LIST_SUCCESS = (state: any, action: any) => ({
  ...state,
  userList: action.payload
})

const actions = {
  getUserList: createAsyncAction(USER_LIST, getUserList)
}

const reducers = createReducer().when(USER_LIST).done(USER_LIST_SUCCESS).build(initialState)

export { reducers as default, actions }
