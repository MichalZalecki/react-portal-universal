import * as React from "react";
import { createUniversalPortal, flushUniversalPortals } from "../src";
import { appendUniversalPortals } from "../src/server";

describe("server-side", () => {
  beforeEach(() => {
    flushUniversalPortals();
  });

  describe("appendUniversalPortals", () => {
    it("adds static mackup from portals to rendered HTML", () => {
      const html = `
        <html>
          <head>
            <meta charset="utf-8" />
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>
      `;
      createUniversalPortal(<title>Hello, World!</title>, "head");
      createUniversalPortal(<h1>Hello, World!</h1>, "body");
      const withStaticMarkup = appendUniversalPortals(html);

      expect(withStaticMarkup.includes("<title>Hello, World!</title>"));
      expect(withStaticMarkup.includes("<h1>Hello, World!</h1>"));
      expect(withStaticMarkup).toMatchSnapshot();
    });
  });
});
