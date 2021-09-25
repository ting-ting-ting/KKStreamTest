import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './client/components/App';

const fs = require( 'fs' );
const path = require( 'path' );
const app = express();

app.use(express.static('public'));
app.use('/', (req, res) => {
  let indexHTML = fs.readFileSync( path.resolve( __dirname, './index.html' ), {
    encoding: 'utf8',
  } );

  let appHTML = renderToString(<App />);

  console.log('indexHTML', indexHTML)

  indexHTML = indexHTML.replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`);

  res.contentType('text/html');
  res.status( 200 );

  return res.send( indexHTML );
});

app.listen(8300, () => {
  console.log('listening on port 8300');
});