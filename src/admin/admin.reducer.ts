import { createReducer, createAsyncAction } from 'src/redux/reduxActionTools'

import API from '../utils/api'
import { IClient } from '../interface/client.type'

const AUTH = 'admin/AUTH'
const USER_LIST = 'admin/USER_LIST'
const CREATE_USER = 'admin/CREATE_USER'

const initialState = {
  auth: '',
  userList: []
}

const login = (data, client: IClient) => client.post(API.login, { data })

const getUserList = (_, client: IClient) => client.get(API.userList)

const createUser = (data, client: IClient) => client.post(API.user, { data })

// hot replace
const AUTH_SUCCESS = (state: any, action: any) => ({
  ...state,
  auth: action.payload
})

// hot replace
const USER_LIST_SUCCESS = (state: any, action: any) => ({
  ...state,
  userList: action.payload
})

const actions = {
  login: createAsyncAction(AUTH, login),
  getUserList: createAsyncAction(USER_LIST, getUserList),
  createUser: createAsyncAction(CREATE_USER, createUser)
}

const reducers = createReducer()
  .when(USER_LIST)
  .done(USER_LIST_SUCCESS)
  .when(AUTH)
  .done(AUTH_SUCCESS)
  .build(initialState)

export { reducers as default, actions }
