import * as React from "react";
import { createUniversalPortal, flushUniversalPortals } from "../src";

describe("client-side", () => {
  beforeEach(() => {
    flushUniversalPortals();
  });

  describe("createUniversalPortal", () => {
    it("does not render anything on the server", () => {
      expect(createUniversalPortal(<h1>Hello, World!</h1>, "#root")).toBe(null);
    });
  });

  describe("flushUniversalPortals", () => {
    it("returns pairs of children and selector removing old tuples", () => {
      const title = <title>Hello, World!</title>;
      const heading = <h1>Hello, World!</h1>;
      createUniversalPortal(title, "head");
      createUniversalPortal(heading, "body");

      expect(flushUniversalPortals()).toEqual([[title, "head"], [heading, "body"]]);
      expect(flushUniversalPortals()).toEqual([]);
    });
  });
});
