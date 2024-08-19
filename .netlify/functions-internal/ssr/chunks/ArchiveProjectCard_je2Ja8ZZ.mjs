import { f as createAstro, a as createComponent, b as renderTemplate, d as renderComponent, e as renderSlot, m as maybeRenderHead } from './astro/server_CFD6V1YY.mjs';
import { c as $$ProjectCard, a as $$Frame, e as $$MyPicture, g as getCollection, d as $$Row, b as $$TimePeriod } from './TimePeriod_BLnmzInW.mjs';
import { a as getSortedProjects, b as getTimePeriod } from './helpers_C1eUHQX2.mjs';
import { a as $$Stack, e as $$Cluster, $ as $$Heading, f as $$Text, g as $$Icon, d as $$Link } from './BaseLayout_bb2t1Dxw.mjs';
/* empty css                         */
import { $ as $$Image } from './_astro_assets_CBy1yhCu.mjs';

const $$Astro$2 = createAstro("https://ecomisto.org");
const $$ActiveProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ActiveProjectCard;
  const { project, class: classList, ...rest } = Astro2.props;
  const { title, description, cover } = project.data;
  const projectsToExclude = ["peremoha-lab", "maysternya-mista", "velokuhnya"];
  return renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "class:list": ["active-project", classList], ...rest, "data-astro-cid-enunb7jp": true }, { "default": ($$result2) => renderTemplate`${projectsToExclude.includes(project.slug) ? renderTemplate`${renderComponent($$result2, "Stack", $$Stack, { "space": "space-8", "data-astro-cid-enunb7jp": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Frame", $$Frame, { "ratio": "4:3", "class": "cover-wrapper", "data-astro-cid-enunb7jp": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "MyPicture", $$MyPicture, { "src": cover, "width": 600, "alt": "", "data-astro-cid-enunb7jp": true })} ` })} ${renderComponent($$result3, "Cluster", $$Cluster, { "noWrap": true, "justify": "between", "alignItems": "baseline", "space": "space-7", "data-astro-cid-enunb7jp": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Stack", $$Stack, { "space": "space-3", "data-astro-cid-enunb7jp": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Heading", $$Heading, { "tagName": "h4", "size": "h5", "class": "title font-heading color-secondary", "data-astro-cid-enunb7jp": true }, { "default": ($$result6) => renderTemplate`${title}` })} ${renderComponent($$result5, "Text", $$Text, { "tagName": "p", "size": "medium", "class": "color-black description", "data-astro-cid-enunb7jp": true }, { "default": ($$result6) => renderTemplate`${description}` })} ` })} ${renderComponent($$result4, "Icon", $$Icon, { "name": "icon-arrow-right", "aria-hidden": "true", "focusable": "false", "class": "color-primary", "data-astro-cid-enunb7jp": true })} ` })} ` })}` : renderTemplate`${renderComponent($$result2, "Link", $$Link, { "href": `/projects/${project.slug}`, "data-astro-cid-enunb7jp": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Stack", $$Stack, { "space": "space-8", "data-astro-cid-enunb7jp": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Frame", $$Frame, { "ratio": "4:3", "class": "cover-wrapper", "data-astro-cid-enunb7jp": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "MyPicture", $$MyPicture, { "src": cover, "width": 600, "alt": "", "data-astro-cid-enunb7jp": true })} ` })} ${renderComponent($$result4, "Cluster", $$Cluster, { "noWrap": true, "justify": "between", "alignItems": "baseline", "space": "space-7", "data-astro-cid-enunb7jp": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Stack", $$Stack, { "space": "space-3", "data-astro-cid-enunb7jp": true }, { "default": ($$result6) => renderTemplate` ${renderComponent($$result6, "Heading", $$Heading, { "tagName": "h4", "size": "h5", "class": "title font-heading color-secondary", "data-astro-cid-enunb7jp": true }, { "default": ($$result7) => renderTemplate`${title}` })} ${renderComponent($$result6, "Text", $$Text, { "tagName": "p", "size": "medium", "class": "color-black description", "data-astro-cid-enunb7jp": true }, { "default": ($$result7) => renderTemplate`${description}` })} ` })} ${renderComponent($$result5, "Icon", $$Icon, { "name": "icon-arrow-right", "aria-hidden": "true", "focusable": "false", "class": "color-primary", "data-astro-cid-enunb7jp": true })} ` })} ` })} ` })}`}` })} `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/ActiveProjectCard.astro", void 0);

