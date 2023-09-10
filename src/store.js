import { configureStore } from '@reduxjs/toolkit'
import user from './apis/store/userSlice'

export default configureStore({
  reducer: {
    user: user.reducer
  }
}) 