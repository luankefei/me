import { createSelector } from 'reselect'

const selectMe = (state: any) => state.admin

export const makeSelectUserList = () => createSelector(selectMe, (state) => state.userList)

export default {
  makeSelectUserList
}
