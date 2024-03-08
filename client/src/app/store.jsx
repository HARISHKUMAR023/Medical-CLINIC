import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';



const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    auth: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
