import * as ReactDOMServer from "react-dom/server";
import { load }  from "cheerio";
import { flushUniversalPortals } from "./index";

export function appendUniversalPortals(html: string) {
  const $ = load(html);
  flushUniversalPortals().forEach(([children, selector]) => {
    const markup = ReactDOMServer.renderToStaticMarkup(children);
    $(markup).attr("data-react-universal-portal", "").appendTo((selector as any))
  });
  return $.html();
}
