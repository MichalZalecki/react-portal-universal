/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Portal from "./../src/index";

describe("client-side", () => {
  jest.useFakeTimers();
  it("should render Portal", () => {
    render(
      <Portal name="head" selector="head">
        <title>Hello world!</title>
      </Portal>
    );

    expect(screen.queryByText("Hello world!")).not.toBe(document.head);
  });
});
