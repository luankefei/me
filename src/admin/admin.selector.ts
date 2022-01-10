import { createSelector } from 'reselect'

const selectAdmin = (state: any) => state.admin

export const makeSelectUser = () => createSelector(selectAdmin, (state) => state.user)

export const makeSelectAuth = () => createSelector(selectAdmin, (state) => state.auth)

export const makeSelectUserList = () => createSelector(selectAdmin, (state) => state.userList)

export default {
  makeSelectUser,
  makeSelectAuth,
  makeSelectUserList
}
