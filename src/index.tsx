import React, { createContext, useEffect, useContext } from "react";
import { createPortal } from "react-dom";

export type PortalType = { name: string; content: React.ReactNode };

function canUseDOM() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}

function removeUniversalPortals() {
  if (canUseDOM()) {
    document.querySelectorAll("[data-universal-portal]").forEach((node) => {
      node.remove();
    });
  }
}

const PortalCollectorContext = createContext<{
  collectPortal: (portal: PortalType) => void;
}>({
  collectPortal: () => {
    // noop
  },
});

type PortalCollectorProps = {
  collectPortal: (portal: PortalType) => void;
  children: React.ReactElement;
};

export const PortalCollector = ({
  collectPortal,
  children,
}: PortalCollectorProps): JSX.Element => {
  return (
    <PortalCollectorContext.Provider value={{ collectPortal }}>
      {children}
    </PortalCollectorContext.Provider>
  );
};

type PortalProps = {
  children: React.ReactNode;
  name: string;
  selector: string;
};

export default function Portal({
  children,
  name,
  selector,
}: PortalProps): React.ReactPortal | null {
  const context = useContext(PortalCollectorContext);
  context?.collectPortal?.({
    name,
    content: React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      return React.cloneElement(child, {
        ...child.props,
        "data-universal-portal": "",
      });
    }),
  });

  const portalNode = React.useRef<Element | null>(null);
  const [_, forceUpdate] = React.useState({});

  useEffect(() => {
    portalNode.current = document.querySelector(selector);
    removeUniversalPortals();

    forceUpdate({});
  }, [forceUpdate, selector]);

  return portalNode.current ? createPortal(children, portalNode.current) : null;
}
