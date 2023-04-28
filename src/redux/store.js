import { configureStore, createSlice } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

const phonebookSlice = createSlice({
  name: 'phonebook',
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

export const store = configureStore({
  reducer: {
    phonebook: phonebookReducer,
  },
}, composeWithDevTools())