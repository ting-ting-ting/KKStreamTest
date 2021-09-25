import { configureStore } from '@reduxjs/toolkit';
import reducers from './index';

const createStore = preloadedState => configureStore({
  reducer: {
    ...reducers,
  },
  preloadedState,
})

export default createStore;
