// snippet store disponible pour création automatique
import { configureStore } from '@reduxjs/toolkit';

import mainReducer from './reducer/main';
import userReducer from './reducer/user';
import logReducer from './reducer/log';

const store = configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer,
    log: logReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
