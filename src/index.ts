import * as ReactDOM from "react-dom";

export type ChildrenSelectorTuple = [any, string];

const portals: ChildrenSelectorTuple[] = [];

function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export function createUniversalPortal(children: any, selector: string) {
  if (!canUseDOM()) {
    portals.push([children, selector]); // yes, mutation (҂◡_◡)
    return null;                        // do not render anything on the server
  }
  // TODO: Do not cast to any when typings are updated for createPortal
  return (ReactDOM as any).createPortal(children, document.querySelector(selector));
}

export function flushUniversalPortals(): ChildrenSelectorTuple[] {
  const copy = portals.slice();
  portals.length = 0;                   // it's important to flush one and only one time per render
  return copy;
}
