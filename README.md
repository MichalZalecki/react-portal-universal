# React Portal Universal

React Portals Universal is a library providing a wrapper for React `createPortal`. The goal of the
library is to render portals also on the server. React's DOM `createPortal` requires a DOM node
which isn't suitable for the NodeJS environment.

## Disclaimer

Treat this library as an idea only until [issues/#5](https://github.com/MichalZalecki/react-portal-universal/issues/5) is fixed.

## Why?

Thanks to React Portal Universal you can now render portals on the server. But why would I like to do that in the first place? That's a great question!

- Render elements into `<head>`. You can now manage your title, meta description or Open Graph meta data (Facebook doesn't run JavaScript) in the same way as you'd do that in [react-helmet](https://github.com/nfl/react-helmet) only you don't need a specialized library. Client-side of React Portal Universal is just under 1KB!
- Aiming to make your page working also without JavaScript enabled.
- If your JavaScript-powered components (e.g. modals) contain crucial information you would like to be easily indexed by different search engines.

## Install

```commandline
  npm install react-portal-universal
```

## Usage

Render article's title and meta description into the `<head>`

```jsx
// CLIENT

import Portal from "react-portal-universal";

const Head = ({ children }) => {
  // pass selector for a document.querySelector
  // instead of a DOM node like in createPortal
  return (
    <Portal name="head" selector="head">
      {children}
    </Portal>
  );
};

class App extends React.Component {
  render() {
    return (
      <article>
        <Head>
          <title>Hello, World!</title>
          <meta name="description" content="Lorem ipsum..." />
        </Head>
        <h1>Hello, World!</h1>
        <p>Lorem ipsum sit doloret um.</p>
      </article>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

```js
// SERVER

const { PortalCollector } = require("react-portal-universal/lib/server");

const extractor = new PortalCollector()
const body = ReactDOMServer.renderToString(extractor.collectPortals(<App />)));
const headTag = extractor.getPortals().head
const template = fs.readFileSync(path.resolve("build/index.html"), "utf8");
const html = template.replace("<!-- head -->", headTags).replace("<div id=\"root\"></div>", `<div id="root">${body}</div>`);

res.status(200).send(markup);
```

## Configure

It is important to make sure that React application code is using the same instance of the library
as code responsible for handling rendering on the server. In other words, there must be only one
instance of the portals variable in the process.
The cleanest solution is to mark react-portal-universal as an external dependency in your bundler of choice. Here is how to do this in webpack.

```js
const config = {
  externals: ["react-portal-universal"],
};
```