const $$ActiveProjects = createComponent(async ($$result, $$props, $$slots) => {
  const projects = (await getCollection("projects", ({ data }) => !data.isDraft)).filter(({ data }) => data.isActive);
  const sortedProjects = getSortedProjects(projects);
  return renderTemplate`${renderComponent($$result, "Stack", $$Stack, { "space": "space-10", "data-astro-cid-5lhaoq7t": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Heading", $$Heading, { "tagName": "h3", "size": "h5", "data-astro-cid-5lhaoq7t": true }, { "default": ($$result3) => renderTemplate`Основні проєкти` })} ${renderComponent($$result2, "Row", $$Row, { "columnGap": {
    default: "space-0",
    tablet: "space-4",
    laptop: "space-7"
  }, "rowGap": {
    default: "space-10",
    tablet: "space-12",
    laptop: "space-14"
  }, "class": "active-projects", "data-astro-cid-5lhaoq7t": true }, { "default": ($$result3) => renderTemplate`${sortedProjects.map((project) => {
    return renderTemplate`${renderComponent($$result3, "ActiveProjectCard", $$ActiveProjectCard, { "project": project, "class": "col-12 tablet:col-6", "data-active-project": true, "data-astro-cid-5lhaoq7t": true })}`;
  })}` })} ` })} `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/ActiveProjects.astro", void 0);

const $$Astro$1 = createAstro("https://ecomisto.org");
const $$ButtonArrow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ButtonArrow;
  const styleOptions = {
    primary: "primary",
    secondary: "secondary"
  };
  const {
    class: classList,
    tagName = "button",
    style,
    noArrow = false,
    ...rest
  } = Astro2.props;
  const Tag = tagName;
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "class:list": [
    "button-arrow",
    classList,
    styleOptions[style],
    { ["no-arrow"]: noArrow }
  ], ...rest, "data-astro-cid-brl7mbjh": true }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ${renderComponent($$result2, "Icon", $$Icon, { "name": "icon-arrow-right", "aria-hidden": "true", "focusable": "false", "data-astro-cid-brl7mbjh": true })} ` })} `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/ui/ButtonArrow.astro", void 0);

const $$Astro = createAstro("https://ecomisto.org");
const $$ArchiveProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArchiveProjectCard;
  const { project } = Astro2.props;
  const { title, description, cover, period } = project.data;
  if (!period) throw new Error(`Period is missing for project: ${project.id}`);
  const timePeriod = getTimePeriod(period);
  return renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "class": "archive-project", "data-astro-cid-a7rjyiq4": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Link", $$Link, { "href": `/projects/${project.slug}`, "data-astro-cid-a7rjyiq4": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Cluster", $$Cluster, { "class": "wrapper", "alignItems": "center", "space": { default: "space-4", tablet: "space-7" }, "noWrap": true, "data-astro-cid-a7rjyiq4": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Frame", $$Frame, { "ratio": "1:1", "class": "img-wrapper", "data-astro-cid-a7rjyiq4": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Image", $$Image, { "src": cover, "alt": "", "data-astro-cid-a7rjyiq4": true })} ` })} ${renderComponent($$result4, "Stack", $$Stack, { "space": "space-3", "class": "info", "data-astro-cid-a7rjyiq4": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Stack", $$Stack, { "space": "space-2", "data-astro-cid-a7rjyiq4": true }, { "default": ($$result6) => renderTemplate` ${renderComponent($$result6, "TimePeriod", $$TimePeriod, { "data-astro-cid-a7rjyiq4": true }, { "default": ($$result7) => renderTemplate`${timePeriod}` })} ${renderComponent($$result6, "Heading", $$Heading, { "tagName": "h4", "size": "h6", "class": "title font-heading color-secondary", "data-astro-cid-a7rjyiq4": true }, { "default": ($$result7) => renderTemplate`${title}` })} ` })} ${renderComponent($$result5, "Text", $$Text, { "tagName": "p", "size": "medium", "class": "color-dark-gray description", "data-astro-cid-a7rjyiq4": true }, { "default": ($$result6) => renderTemplate`${description}` })} ` })} ${maybeRenderHead()}<div class="arrow-right-container" data-astro-cid-a7rjyiq4> <span class="arrow-right-text" data-astro-cid-a7rjyiq4>Дивитись</span> ${renderComponent($$result4, "Icon", $$Icon, { "name": "icon-arrow-right", "aria-hidden": "true", "focusable": "false", "class": "color-primary arrow-right", "data-astro-cid-a7rjyiq4": true })} </div> ` })} ` })} ` })} `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/ArchiveProjectCard.astro", void 0);

export { $$ArchiveProjectCard as $, $$ButtonArrow as a, $$ActiveProjects as b };
