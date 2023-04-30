import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['phonebook'],
}

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

const rootReducer = combineReducers({
phonebook: phonebookSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    phonebook: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
}, composeWithDevTools())

export const persistor = persistStore(store)