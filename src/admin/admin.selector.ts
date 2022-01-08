import { createSelector } from 'reselect'

const selectAdmin = (state: any) => state.admin

export const makeSelectAuth = () => createSelector(selectAdmin, (state) => state.auth)

export const makeSelectUserList = () => createSelector(selectAdmin, (state) => state.userList)

export default {
  makeSelectUserList,
  makeSelectAuth
}
