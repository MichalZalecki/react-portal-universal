import * as ReactDOMServer from "react-dom/server";
import { load }  from "cheerio";
import { flushUniversalPortals } from "./index";
export function appendUniversalPortals(html: string, options: object = { xmlMode: false, normalizeWhiteSpace: false, decodeEntities: true, withDomLvl1: true }) {
  const portals = flushUniversalPortals();
  if (!portals.length) {
    return html;
  }
  const $ = load(html, options);
  portals.forEach(([children, selector]) => {
    const markup = ReactDOMServer.renderToStaticMarkup(children);
    $(markup).attr("data-react-universal-portal", "").appendTo((selector as any))
  });
  return $.html();
}
