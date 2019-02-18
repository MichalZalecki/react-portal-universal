import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { load }  from "cheerio";
import { PortalManager, ChildrenSelectorTuple } from "./PortalManager";

export class ServerPortal {
  portals: ChildrenSelectorTuple[];

  constructor() {
    this.portals = [];
    this.appendUniversalPortals = this.appendUniversalPortals.bind(this);
  }

  collectPortals(children: React.ReactNode) {
    return <PortalManager portals={this.portals}>{children}</PortalManager>;
  }

  appendUniversalPortals(html: string) {
    if (!this.portals.length) {
      return html;
    }

    const $ = load(html);
    this.portals.forEach(([children, selector]) => {
      const markup = ReactDOMServer.renderToStaticMarkup(children);
      $(markup).attr("data-react-universal-portal", "").appendTo((selector as any))
    });

    // it's important to flush one and only one time per render
    this.portals.length = 0;

    return $.html({ decodeEntities: false });
  }
}
