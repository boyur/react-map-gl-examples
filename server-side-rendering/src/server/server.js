/* eslint-disable no-console */

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../app';
import template from './template';

const server = express();

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
  const appString = renderToString(<App />);

  res.send(template({
    body: appString,
    title: 'Server-side rendering example'
  }));
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
