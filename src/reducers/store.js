import { configureStore } from '@reduxjs/toolkit';
import reducers from './index';

const createStote = preloadedState => configureStore({
  reducer: {
    ...reducers,
  },
  preloadedState,
})

export default createStote;
