import * as React from 'react';

export type ChildrenSelectorTuple = [any, string];

const PortalContext = React.createContext<ChildrenSelectorTuple[]>([]);

export const PortalConsumer = PortalContext.Consumer;

export const PortalManager: React.SFC<{ portals: ChildrenSelectorTuple[] }> = ({ children, portals }) => (
  <PortalContext.Provider value={portals}>
    {children}
  </PortalContext.Provider>
);
