import { User, UserLegacy } from '@/utils/interfaces/users'

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface UserSlice {
  user: User | null
  userLegacy: UserLegacy | null
}

const initialState: UserSlice = { user: null, userLegacy: null }

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setUserLegacy: (state, action: PayloadAction<UserLegacy>) => {
      state.userLegacy = action.payload
    },
  },
})

export const { setUser, setUserLegacy } = userSlice.actions

export default userSlice.reducer
