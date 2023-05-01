import { combineReducers, configureStore} from "@reduxjs/toolkit";
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
import { phonebookReducer } from "./phoneBook";
import { filterReducer } from "./filter";

const persistConfig = {
  key: 'contacts',
  version: 1,
  storage,
  blacklist: ['filter'],
}

const rootReducer = combineReducers({
  phonebook: phonebookReducer,
  filter: filterReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
}, composeWithDevTools())

export const persistor = persistStore(store)