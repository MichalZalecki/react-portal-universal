import * as http from 'http';
import * as express from 'express-serve-static-core';

import React = require('react');
import ReactDOMServer = require('react-dom/server');
import serveStatic = require('serve-static');

import { ServerPortal } from '../server';
import App from './App';

const port = 3000
const staticServer = serveStatic('dist', {});

function render(req: http.IncomingMessage, res: http.ServerResponse) {

  // Create a new instance of the ServerPortal handler
  const universalPortals = new ServerPortal();

  // Must wrap the application like so to correctly gather up all the portals
  // from the React tree
  const rootElement = universalPortals.collectPortals(<App />);

  // Render like normal
  const renderedReact = ReactDOMServer.renderToString(rootElement);

  let html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div id="root">${renderedReact}</div>
    <script src="client.js"></script>
  </body>
</html>`;

  // Now we can append the portals to the rendered html
  html = universalPortals.appendUniversalPortals(html);

 res.end(html);
}

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log(req.url);
  // Serve static files, or fallback to rendering our page
  staticServer(req as express.Request, res as express.Response, () => render(req, res));
})

server.listen(port, (err: typeof Error) => {
  if (err) {
    throw err;
  }

  console.log(`server is listening on ${port}`)
})


