import React from "react";
import { renderToString } from "react-dom/server";
import { PortalCollector, PortalType } from "./index";

type Portals = Record<PortalType["name"], React.ReactNode>;
export class PortalExtractor {
  private _portals: Portals;

  constructor() {
    this._portals = {};
  }

  collectPortals = (element: JSX.Element): JSX.Element => {
    return (
      <PortalCollector
        collectPortal={(portal: PortalType) => {
          this._portals = {
            ...this._portals,
            ...{ [portal.name]: portal.content },
          };
        }}
      >
        {element}
      </PortalCollector>
    );
  };

  getPortals(): Record<string, string> {
    return Object.entries(this._portals).reduce((acc, cur) => {
      return { ...acc, [cur[0]]: renderToString(<>{cur[1]}</>) };
    }, {});
  }

  getElements(): Portals {
    return this._portals;
  }
}
