import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user',
  initialState: { name: 'kim', age: 20 },
  reducers: {
    chageName(state) {
      state.name = 'park'
    },
    chageAge(state, action) {
      state.age += action.payload
    },

  }
})
export let { chageName, chageAge } = user.actions

export default user;