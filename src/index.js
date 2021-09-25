import express from 'express';
import React from 'react';
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server';
import App from './client/components/App';
import store from './reducers/store'

const fs = require( 'fs' );
const path = require( 'path' );
const app = express();

app.use(express.static('public'));
app.use('/', (req, res) => {
  let indexHTML = fs.readFileSync( path.resolve( __dirname, './index.html' ), {
    encoding: 'utf8',
  } );

  const appHTML = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  indexHTML = indexHTML.replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`);

  res.contentType('text/html');
  res.status(200);

  return res.send( indexHTML );
});

app.listen(8300, () => {
  console.log('listening on port 8300');
});