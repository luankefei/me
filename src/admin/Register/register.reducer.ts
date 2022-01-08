/*
 * register reducer
 */
import { createReducer, createAsyncAction } from 'src/redux/reduxActionTools'

import API from '../../utils/api'
import { IClient } from '../../interface/client.type'

const USER_LIST = 'admin/USER_LIST'
const CREATE_USER = 'admin/CREATE_USER'

const initialState = {
  userList: []
}

const getUserList = (_, client: IClient) => client.get(API.userList)

const createUser = (data, client: IClient) => client.post(API.user, { data })

// hot replace
const USER_LIST_SUCCESS = (state: any, action: any) => ({
  ...state,
  userList: action.payload
})

const actions = {
  getUserList: createAsyncAction(USER_LIST, getUserList),
  createUser: createAsyncAction(CREATE_USER, createUser)
}

const reducers = createReducer().when(USER_LIST).done(USER_LIST_SUCCESS).build(initialState)

export { reducers as default, actions }
