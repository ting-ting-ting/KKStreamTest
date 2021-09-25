import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import App from './client/components/App';
import createStore from './reducers/store';
import { getUsers } from './api/users';

const fs = require( 'fs' );
const path = require( 'path' );
const app = express();

app.use(express.static('public'));
app.use('/', (req, res) => {
  let indexHTML = fs.readFileSync( path.resolve( __dirname, './index.html' ), {
    encoding: 'utf8',
  } );

  getUsers()
    .then(apirRes => {
      const users = apirRes.data;
      const list = users.map(user => user.id);
      const data = users.reduce((prev, curr) => ({
        ...prev,
        [curr.id]: curr,
      }), {});

      const preloadedState = {
        users: {
          list,
          data,
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

      res.send( indexHTML );
    });
});

app.listen(8300, () => {
  console.log('listening on port 8300');
});