import * as React from "react";
import { createUniversalPortal, flushUniversalPortals } from "../src";
import { appendUniversalPortals } from "../src/server";
import { load } from "cheerio";

describe("server-side", () => {
  beforeEach(() => {
    flushUniversalPortals();
  });

  describe("appendUniversalPortals", () => {
    it("adds static markup from portals to rendered HTML", () => {
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
      const $ = load(withStaticMarkup)
      expect($('head title').data()).toEqual({ reactUniversalPortal: '' })
      expect($('body h1').data()).toEqual({ reactUniversalPortal: '' })
      
    });
    
    it("adds static markup without extra html body div", () => {
      const html = `
        <div>
          <div id="root-header"></div>
          <div id="root-footer"></div>
        </div>
      `;
      createUniversalPortal(<title>Hello, World!</title>, "#root-header");
      createUniversalPortal(<h1>Hello, World!</h1>, "#root-footer");
      const withStaticMarkup = appendUniversalPortals(html, { xmlMode: true });

      expect(withStaticMarkup.includes("<title>Hello, World!</title>"));
      expect(withStaticMarkup.includes("<html>")).toEqual(false);
    });
  });
});
