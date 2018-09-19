import * as ReactDOMServer from "react-dom/server";
import { load }  from "cheerio";
import { flushUniversalPortals } from "./index";

export function appendUniversalPortals(html: string) {
  const portals = flushUniversalPortals();
  if (!portals.length) {
    return html;
  }
  const $ = load(html);
  portals.forEach(([children, selector]) => {
    const markup = ReactDOMServer.renderToStaticMarkup(children);
    $(markup).attr("data-react-universal-portal", "").appendTo((selector as any))
  });
  return $.html({ decodeEntities: false });
}
