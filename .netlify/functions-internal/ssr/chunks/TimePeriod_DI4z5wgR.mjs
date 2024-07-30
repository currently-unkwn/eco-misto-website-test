import { f as createAstro, a as createComponent, h as defineStyleVars, b as renderTemplate, m as maybeRenderHead, g as addAttribute, s as spreadAttributes, e as renderSlot, i as renderUniqueStylesheet, j as renderScriptElement, k as createHeadAndContent, d as renderComponent, u as unescapeHTML } from './astro/server_CFD6V1YY.mjs';
/* empty css                         */
import { AsyncResource } from 'async_hooks';
import { A as AstroError, U as UnknownContentCollectionError, p as prependForwardSlash } from './astro/assets-service_C2aiabpb.mjs';
import { h as getBreakpoints } from './helpers_C1eUHQX2.mjs';
import { a as $$Picture } from './_astro_assets_CBy1yhCu.mjs';
import { f as $$Text } from './BaseLayout_D1lEmvii.mjs';

const $$Astro$4 = createAstro("https://ecomisto.org");
const $$Section = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Section;
  const {
    class: classList,
    isRound = false,
    isRoundTop = false,
    isRoundBottom = false,
    color,
    ...rest
  } = Astro2.props;
  const background = `var(--color-${color})`;
  const $$definedVars = defineStyleVars([{ background }]);
  return renderTemplate`${maybeRenderHead()}<section${addAttribute([
    "section",
    classList,
    { round: isRound },
    { ["round-top"]: isRoundTop },
    { ["round-bottom"]: isRoundBottom }
  ], "class:list")}${spreadAttributes(rest)} data-astro-cid-5v3l7meg${addAttribute($$definedVars, "style")}> ${renderSlot($$result, $$slots["default"])} </section> `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/ui/Section.astro", void 0);

/*
How it works:
`this.#head` is an instance of `Node` which keeps track of its current value and nests another instance of `Node` that keeps the value that comes after it. When a value is provided to `.enqueue()`, the code needs to iterate through `this.#head`, going deeper and deeper to find the last value. However, iterating through every single item is slow. This problem is solved by saving a reference to the last value as `this.#tail` so that it can reference it to add a new value.
*/

class Node {
	value;
	next;

	constructor(value) {
		this.value = value;
	}
}

class Queue {
	#head;
	#tail;
	#size;

	constructor() {
		this.clear();
	}

	enqueue(value) {
		const node = new Node(value);

		if (this.#head) {
			this.#tail.next = node;
			this.#tail = node;
		} else {
			this.#head = node;
			this.#tail = node;
		}

		this.#size++;
	}

	dequeue() {
		const current = this.#head;
		if (!current) {
			return;
		}

		this.#head = this.#head.next;
		this.#size--;
		return current.value;
	}

	clear() {
		this.#head = undefined;
		this.#tail = undefined;
		this.#size = 0;
	}

	get size() {
		return this.#size;
	}

	* [Symbol.iterator]() {
		let current = this.#head;

		while (current) {
			yield current.value;
			current = current.next;
		}
	}
}

