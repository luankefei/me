import { createReducer, createAsyncAction } from 'src/redux/reduxActionTools'

import API from '../utils/api'
import { IClient } from '../interface/client.type'

const AUTH = 'admin/AUTH'
const USER = 'admin/USER'
const USER_LIST = 'admin/USER_LIST'
const CREATE_USER = 'admin/CREATE_USER'

const initialState = {
  auth: '',
  user: null,
  userList: []
}

const login = (data, client: IClient) => client.post(API.login, { data })

// TODO: api client restful api support
const getUser = (userNameHash: string, client: IClient) => {
  console.log('getUser', userNameHash)
  return client.get(`${API.user}/${userNameHash}`)
}

const getUserList = (_, client: IClient) => client.get(API.userList)

const createUser = (data, client: IClient) => client.post(API.user, { data })

// hot replace
const AUTH_SUCCESS = (state: any, action: any) => ({
  ...state,
  auth: action.payload.data
})

// hot replace
const USER_LIST_SUCCESS = (state: any, action: any) => ({
  ...state,
  userList: action.payload.data
})

const USER_SUCCESS = (state: any, action: any) => ({
  ...state,
  user: action.payload.data
})

const actions = {
  login: createAsyncAction(AUTH, login),
  getUser: createAsyncAction(USER, getUser),
  getUserList: createAsyncAction(USER_LIST, getUserList),
  createUser: createAsyncAction(CREATE_USER, createUser)
}

const reducers = createReducer()
  .when(USER)
  .done(USER_SUCCESS)
  .when(USER_LIST)
  .done(USER_LIST_SUCCESS)
  .when(AUTH)
  .done(AUTH_SUCCESS)
  .build(initialState)

export { reducers as default, actions }
