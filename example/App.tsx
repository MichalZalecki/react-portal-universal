import * as React from 'react';
import { UniversalPortal } from '../';

export default () => (
  <React.Fragment>
    <div id="modal" />
    <main>
      Try disabling JS and refresh this page.
      You should still see the portal above 👆

      <UniversalPortal selector="#modal">
        <div style={{ border: '1px solid red', padding: '1em 2em' }}>
          <h1>Hello world</h1>
          <p>I'm a server rendered React Portal</p>
        </div>
      </UniversalPortal>

      {/* Can even render to the <head> tag! */}
      <UniversalPortal selector="head">
        <title>Hello, World!</title>
        <meta name="description" content="Lorem ipsum..." />
      </UniversalPortal>
    </main>
  </React.Fragment>
)