function pLimit(concurrency) {
	if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}

	const queue = new Queue();
	let activeCount = 0;

	const next = () => {
		activeCount--;

		if (queue.size > 0) {
			queue.dequeue()();
		}
	};

	const run = async (function_, resolve, arguments_) => {
		activeCount++;

		const result = (async () => function_(...arguments_))();

		resolve(result);

		try {
			await result;
		} catch {}

		next();
	};

	const enqueue = (function_, resolve, arguments_) => {
		queue.enqueue(
			AsyncResource.bind(run.bind(undefined, function_, resolve, arguments_)),
		);

		(async () => {
			// This function needs to wait until the next microtask before comparing
			// `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
			// when the run function is dequeued and called. The comparison in the if-statement
			// needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
			await Promise.resolve();

			if (activeCount < concurrency && queue.size > 0) {
				queue.dequeue()();
			}
		})();
	};

	const generator = (function_, ...arguments_) => new Promise(resolve => {
		enqueue(function_, resolve, arguments_);
	});

	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount,
		},
		pendingCount: {
			get: () => queue.size,
		},
		clearQueue: {
			value() {
				queue.clear();
			},
		},
	});

	return generator;
}

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"PUBLIC_LIQPAY_KEY": "sandbox_i93948170581", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://ecomisto.org", "ASSETS_PREFIX": undefined}, {})?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/projects/city-makers.mdx": () => import('./city-makers_yfr9RLkg.mjs'),"/src/content/projects/maysternya-mista.mdx": () => import('./maysternya-mista_wvwIrX4C.mjs'),"/src/content/projects/peremoha-lab.mdx": () => import('./peremoha-lab_D5mz7Z3Z.mjs'),"/src/content/projects/plastic-fantastic.mdx": () => import('./plastic-fantastic_1IPCMJ7e.mjs'),"/src/content/projects/prostir-diy.mdx": () => import('./prostir-diy_B_JPJ3AY.mjs'),"/src/content/projects/supersorters.mdx": () => import('./supersorters_CY6DLRtp.mjs'),"/src/content/projects/velokuhnya.mdx": () => import('./velokuhnya_CGrPHBtA.mjs'),"/src/content/projects/velolink.mdx": () => import('./velolink_CW5S-1Gk.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/members/andriy.yaml": () => import('./andriy_CPD1muqT.mjs'),"/src/content/members/daniil.yaml": () => import('./daniil_BZ_wG-es.mjs'),"/src/content/members/evgen.yaml": () => import('./evgen_CT53sfir.mjs'),"/src/content/members/maksym.yaml": () => import('./maksym_ciSOrGRI.mjs'),"/src/content/members/natalya.yaml": () => import('./natalya_CKWVe0AA.mjs'),"/src/content/members/oleksiy.yaml": () => import('./oleksiy_DJ0qJ0id.mjs'),"/src/content/members/sergiy-bezborodko.yaml": () => import('./sergiy-bezborodko_Cgr2WiTH.mjs'),"/src/content/members/sergiy.yaml": () => import('./sergiy_BpO2rhW1.mjs'),"/src/content/members/sonya.yaml": () => import('./sonya_DWUWGa2d.mjs')});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"members":{"type":"data","entries":{"andriy":"/src/content/members/andriy.yaml","daniil":"/src/content/members/daniil.yaml","evgen":"/src/content/members/evgen.yaml","maksym":"/src/content/members/maksym.yaml","natalya":"/src/content/members/natalya.yaml","oleksiy":"/src/content/members/oleksiy.yaml","sergiy-bezborodko":"/src/content/members/sergiy-bezborodko.yaml","sergiy":"/src/content/members/sergiy.yaml","sonya":"/src/content/members/sonya.yaml"}},"projects":{"type":"content","entries":{"maysternya-mista":"/src/content/projects/maysternya-mista.mdx","city-makers":"/src/content/projects/city-makers.mdx","peremoha-lab":"/src/content/projects/peremoha-lab.mdx","plastic-fantastic":"/src/content/projects/plastic-fantastic.mdx","prostir-diy":"/src/content/projects/prostir-diy.mdx","supersorters":"/src/content/projects/supersorters.mdx","velokuhnya":"/src/content/projects/velokuhnya.mdx","velolink":"/src/content/projects/velolink.mdx"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/projects/city-makers.mdx": () => import('./city-makers_DRQEqhqD.mjs'),"/src/content/projects/maysternya-mista.mdx": () => import('./maysternya-mista_HRJ7NKlu.mjs'),"/src/content/projects/peremoha-lab.mdx": () => import('./peremoha-lab_DSIKaZB0.mjs'),"/src/content/projects/plastic-fantastic.mdx": () => import('./plastic-fantastic_CLThEE5Y.mjs'),"/src/content/projects/prostir-diy.mdx": () => import('./prostir-diy_DAsLgQ4R.mjs'),"/src/content/projects/supersorters.mdx": () => import('./supersorters_CqB8ZKaB.mjs'),"/src/content/projects/velokuhnya.mdx": () => import('./velokuhnya_NsnST6F0.mjs'),"/src/content/projects/velolink.mdx": () => import('./velolink_CzcZcRb_.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const $$Astro$3 = createAstro("https://ecomisto.org");
const $$Row = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Row;
  const {
    columnGap = "space-4",
    rowGap,
    class: classList,
    alignItems = "start",
    ...rest
  } = Astro2.props;
  const responsiveColumnGap = getBreakpoints("column-gap", columnGap);
  const responsiveRowGap = getBreakpoints("row-gap", rowGap);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([
    "row",
    classList,
    responsiveColumnGap,
    responsiveRowGap,
    { ["items-" + alignItems]: alignItems }
  ], "class:list")}${spreadAttributes(rest)} data-astro-cid-l73y7qbm> ${renderSlot($$result, $$slots["default"])} </div> `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/compositions/Row.astro", void 0);

const $$Astro$2 = createAstro("https://ecomisto.org");
const $$Frame = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Frame;
  const { class: classList, ratio, ...rest } = Astro2.props;
  const [left, right] = ratio.split(":");
  const $$definedVars = defineStyleVars([{ left, right }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["frame", classList], "class:list")}${spreadAttributes(rest)}${addAttribute($$definedVars, "style")}> ${renderSlot($$result, $$slots["default"])} </div> `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/compositions/Frame.astro", void 0);

const $$Astro$1 = createAstro("https://ecomisto.org");
const $$MyPicture = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MyPicture;
  const { src, alt, width } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Picture", $$Picture, { "src": src, "alt": alt, "width": width, "formats": ["avif", "webp"], "densities": [1.5, 2] })}`;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/ui/MyPicture.astro", void 0);

const $$Astro = createAstro("https://ecomisto.org");
const $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { class: classList, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(["project-card", classList], "class:list")}${spreadAttributes(rest)} data-astro-cid-mspuyifq> ${renderSlot($$result, $$slots["default"])} </article> `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/ProjectCard.astro", void 0);

const $$TimePeriod = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="time-period" data-astro-cid-d7abjbmi> ${renderComponent($$result, "Text", $$Text, { "tagName": "p", "size": "small", "class": "color-secondary font-medium", "data-astro-cid-d7abjbmi": true }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })} </div> `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/TimePeriod.astro", void 0);

export { $$Section as $, $$Frame as a, $$TimePeriod as b, $$ProjectCard as c, $$Row as d, $$MyPicture as e, getCollection as g };
