// redux/index.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import { listUserSlice } from './slice/user/listUserSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['listUser'], 
};

const rootReducer = combineReducers({
  listUser: listUserSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Types for hooks
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;