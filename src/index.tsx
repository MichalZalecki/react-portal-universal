import * as React from 'react';
import * as ReactDOM from "react-dom";
import { PortalConsumer, ChildrenSelectorTuple } from "./PortalManager";

function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

function createUniversalPortal(children: React.ReactNode, selector: string, portals: ChildrenSelectorTuple[]) {
  if (!canUseDOM()) {
    portals.push([children, selector]); // yes, mutation (҂◡_◡)
    return null;                        // do not render anything on the server
  }
  // TODO: Do not cast to any when typings are updated for createPortal
  return (ReactDOM as any).createPortal(children, document.querySelector(selector));
}

export function prepareClientPortals() {
  if (canUseDOM()) {
    Array.prototype.slice.call(document.querySelectorAll("[data-react-universal-portal]")).forEach(function (node: Element) {
      node.remove();
    });
  }
}

export const UniversalPortal: React.SFC<{ selector: string }> = ({ children, selector }) => (
  <PortalConsumer>
    {(portals: ChildrenSelectorTuple[]) => createUniversalPortal(children, selector, portals)}
  </PortalConsumer>
);
