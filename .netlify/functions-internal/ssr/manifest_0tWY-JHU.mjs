import './chunks/astro/server_CFD6V1YY.mjs';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"projects/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects","isIndex":true,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/index.astro","pathname":"/projects","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"typography/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/typography","isIndex":false,"type":"page","pattern":"^\\/typography\\/?$","segments":[[{"content":"typography","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/typography.astro","pathname":"/typography","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.11.1_@types+node@20.12.11_typescript@5.5.2/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/checkout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/checkout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"checkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/checkout.ts","pathname":"/api/checkout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/liqpay-sendpulse","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/liqpay-sendpulse\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"liqpay-sendpulse","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/liqpay-sendpulse.ts","pathname":"/api/liqpay-sendpulse","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/request-partnership","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/request-partnership\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"request-partnership","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/request-partnership.ts","pathname":"/api/request-partnership","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C0EaUyXH.js"}],"styles":[{"type":"external","src":"/_astro/hoisted.CCRaorum.css"},{"type":"external","src":"/_astro/index.-d7MneGQ.css"},{"type":"inline","content":".arrow[data-astro-cid-xxwwxqrn]{--_size:var(--arrowIconSize);height:var(--arrowIconSize);height:var(--_size);width:var(--arrowIconSize);width:var(--_size);--_color:initial;--_bg-color:initial;align-items:center;background-color:var(--_bg-color);border:2px solid transparent;border-radius:var(--rounded-full);color:var(--_color);display:flex;flex-shrink:0;justify-content:center;padding:var(--space-1-fixed)}.arrow[data-astro-cid-xxwwxqrn] svg[data-astro-cid-xxwwxqrn]{height:1.5em;width:1.5em}.arrow[data-astro-cid-xxwwxqrn].primary{--_color:var(--color-secondary);--_bg-color:var(--color-primary)}.arrow[data-astro-cid-xxwwxqrn].secondary{--_color:var(--color-primary);--_bg-color:var(--color-secondary)}.arrow[data-astro-cid-xxwwxqrn].left svg[data-astro-cid-xxwwxqrn]{transform:rotate(-180deg)}.swiper-button[data-astro-cid-5nycpk2d]{cursor:pointer;transition:color var(--transition-default),background-color var(--transition-default),transform var(--transition-default)}.swiper-button[data-astro-cid-5nycpk2d] .arrow{transition:transform var(--transition-default)}.swiper-button[data-astro-cid-5nycpk2d]:hover .arrow{background-color:var(--color-secondary);color:var(--color-primary)}.swiper-button-disabled[data-astro-cid-5nycpk2d]{cursor:auto;opacity:0;pointer-events:none}.swiper-button[data-astro-cid-5nycpk2d][data-direction=left]:hover .arrow{transform:translate(-4px)}.swiper-button[data-astro-cid-5nycpk2d][data-direction=right]:hover .arrow{transform:translate(4px)}.swiper-pagination-wrapper[data-astro-cid-jkc3otgp]{flex:1;position:relative}.swiper-pagination[data-astro-cid-jkc3otgp]{background-color:var(--color-gray-200);border-radius:var(--rounded-full);height:4px;width:100%}.round-corner[data-astro-cid-jkc3otgp]{background-color:var(--color-secondary);border-bottom-left-radius:var(--rounded-full);border-top-left-radius:var(--rounded-full);height:4px;left:-4px;position:absolute;width:8px}.empty-shape[data-astro-cid-dns2enbp]{bottom:var(--bottom);left:var(--left);position:absolute;right:var(--right);top:var(--top)}.marquee>.marquee-inner{align-items:center;display:flex;flex-wrap:wrap;gap:var(--marqueeGap)}.marquee[data-animated=true]{-webkit-mask:linear-gradient(90deg,transparent,#fff 20%,#fff 80%,transparent);mask:linear-gradient(90deg,transparent,#fff 20%,#fff 80%,transparent);overflow:hidden}.marquee[data-animated=true]>.marquee-inner{animation:marquee 35s linear infinite forwards;animation:marquee var(--_animation-duration,35s) var(--_animation-direction,forwards) linear infinite;flex-wrap:nowrap;width:-moz-max-content;width:max-content}.marquee[data-animated=true]:hover>.marquee-inner{animation-play-state:paused}.marquee[data-direction=right]{--_animation-direction:reverse}.marquee[data-direction=left]{--_animation-direction:forwards}.marquee[data-duration=slow]{--_animation-duration:60s}.marquee[data-duration=fast]{--_animation-duration:20s}@keyframes marquee{to{transform:translate(calc(-50% - var(--marqueeGap)/2))}}.auto-grid[data-astro-cid-d3reksu5]{--_max-column-count:calc(100%/var(--maxColumns, infinity) - var(--gap));--_column-width:max(var(--_max-column-count),min(var(--minItemWidth),100%));display:grid;grid-gap:var(--gap);gap:var(--gap)}@supports (width:min(250px,100%)){.auto-grid[data-astro-cid-d3reksu5]{grid-template-columns:repeat(auto-fit,minmax(var(--_column-width),1fr))}}\n"},{"type":"external","src":"/_astro/index.DwycEWe5.css"},{"type":"inline","content":".section[data-astro-cid-5v3l7meg]{--_border-radius:var(--rounded-2xl);background-color:var(--background)}@media (min-width:68.75em){.section[data-astro-cid-5v3l7meg]{--_border-radius:var(--rounded-3xl)}}.round[data-astro-cid-5v3l7meg]{border-radius:var(--_border-radius)}.round-top[data-astro-cid-5v3l7meg]{border-top-left-radius:var(--_border-radius);border-top-right-radius:var(--_border-radius)}.round-bottom[data-astro-cid-5v3l7meg]{border-bottom-left-radius:var(--_border-radius);border-bottom-right-radius:var(--_border-radius)}.row[data-astro-cid-l73y7qbm]{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:1fr auto}.frame{align-items:center;aspect-ratio:var(--left) /var(--right);display:flex;justify-content:center;overflow:hidden}.frame>img,.frame>picture,.frame>picture>img,.frame>video{height:100%;-o-object-fit:cover;object-fit:cover;width:100%}.frame>iframe{height:100%;width:100%}.project-card[data-astro-cid-mspuyifq] a{width:100%}.project-card[data-astro-cid-mspuyifq] .cover-wrapper{background-color:var(--color-accent);transition:filter .65s var(--ease-out)}.project-card[data-astro-cid-mspuyifq] .cover-wrapper img{transition:transform .65s var(--ease-out)}.project-card[data-astro-cid-mspuyifq] .title{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden;transition:color .4s var(--ease-out)}.project-card[data-astro-cid-mspuyifq] .description{display:-webkit-box;max-width:28rem;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}.project-card[data-astro-cid-mspuyifq] svg{--_size:var(--space-6);flex-shrink:0;height:var(--space-6);height:var(--_size);transform:translateY(7px) rotate(-45deg);transition:transform var(--transition-default);width:var(--space-6);width:var(--_size)}.project-card[data-astro-cid-mspuyifq]:hover .cover-wrapper{filter:brightness(103%);transition:filter .4s var(--ease-out)}.project-card[data-astro-cid-mspuyifq]:hover .cover-wrapper img{transform:scale3d(1.05,1.05,1.05);transition:transform .4s var(--ease-out)}.project-card[data-astro-cid-mspuyifq]:hover .title{color:var(--color-primary)}.project-card[data-astro-cid-mspuyifq]:hover svg{transform:translateY(7px) rotate(0)}.button-arrow[data-astro-cid-brl7mbjh]{--_color:initial;color:var(--_color);display:inline-block;font-weight:var(--font-medium);position:relative}.button-arrow[data-astro-cid-brl7mbjh],.button-arrow[data-astro-cid-brl7mbjh] svg[data-astro-cid-brl7mbjh]{transition:transform var(--transition-default)}.button-arrow[data-astro-cid-brl7mbjh] svg[data-astro-cid-brl7mbjh]{margin-left:0;transform:translateY(-2px) rotate(-45deg)}.button-arrow[data-astro-cid-brl7mbjh]:hover svg[data-astro-cid-brl7mbjh]{transform:translateY(-2px) rotate(0)}.button-arrow[data-astro-cid-brl7mbjh].no-arrow svg[data-astro-cid-brl7mbjh]{display:none}.button-arrow[data-astro-cid-brl7mbjh]:after{background-color:currentColor;bottom:0;content:\"\";display:block;height:2px;left:0;position:absolute;transform:scaleX(0);transform-origin:right;transition:transform .3s var(--ease);width:100%}.button-arrow[data-astro-cid-brl7mbjh]:hover:after{transform:scaleX(1);transform-origin:left}.button-arrow[data-astro-cid-brl7mbjh].primary{--_color:var(--color-primary)}.button-arrow[data-astro-cid-brl7mbjh].secondary{--_color:var(--color-secondary)}.time-period[data-astro-cid-d7abjbmi]{background-color:var(--color-accent);border-radius:9999px;padding:calc(var(--space-1) + 1px) var(--space-3);width:-moz-fit-content;width:fit-content}.time-period[data-astro-cid-d7abjbmi] p[data-astro-cid-d7abjbmi]{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden}\n.active-project[data-astro-cid-enunb7jp] .cover-wrapper[data-astro-cid-enunb7jp]{--_border-radius:var(--rounded-2xl);--_img-padding:var(--space-4-fixed);border-radius:var(--rounded-2xl);border-radius:var(--_border-radius);padding:var(--_img-padding)}.active-project[data-astro-cid-enunb7jp] .cover-wrapper[data-astro-cid-enunb7jp] img{-o-object-fit:contain;object-fit:contain}@media (min-width:68.75em){.active-project[data-astro-cid-enunb7jp] .cover-wrapper[data-astro-cid-enunb7jp]{--_border-radius:var(--rounded-3xl);--_img-padding:var(--space-9-fixed)}}.archive-project[data-astro-cid-a7rjyiq4]{border-radius:var(--rounded-3xl);padding:var(--_offset);transition:background-color var(--transition-default)}.archive-project[data-astro-cid-a7rjyiq4]:nth-child(n+4){display:none}.archive-project[data-astro-cid-a7rjyiq4]:not(:first-child):before{border-top:2px solid var(--color-gray-200);content:\"\";display:block;padding-top:var(--space-7-fixed)}.archive-project[data-astro-cid-a7rjyiq4] .info[data-astro-cid-a7rjyiq4]{max-width:70ch;transition:transform .5s var(--ease-out)}@media (min-width:34.37em){.archive-project[data-astro-cid-a7rjyiq4] .info[data-astro-cid-a7rjyiq4]{padding-right:var(--space-6-fixed)}}.archive-project[data-astro-cid-a7rjyiq4] .description[data-astro-cid-a7rjyiq4]{display:-webkit-box;max-width:100%;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.archive-project[data-astro-cid-a7rjyiq4] .img-wrapper[data-astro-cid-a7rjyiq4]{--_border-radius:var(--rounded-xl);--_img-size:6.5rem;align-self:flex-start;border-radius:var(--rounded-xl);border-radius:var(--_border-radius);flex-shrink:0;width:6.5rem;width:var(--_img-size)}@media (min-width:34.37em){.archive-project[data-astro-cid-a7rjyiq4] .img-wrapper[data-astro-cid-a7rjyiq4]{--_img-size:12rem}}@media (min-width:68.75em){.archive-project[data-astro-cid-a7rjyiq4] .img-wrapper[data-astro-cid-a7rjyiq4]{--_border-radius:var(--rounded-2xl)}}.archive-project[data-astro-cid-a7rjyiq4] .arrow-right-container[data-astro-cid-a7rjyiq4]{align-self:flex-end;color:var(--color-primary);display:flex;flex-shrink:0;gap:var(--space-1);margin-left:auto}@media (min-width:34.37em){.archive-project[data-astro-cid-a7rjyiq4] .arrow-right-container[data-astro-cid-a7rjyiq4]{align-self:auto}}.archive-project[data-astro-cid-a7rjyiq4] .arrow-right-text[data-astro-cid-a7rjyiq4]{display:none}@media (min-width:68.75em){.archive-project[data-astro-cid-a7rjyiq4] .arrow-right-text[data-astro-cid-a7rjyiq4]{display:inline}}.archive-project[data-astro-cid-a7rjyiq4] .arrow-right[data-astro-cid-a7rjyiq4]{transform:translateY(-2px) rotate(-45deg)}.archive-project[data-astro-cid-a7rjyiq4]:hover .info[data-astro-cid-a7rjyiq4]{transform:translate(.5rem)}.archive-project[data-astro-cid-a7rjyiq4]:hover .arrow-right[data-astro-cid-a7rjyiq4]{transform:translateY(-2px) rotate(0)}\n"},{"type":"external","src":"/_astro/index.CmkDfNhP.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://ecomisto.org","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Volumes/Media HD/Web Development/ecomisto/src/components/ActiveProjects.astro",{"propagation":"in-tree","containsHead":false}],["/Volumes/Media HD/Web Development/ecomisto/src/components/home/Projects.astro",{"propagation":"in-tree","containsHead":false}],["/Volumes/Media HD/Web Development/ecomisto/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Volumes/Media HD/Web Development/ecomisto/src/components/projects/Projects.astro",{"propagation":"in-tree","containsHead":false}],["/Volumes/Media HD/Web Development/ecomisto/src/pages/projects/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Volumes/Media HD/Web Development/ecomisto/src/components/home/ArchiveProjects.astro",{"propagation":"in-tree","containsHead":false}],["/Volumes/Media HD/Web Development/ecomisto/src/components/home/TeamMembers.astro",{"propagation":"in-tree","containsHead":false}],["/Volumes/Media HD/Web Development/ecomisto/src/components/home/Team.astro",{"propagation":"in-tree","containsHead":false}],["/Volumes/Media HD/Web Development/ecomisto/src/components/projects/ArchiveProjects.astro",{"propagation":"in-tree","containsHead":false}],["/Volumes/Media HD/Web Development/ecomisto/src/pages/projects/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Volumes/Media HD/Web Development/ecomisto/src/pages/typography.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/.pnpm/astro@4.11.1_@types+node@20.12.11_typescript@5.5.2/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/checkout@_@ts":"pages/api/checkout.astro.mjs","\u0000@astro-page:src/pages/api/liqpay-sendpulse@_@ts":"pages/api/liqpay-sendpulse.astro.mjs","\u0000@astro-page:src/pages/api/request-partnership@_@ts":"pages/api/request-partnership.astro.mjs","\u0000@astro-page:src/pages/projects/index@_@astro":"pages/projects.astro.mjs","\u0000@astro-page:src/pages/projects/[...slug]@_@astro":"pages/projects/_---slug_.astro.mjs","\u0000@astro-page:src/pages/typography@_@astro":"pages/typography.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_0tWY-JHU.mjs","/Volumes/Media HD/Web Development/ecomisto/node_modules/.pnpm/@astrojs+react@3.6.0_@types+react-dom@18.2.19_@types+react@18.2.60_react-dom@18.2.0_react@18._uma5kdrvgy3kgdis6xse4lpeqe/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_C1YIWAGb.mjs","/node_modules/.pnpm/astro@4.11.1_@types+node@20.12.11_typescript@5.5.2/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_CdotYYLw.mjs","/src/pages/api/checkout.ts":"chunks/checkout_DOjA0hlZ.mjs","/src/pages/api/liqpay-sendpulse.ts":"chunks/liqpay-sendpulse_HdBSABk-.mjs","/src/pages/api/request-partnership.ts":"chunks/request-partnership_a2_9AKXr.mjs","/src/pages/projects/index.astro":"chunks/index_DTE6F7I9.mjs","/src/pages/projects/[...slug].astro":"chunks/_...slug__DJlZPFkX.mjs","/src/pages/typography.astro":"chunks/typography_DbgqV6Je.mjs","/src/pages/index.astro":"chunks/index_B0hxaWow.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/city-makers.mdx?astroContentCollectionEntry=true":"chunks/city-makers_E1CxNde5.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/maysternya-mista.mdx?astroContentCollectionEntry=true":"chunks/maysternya-mista_Byojdk1I.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/peremoha-lab.mdx?astroContentCollectionEntry=true":"chunks/peremoha-lab_9rQ-S0bw.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/plastic-fantastic.mdx?astroContentCollectionEntry=true":"chunks/plastic-fantastic_DktbFeRD.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/prostir-diy.mdx?astroContentCollectionEntry=true":"chunks/prostir-diy_OOlNVsS_.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/supersorters.mdx?astroContentCollectionEntry=true":"chunks/supersorters_CKHBtPJC.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/urban-vision.mdx?astroContentCollectionEntry=true":"chunks/urban-vision_CflI--gY.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/velokuhnya.mdx?astroContentCollectionEntry=true":"chunks/velokuhnya_C_AelvIA.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/velolink.mdx?astroContentCollectionEntry=true":"chunks/velolink_TTv0FVYD.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/members/andriy.yaml?astroDataCollectionEntry=true":"chunks/andriy_BFrzOMjf.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/members/daniil.yaml?astroDataCollectionEntry=true":"chunks/daniil_EiG7P1-D.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/members/evgen.yaml?astroDataCollectionEntry=true":"chunks/evgen_BCwx_AMS.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/members/maksym.yaml?astroDataCollectionEntry=true":"chunks/maksym_Cc3TVN-L.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/members/natalya.yaml?astroDataCollectionEntry=true":"chunks/natalya_C3D03AFA.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/members/oleksiy.yaml?astroDataCollectionEntry=true":"chunks/oleksiy_Bjh5bqc1.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/members/olya.yaml?astroDataCollectionEntry=true":"chunks/olya_DN7w8h7t.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/members/sergiy-bezborodko.yaml?astroDataCollectionEntry=true":"chunks/sergiy-bezborodko_4G_7GVnN.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/members/sergiy.yaml?astroDataCollectionEntry=true":"chunks/sergiy_D-SSG06i.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/members/sonya.yaml?astroDataCollectionEntry=true":"chunks/sonya_JOkcQhCi.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/city-makers.mdx?astroPropagatedAssets":"chunks/city-makers_BgY35XY3.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/maysternya-mista.mdx?astroPropagatedAssets":"chunks/maysternya-mista_CbEiROtC.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/peremoha-lab.mdx?astroPropagatedAssets":"chunks/peremoha-lab_BLw8A9Uj.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/plastic-fantastic.mdx?astroPropagatedAssets":"chunks/plastic-fantastic_D88OaM-H.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/prostir-diy.mdx?astroPropagatedAssets":"chunks/prostir-diy_gv9iXpAg.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/supersorters.mdx?astroPropagatedAssets":"chunks/supersorters_v5Zjy-S4.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/urban-vision.mdx?astroPropagatedAssets":"chunks/urban-vision_Ch42RroJ.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/velokuhnya.mdx?astroPropagatedAssets":"chunks/velokuhnya_ClHt3Kow.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/velolink.mdx?astroPropagatedAssets":"chunks/velolink_C7xf_Mcw.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/city-makers/multiple_gallery_city-makers_001.jpg":"chunks/multiple_gallery_city-makers_001_CWkj1XtF.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/city-makers/multiple_gallery_city-makers_002.jpg":"chunks/multiple_gallery_city-makers_002_DRKK5U9d.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/city-makers/multiple_gallery_city-makers_003.jpg":"chunks/multiple_gallery_city-makers_003_92cqUxBg.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/city-makers/multiple_gallery_city-makers_004.jpg":"chunks/multiple_gallery_city-makers_004_BWOe9J-j.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/city-makers/multiple_gallery_city-makers_005.jpg":"chunks/multiple_gallery_city-makers_005_BDedn5RY.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/city-makers/multiple_gallery_city-makers_006.jpg":"chunks/multiple_gallery_city-makers_006_CG9LgQ2x.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/city-makers/multiple_gallery_city-makers_007.jpg":"chunks/multiple_gallery_city-makers_007_-8c56RxT.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/city-makers/multiple_gallery_city-makers_008.jpg":"chunks/multiple_gallery_city-makers_008_CCxC4m9t.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/city-makers/multiple_gallery_city-makers_009.jpg":"chunks/multiple_gallery_city-makers_009_D7-6unNf.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/city-makers/multiple_gallery_city-makers_010.jpg":"chunks/multiple_gallery_city-makers_010_1U2sIcFd.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/city-makers/multiple_gallery_city-makers_011.jpg":"chunks/multiple_gallery_city-makers_011_aXAO3RbB.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_001.jpg":"chunks/multiple_gallery_peremoha-lab_001_CqH9f3x1.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_002.jpg":"chunks/multiple_gallery_peremoha-lab_002_kiTu_7uz.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_003.jpg":"chunks/multiple_gallery_peremoha-lab_003_beoGE_W1.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_004.jpg":"chunks/multiple_gallery_peremoha-lab_004_Cv-PMZai.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_005.jpg":"chunks/multiple_gallery_peremoha-lab_005_C7Ekd12j.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_006.jpg":"chunks/multiple_gallery_peremoha-lab_006_BBWdytEi.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_007.jpg":"chunks/multiple_gallery_peremoha-lab_007_Bs8CIyDc.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_008.jpg":"chunks/multiple_gallery_peremoha-lab_008_BYH0ls0B.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_009.jpg":"chunks/multiple_gallery_peremoha-lab_009_BwA7RldL.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_010.jpg":"chunks/multiple_gallery_peremoha-lab_010_C84y4HCe.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_011.jpg":"chunks/multiple_gallery_peremoha-lab_011_BwfYLudr.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_012.jpg":"chunks/multiple_gallery_peremoha-lab_012_CUQ8Prdt.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_013.jpg":"chunks/multiple_gallery_peremoha-lab_013_C8uIEqWN.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_014.jpg":"chunks/multiple_gallery_peremoha-lab_014_Dex0B_hE.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_015.jpg":"chunks/multiple_gallery_peremoha-lab_015_BmH4Ik0q.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/peremoha-lab/multiple_gallery_peremoha-lab_016.jpg":"chunks/multiple_gallery_peremoha-lab_016_B6q2Xg1L.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/multiple_gallery_plastic-equipment_001.jpg":"chunks/multiple_gallery_plastic-equipment_001_ONKYGz0K.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/multiple_gallery_plastic-equipment_002.jpg":"chunks/multiple_gallery_plastic-equipment_002_Bs41oBbw.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/multiple_gallery_plastic-equipment_003.jpg":"chunks/multiple_gallery_plastic-equipment_003_9d1ixRXk.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/multiple_gallery_plastic-equipment_004.jpg":"chunks/multiple_gallery_plastic-equipment_004_Bt1TDHBJ.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/multiple_gallery_plastic-equipment_005.jpg":"chunks/multiple_gallery_plastic-equipment_005_DuGbXvPG.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic-types.jpg":"chunks/plastic-types_BCij46uN.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_001.jpg":"chunks/plastic_fantastic_001_DnhFc_MN.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_002.jpg":"chunks/plastic_fantastic_002_CetdGmsZ.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_003.jpg":"chunks/plastic_fantastic_003_0mCMYyx4.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_004.jpg":"chunks/plastic_fantastic_004_CbSVlpGa.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_005.jpg":"chunks/plastic_fantastic_005_DxJlJZvP.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_006.jpg":"chunks/plastic_fantastic_006_DVJzOBcl.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_007.jpg":"chunks/plastic_fantastic_007_Bio08QgQ.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_008.jpg":"chunks/plastic_fantastic_008_CAcycicM.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_009.jpg":"chunks/plastic_fantastic_009_BaBiml2Z.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_010.jpg":"chunks/plastic_fantastic_010_hksTqHk4.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_011.jpg":"chunks/plastic_fantastic_011_dk-MBYQA.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_product_001.jpg":"chunks/plastic_fantastic_product_001_CC-f3c8J.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_product_002.jpg":"chunks/plastic_fantastic_product_002_BWMOpDXv.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_product_003.jpg":"chunks/plastic_fantastic_product_003_C-27Mlwq.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_product_004.jpg":"chunks/plastic_fantastic_product_004_Bv-Q1PPh.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/plastic-fantastic/plastic_fantastic_product_005.jpg":"chunks/plastic_fantastic_product_005_Dr336Gjv.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_001.jpg":"chunks/multiple_gallery_prostir-diy_001_Bx4zg6Yk.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_002.jpg":"chunks/multiple_gallery_prostir-diy_002_BH86Dm04.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_003.jpg":"chunks/multiple_gallery_prostir-diy_003_BZLhFM4G.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_004.jpg":"chunks/multiple_gallery_prostir-diy_004_BAOgVIyE.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_005.jpg":"chunks/multiple_gallery_prostir-diy_005_DknsKQ97.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_006.jpg":"chunks/multiple_gallery_prostir-diy_006_BCYhmYI9.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_007.jpg":"chunks/multiple_gallery_prostir-diy_007_BBzGObyh.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_008.jpg":"chunks/multiple_gallery_prostir-diy_008_BM0fWkDU.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_009.jpg":"chunks/multiple_gallery_prostir-diy_009_CVFQ7DN_.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_010.jpg":"chunks/multiple_gallery_prostir-diy_010_Bkn1DNws.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_011.jpg":"chunks/multiple_gallery_prostir-diy_011_IzRbjeme.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/multiple_gallery_prostir-diy_012.jpg":"chunks/multiple_gallery_prostir-diy_012_C8v9WNoO.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_001.jpg":"chunks/single_gallery_prostir-diy_001_C9k09Vfr.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_002.jpg":"chunks/single_gallery_prostir-diy_002_DmPIqtr_.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_003.jpg":"chunks/single_gallery_prostir-diy_003_DhlXcEGX.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_004.jpg":"chunks/single_gallery_prostir-diy_004_nmx8oxIE.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_005.jpg":"chunks/single_gallery_prostir-diy_005_CmGi4J1i.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_006.jpg":"chunks/single_gallery_prostir-diy_006_ZDG28jNE.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_007.jpg":"chunks/single_gallery_prostir-diy_007_D4pBVUfH.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_008.jpg":"chunks/single_gallery_prostir-diy_008_7hTCtcfP.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_009.jpg":"chunks/single_gallery_prostir-diy_009_B6k-6KkP.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_010.jpg":"chunks/single_gallery_prostir-diy_010_ClfEH9wE.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_011.jpg":"chunks/single_gallery_prostir-diy_011_C_hjVvFc.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_012.jpg":"chunks/single_gallery_prostir-diy_012_DxNQmvFn.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_013.jpg":"chunks/single_gallery_prostir-diy_013_xx2azsFZ.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_014.jpg":"chunks/single_gallery_prostir-diy_014_YyOARvmS.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_015.jpg":"chunks/single_gallery_prostir-diy_015_CAYC7O_B.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/prostir-diy/single_gallery_prostir-diy_016.jpg":"chunks/single_gallery_prostir-diy_016_i2Zl3uwm.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/gallery_supersorters_001.jpg":"chunks/gallery_supersorters_001_DN8_TjCO.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/gallery_supersorters_002.jpg":"chunks/gallery_supersorters_002_CpY0O00L.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/gallery_supersorters_003.jpg":"chunks/gallery_supersorters_003_DbeYmnPB.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/gallery_supersorters_004.jpg":"chunks/gallery_supersorters_004_8xvzQ5kd.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/gallery_supersorters_005.jpg":"chunks/gallery_supersorters_005_UbHSeQqd.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/gallery_supersorters_006.jpg":"chunks/gallery_supersorters_006_DZWwMN34.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/gallery_supersorters_007.jpg":"chunks/gallery_supersorters_007_DpKrfFQs.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/single_gallery_supersorters_001.jpg":"chunks/single_gallery_supersorters_001_CN6Ix-Cy.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/single_gallery_supersorters_002.jpg":"chunks/single_gallery_supersorters_002_s2a51Yt0.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/single_gallery_supersorters_003.jpg":"chunks/single_gallery_supersorters_003_BJVQR7AA.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/single_gallery_supersorters_004.jpg":"chunks/single_gallery_supersorters_004_HpwWBro3.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/supersorters/single_gallery_supersorters_005.jpg":"chunks/single_gallery_supersorters_005_BpyZA23X.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/tolocar_021.jpg":"chunks/tolocar_021_Bt5z7KaJ.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_001.jpg":"chunks/multiple_gallery_urban-vision_001_BC8MWQtW.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_002.jpg":"chunks/multiple_gallery_urban-vision_002_CjbDB00M.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_003.jpg":"chunks/multiple_gallery_urban-vision_003_CYxtAwr8.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_004.jpg":"chunks/multiple_gallery_urban-vision_004_C25TYygw.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_005.jpg":"chunks/multiple_gallery_urban-vision_005_Bn4N5hOL.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_006.jpg":"chunks/multiple_gallery_urban-vision_006_Diol7ksT.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_007.jpg":"chunks/multiple_gallery_urban-vision_007_E1VrewtA.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_008.jpg":"chunks/multiple_gallery_urban-vision_008_DwIrDO4i.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_009.jpg":"chunks/multiple_gallery_urban-vision_009_XKM75gne.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_010.jpg":"chunks/multiple_gallery_urban-vision_010_DbAnVcom.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_011.jpg":"chunks/multiple_gallery_urban-vision_011_DiSi-7og.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_012.jpg":"chunks/multiple_gallery_urban-vision_012_CyBApcug.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_013.jpg":"chunks/multiple_gallery_urban-vision_013_BSJ8XH73.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_014.jpg":"chunks/multiple_gallery_urban-vision_014_DJQ9ezIr.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_015.jpg":"chunks/multiple_gallery_urban-vision_015_DDg8Mbi-.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_016.jpg":"chunks/multiple_gallery_urban-vision_016_C1MruGI8.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_017.jpg":"chunks/multiple_gallery_urban-vision_017_ldSZbHET.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_018.jpg":"chunks/multiple_gallery_urban-vision_018_K3nlOMCz.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_019.jpg":"chunks/multiple_gallery_urban-vision_019_BNB7_fKY.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_020.jpg":"chunks/multiple_gallery_urban-vision_020_Dg8ZidRZ.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_021.jpg":"chunks/multiple_gallery_urban-vision_021_DZQ0SG1R.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_022.jpg":"chunks/multiple_gallery_urban-vision_022_Dqdwt2np.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_023.jpg":"chunks/multiple_gallery_urban-vision_023_fWPXFIqH.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/urban-vision/multiple_gallery_urban-vision_024.jpg":"chunks/multiple_gallery_urban-vision_024_D3OgGk-c.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_001.jpg":"chunks/velokuhnya_001_BgRDG6_p.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_002.jpg":"chunks/velokuhnya_002_CGTv0gQj.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_003.jpg":"chunks/velokuhnya_003_DN1AkHjy.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_004.jpg":"chunks/velokuhnya_004_DEi8r6Nw.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_005.jpg":"chunks/velokuhnya_005_znvQoHdz.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_006.jpg":"chunks/velokuhnya_006_CcXn_UNL.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_007.jpg":"chunks/velokuhnya_007_BKV57gaq.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_008.jpg":"chunks/velokuhnya_008_DwVqB9re.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_009.jpg":"chunks/velokuhnya_009_BxgMSjkB.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_010.jpg":"chunks/velokuhnya_010_DqTvfpp_.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_011.jpg":"chunks/velokuhnya_011_DrR9d9uG.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_012.jpg":"chunks/velokuhnya_012_Cre9tzo0.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velokuhnya/velokuhnya_013.jpg":"chunks/velokuhnya_013_ByeyFYQ6.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_001.jpg":"chunks/gallery_velolink_001_D0G2zVbj.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_002.jpg":"chunks/gallery_velolink_002_DBDZysfp.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_003.jpg":"chunks/gallery_velolink_003_Cv1w1ksc.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_004.jpg":"chunks/gallery_velolink_004_CY3ToIpy.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_005.jpg":"chunks/gallery_velolink_005_BCIxhfwM.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_006.jpg":"chunks/gallery_velolink_006_JYmVMeZP.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_007.jpg":"chunks/gallery_velolink_007_BDhGMQAn.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_008.jpg":"chunks/gallery_velolink_008_Cbt1ZXVk.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_009.jpg":"chunks/gallery_velolink_009_nwVaOEew.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_010.jpg":"chunks/gallery_velolink_010_Cwn24Qs_.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_011.jpg":"chunks/gallery_velolink_011_BJNn72Qt.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/images/velolink/gallery_velolink_012.jpg":"chunks/gallery_velolink_012_BikzqMKu.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/city-makers.mdx":"chunks/city-makers_DFmMhfGe.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/maysternya-mista.mdx":"chunks/maysternya-mista_x5w9EPva.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/peremoha-lab.mdx":"chunks/peremoha-lab_DO0d1K0N.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/plastic-fantastic.mdx":"chunks/plastic-fantastic_DmNrH5Nv.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/prostir-diy.mdx":"chunks/prostir-diy_CpxEM_f1.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/supersorters.mdx":"chunks/supersorters_wyNDjRqb.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/urban-vision.mdx":"chunks/urban-vision_D0HpmI_x.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/velokuhnya.mdx":"chunks/velokuhnya_CIOCztzv.mjs","/Volumes/Media HD/Web Development/ecomisto/src/content/projects/velolink.mdx":"chunks/velolink_C62gkJ8d.mjs","/astro/hoisted.js?q=2":"_astro/hoisted.zY9orbiU.js","/astro/hoisted.js?q=1":"_astro/hoisted.BDDAME21.js","/astro/hoisted.js?q=0":"_astro/hoisted.C0EaUyXH.js","@astrojs/react/client.js":"_astro/client.DeRgRf24.js","/astro/hoisted.js?q=3":"_astro/hoisted.CMQVZKPy.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/giz.BQKyqmFM.png","/_astro/chernigiv-monumentalism.DwttDTud.png","/_astro/chernigiv-patrol-police.ChpMLxg7.png","/_astro/hero2.BBVvcogS.jpg","/_astro/multiple_gallery_city-makers_001.DCdzKVz9.jpg","/_astro/gallery_supersorters_001.DoCriRfX.jpg","/_astro/multiple_gallery_prostir-diy_001.B06nVs8y.jpg","/_astro/multiple_gallery_urban-vision_001.1AcTWHzM.jpg","/_astro/natalya.ITnnDtAk.png","/_astro/maksym.BcRDB4lu.png","/_astro/oleksiy.oCK4N9QG.png","/_astro/evgen.Dw5pguzD.png","/_astro/andriy.BgaLT4nQ.png","/_astro/sonya.ee0md45t.png","/_astro/olya.opj6kXzT.png","/_astro/daniil.D4-A-VVV.png","/_astro/sergiy.Dg0I7MF3.png","/_astro/cover_peremoha-lab.BPEkyMtd.png","/_astro/sergiy-b.Dg-guVmX.png","/_astro/gallery_velolink_001.BpklnhA9.jpg","/_astro/multiple_gallery_city-makers_005.cBCZYaJZ.jpg","/_astro/multiple_gallery_city-makers_002.BRs4vBxO.jpg","/_astro/multiple_gallery_city-makers_003.5iv4Fwz6.jpg","/_astro/multiple_gallery_city-makers_004.DHvQ08PJ.jpg","/_astro/multiple_gallery_city-makers_006.DtKtP5O3.jpg","/_astro/multiple_gallery_city-makers_007.B_I9mbjM.jpg","/_astro/multiple_gallery_city-makers_008.Cth7ab0a.jpg","/_astro/multiple_gallery_city-makers_009.gkvGDDyk.jpg","/_astro/cover_plastic-fantastic-2.CpGR91g2.png","/_astro/cover_velokuhnya.BTpkGKCv.png","/_astro/multiple_gallery_city-makers_011.wAZSzwPH.jpg","/_astro/multiple_gallery_peremoha-lab_001.DdSPZgg0.jpg","/_astro/multiple_gallery_peremoha-lab_002.CxbzZDM6.jpg","/_astro/multiple_gallery_peremoha-lab_003.CUINpX5C.jpg","/_astro/cover_maysternya-mista.C_Y7zd1u.png","/_astro/multiple_gallery_peremoha-lab_004.Bx5baRhn.jpg","/_astro/achievments-bg-final.CgPE6Tpw.jpg","/_astro/multiple_gallery_city-makers_010.BngxG-BE.jpg","/_astro/multiple_gallery_peremoha-lab_005.lHUQPx8S.jpg","/_astro/multiple_gallery_peremoha-lab_006.Bu0flSBC.jpg","/_astro/multiple_gallery_peremoha-lab_007.DI2Xm19-.jpg","/_astro/multiple_gallery_peremoha-lab_009.CunvqLOB.jpg","/_astro/multiple_gallery_peremoha-lab_012.B5m96bZ2.jpg","/_astro/multiple_gallery_peremoha-lab_013.CjQ8B89-.jpg","/_astro/multiple_gallery_peremoha-lab_014.CFi_-Im_.jpg","/_astro/multiple_gallery_peremoha-lab_015.DidY2d2b.jpg","/_astro/multiple_gallery_peremoha-lab_016.Cq7dsCE-.jpg","/_astro/multiple_gallery_peremoha-lab_010.BUEnac2i.jpg","/_astro/multiple_gallery_peremoha-lab_011.8eutvd27.jpg","/_astro/plastic_fantastic_001.DKUDYnMy.jpg","/_astro/multiple_gallery_plastic-equipment_002.CyHK0UAV.jpg","/_astro/multiple_gallery_plastic-equipment_001.BfqbXHFp.jpg","/_astro/plastic_fantastic_003.H9vGROW_.jpg","/_astro/multiple_gallery_plastic-equipment_004.BIJncN_j.jpg","/_astro/multiple_gallery_plastic-equipment_005.BRj5K_-h.jpg","/_astro/multiple_gallery_plastic-equipment_003.CfhbBzAW.jpg","/_astro/plastic_fantastic_004.BRaLx1b1.jpg","/_astro/plastic-types.Buq8o9GF.jpg","/_astro/plastic_fantastic_005.BWVnuzpj.jpg","/_astro/plastic_fantastic_006.trGPGOHe.jpg","/_astro/plastic_fantastic_007.vZX3TEY8.jpg","/_astro/plastic_fantastic_009.BAYbxh0_.jpg","/_astro/plastic_fantastic_008.DgfFKiKI.jpg","/_astro/plastic_fantastic_010.BWSxDfNw.jpg","/_astro/plastic_fantastic_011.DxSWXq1M.jpg","/_astro/plastic_fantastic_product_002.D2xNczjF.jpg","/_astro/plastic_fantastic_product_003.ZpSpNe48.jpg","/_astro/plastic_fantastic_product_004.DhvNaQeD.jpg","/_astro/plastic_fantastic_product_005.Cc4GBDp1.jpg","/_astro/plastic_fantastic_002.mYhid6s0.jpg","/_astro/multiple_gallery_prostir-diy_004.12lMX4eF.jpg","/_astro/plastic_fantastic_product_001.oy5OHghy.jpg","/_astro/multiple_gallery_prostir-diy_007.Cb2Se-r2.jpg","/_astro/multiple_gallery_prostir-diy_005.EAAk-s3W.jpg","/_astro/multiple_gallery_prostir-diy_009.DTXBKHkl.jpg","/_astro/multiple_gallery_prostir-diy_006.BzqHe_f7.jpg","/_astro/multiple_gallery_prostir-diy_002.Dsklubef.jpg","/_astro/multiple_gallery_prostir-diy_003.Df4VdGVO.jpg","/_astro/multiple_gallery_prostir-diy_010.BKoU3UgX.jpg","/_astro/multiple_gallery_prostir-diy_008.SHxK4VFD.jpg","/_astro/single_gallery_prostir-diy_002.Cw0nW6F4.jpg","/_astro/multiple_gallery_prostir-diy_012.Bk1Njkh0.jpg","/_astro/multiple_gallery_prostir-diy_011.CpJZxIlS.jpg","/_astro/single_gallery_prostir-diy_007.cW5S8URH.jpg","/_astro/single_gallery_prostir-diy_009.DD9VZHrc.jpg","/_astro/single_gallery_prostir-diy_001.CJApugEE.jpg","/_astro/single_gallery_prostir-diy_010.BegFfsJA.jpg","/_astro/single_gallery_prostir-diy_011.si9RzfyP.jpg","/_astro/single_gallery_prostir-diy_005.KuKW3yKo.jpg","/_astro/single_gallery_prostir-diy_006.DB8kfyDi.jpg","/_astro/single_gallery_prostir-diy_012.CNuUMfVt.jpg","/_astro/single_gallery_prostir-diy_003.BibMmN10.jpg","/_astro/single_gallery_prostir-diy_004.Dt_ECK9J.jpg","/_astro/single_gallery_prostir-diy_014.NrXnm5Rg.jpg","/_astro/single_gallery_prostir-diy_015.CwdMkjai.jpg","/_astro/single_gallery_prostir-diy_008.Bg8lFKJ6.jpg","/_astro/single_gallery_prostir-diy_016.DIDl1ngO.jpg","/_astro/gallery_supersorters_002.C0_iI_5r.jpg","/_astro/gallery_supersorters_003.BjInibAV.jpg","/_astro/gallery_supersorters_004.BJ76cVSM.jpg","/_astro/single_gallery_prostir-diy_013.vd9E_Is_.jpg","/_astro/gallery_supersorters_006.WFzaluoq.jpg","/_astro/tolocar_021.t6ikNM5Z.jpg","/_astro/gallery_supersorters_005.vibT24jO.jpg","/_astro/gallery_supersorters_007.nc-GK53l.jpg","/_astro/multiple_gallery_urban-vision_002.Ap2hxckF.jpg","/_astro/multiple_gallery_urban-vision_005.3iRTurEQ.jpg","/_astro/multiple_gallery_urban-vision_006.ryWkwUO2.jpg","/_astro/multiple_gallery_urban-vision_007.DjTaY1xU.jpg","/_astro/multiple_gallery_urban-vision_003.Cc0mtj6H.jpg","/_astro/multiple_gallery_urban-vision_008.CPcyn44_.jpg","/_astro/multiple_gallery_urban-vision_012.CIsICApo.jpg","/_astro/multiple_gallery_urban-vision_004.BU7mSleQ.jpg","/_astro/multiple_gallery_urban-vision_009.BIiwJCgO.jpg","/_astro/multiple_gallery_urban-vision_010.W-zS732H.jpg","/_astro/multiple_gallery_urban-vision_011.BxLJ-YSK.jpg","/_astro/multiple_gallery_urban-vision_013.Dp_CSaRS.jpg","/_astro/multiple_gallery_urban-vision_014.DuCoo3sZ.jpg","/_astro/multiple_gallery_urban-vision_017.CG1iv-MM.jpg","/_astro/multiple_gallery_urban-vision_015.ByxSNEIW.jpg","/_astro/multiple_gallery_urban-vision_019.CdxOwP4n.jpg","/_astro/multiple_gallery_urban-vision_016.D_DOBjp-.jpg","/_astro/multiple_gallery_urban-vision_018.DoCGDUeQ.jpg","/_astro/single_gallery_supersorters_002.DAin3SGa.jpg","/_astro/single_gallery_supersorters_003.DnYuhe6j.jpg","/_astro/single_gallery_supersorters_001.BbsXwCbh.jpg","/_astro/multiple_gallery_urban-vision_020.BQiku58L.jpg","/_astro/multiple_gallery_urban-vision_024.Cy5oYEVY.jpg","/_astro/multiple_gallery_urban-vision_021.CL_Y3v1j.jpg","/_astro/multiple_gallery_urban-vision_022.CsxweW2D.jpg","/_astro/multiple_gallery_urban-vision_023.B4-YKLN5.jpg","/_astro/velokuhnya_005.DbjV7_M3.jpg","/_astro/velokuhnya_006.BiBhVagP.jpg","/_astro/velokuhnya_002.5bYoCcTk.jpg","/_astro/velokuhnya_007.Dt_bOfhj.jpg","/_astro/velokuhnya_008.Dj9szUBe.jpg","/_astro/velokuhnya_011.BYW59uIn.jpg","/_astro/velokuhnya_013.BePY_m8Y.jpg","/_astro/velokuhnya_012.Gck7NEZS.jpg","/_astro/gallery_velolink_002.Dcl9oKcX.jpg","/_astro/gallery_velolink_003.D0TqKG-r.jpg","/_astro/velokuhnya_009.BadrBVTa.jpg","/_astro/gallery_velolink_004.BRI5mF9U.jpg","/_astro/gallery_velolink_005.DOoB0hAR.jpg","/_astro/gallery_velolink_009.DodvUT4P.jpg","/_astro/gallery_velolink_006.3CKBBDFG.jpg","/_astro/gallery_velolink_008.Dgyvg3-3.jpg","/_astro/single_gallery_supersorters_004.D6n1shG6.jpg","/_astro/gallery_velolink_010.Bo5Ac0Hg.jpg","/_astro/gallery_velolink_007.DTgFt_ir.jpg","/_astro/gallery_velolink_012.Dy8YOE-q.jpg","/_astro/gallery_velolink_011.CRG3QG5q.jpg","/_astro/velokuhnya_003.NiQtnGFS.jpg","/_astro/single_gallery_supersorters_005.DoJkzwyQ.jpg","/_astro/velokuhnya_001.Ap_0g7H9.jpg","/_astro/velokuhnya_010.rdDdKwo4.jpg","/_astro/bikes-for-ukraine.De7IBfbR.png","/_astro/velokuhnya_004.C-NECUET.jpg","/_astro/_slug_.Dg4hlRNV.css","/_astro/index.DwycEWe5.css","/_astro/index.-d7MneGQ.css","/_astro/index.CmkDfNhP.css","/ecomisto-showreel.mp4","/favicon.svg","/sprite.svg","/_astro/client.DeRgRf24.js","/_astro/hoisted.BDDAME21.js","/_astro/hoisted.C0EaUyXH.js","/_astro/hoisted.CCRaorum.css","/_astro/hoisted.CMQVZKPy.js","/_astro/hoisted.zY9orbiU.js","/fonts/Ermilov-Bold.woff","/fonts/Mariupol-Bold.woff","/fonts/Mariupol-Medium.woff","/fonts/Mariupol-Regular.woff","/fonts/MariupolSymbols.woff","/projects/index.html","/typography/index.html"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { manifest };
