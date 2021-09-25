import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import App from './client/components/App';
import createStore from './reducers/store';

const fs = require( 'fs' );
const path = require( 'path' );
const app = express();

app.use(express.static('public'));
app.use('/', (req, res) => {
  let indexHTML = fs.readFileSync( path.resolve( __dirname, './index.html' ), {
    encoding: 'utf8',
  } );

  const preloadedState = {
    users: {
      list: [1, 2, 3],
      data: {
        1: {
          id: 1,
          name: 'Ting',
          email: 'ting@gmail.com',
        },
        2: {
          id: 2,
          name: 'Henry',
          email: 'henry@gmail.com',
        },
        3: {
          id: 3,
          name: 'Kevin',
          email: 'kevin@gmail.com',
        },
      },
    },
  };

  const store = createStore(preloadedState);

  const appHTML = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const finalState = store.getState()

  indexHTML = indexHTML.replace('<div id="root"></div>', `
    <div id="root">${appHTML}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(
        /</g,
        '\\u003c'
      )}
    </script>
  `);

  res.contentType('text/html');
  res.status(200);

  return res.send( indexHTML );
});

app.listen(8300, () => {
  console.log('listening on port 8300');
});