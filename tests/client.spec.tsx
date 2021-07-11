/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Portal from "./../src/index";

const dom = new JSDOM();
global.document = dom.window.document;

describe("client-side", () => {
  jest.useFakeTimers();
  describe("createUniversalPortal", () => {
    it("does not render anything on the server", () => {
      render(
        <Portal name="head" nodeSelector="body">
          <title>Hello world!</title>
        </Portal>
      );
      expect(screen.getByText("Hello world!")).not.toBe(null);
    });
  });
});
