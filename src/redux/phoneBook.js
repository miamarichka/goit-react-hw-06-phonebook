import { createSlice } from "@reduxjs/toolkit"

const phonebookSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    ADD_CONTACT (state, action){state.push(action.payload)},
    DELETE_CONTACT(state, action) {
      return state.filter(contact => {
        return contact.name !== action.payload
    })},
  },
})

export const { ADD_CONTACT, DELETE_CONTACT } = phonebookSlice.actions

export const phonebookReducer = phonebookSlice.reducer;