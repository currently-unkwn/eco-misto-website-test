import { a as createComponent, b as renderTemplate, d as renderComponent } from './astro/server_DpbLoD-d.mjs';
import { $ as $$Heading, g as getSortedProjects, a as $$Stack, b as $$Center, c as $$BaseLayout } from './BaseLayout_COJ-lBUc.mjs';
import { $ as $$Section, g as getCollection } from './TimePeriod_4EC9m0Kf.mjs';
/* empty css                         */
import { $ as $$ArchiveProjectCard, a as $$ButtonArrow, b as $$ActiveProjects } from './ArchiveProjectCard_CHeOvnXI.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "hero", "isRoundBottom": true, "data-astro-cid-lkf2ngmc": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Heading", $$Heading, { "tagName": "h1", "size": "h3", "class": "color-primary", "data-astro-cid-lkf2ngmc": true }, { "default": ($$result3) => renderTemplate`Наші проєкти` })} ` })} `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/projects/Hero.astro", void 0);

const $$ArchiveProjects = createComponent(async ($$result, $$props, $$slots) => {
  const projects = (await getCollection("projects", ({ data }) => !data.isDraft)).filter(({ data }) => !data.isActive);
  const sortedProjects = getSortedProjects(projects);
  return renderTemplate`${renderComponent($$result, "Stack", $$Stack, { "space": "space-10", "data-astro-cid-dzmerket": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Heading", $$Heading, { "tagName": "h3", "size": "h5", "class": "font-heading", "data-astro-cid-dzmerket": true }, { "default": ($$result3) => renderTemplate`Реалізовані проекти` })} ${renderComponent($$result2, "Stack", $$Stack, { "space": "space-10", "data-astro-cid-dzmerket": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Stack", $$Stack, { "space": "space-9", "class": "archive-projects-list", "data-astro-cid-dzmerket": true }, { "default": ($$result4) => renderTemplate`${sortedProjects.map((project) => {
    return renderTemplate`${renderComponent($$result4, "ArchiveProjectCard", $$ArchiveProjectCard, { "project": project, "data-astro-cid-dzmerket": true })}`;
  })}` })} ${renderComponent($$result3, "ButtonArrow", $$ButtonArrow, { "style": "primary", "noArrow": true, "data-load-more": true, "data-astro-cid-dzmerket": true }, { "default": ($$result4) => renderTemplate`Дивитись більше` })} ` })} ` })}  `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/projects/ArchiveProjects.astro", void 0);

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "projects", "data-astro-cid-ayux7fr6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Center", $$Center, { "maxWidth": "87.5rem", "space": { default: "space-6", tablet: "space-7", laptop: "space-9" }, "data-astro-cid-ayux7fr6": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Stack", $$Stack, { "space": { default: "space-12", tablet: "space-14", laptop: "space-16" }, "data-astro-cid-ayux7fr6": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "ActiveProjects", $$ActiveProjects, { "data-astro-cid-ayux7fr6": true })} ${renderComponent($$result4, "ArchiveProjects", $$ArchiveProjects, { "data-astro-cid-ayux7fr6": true })} ` })} ` })} ` })} `;
}, "/Volumes/Media HD/Web Development/ecomisto/src/components/projects/Projects.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u041F\u0440\u043E\u0435\u043A\u0442\u0438" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Projects", $$Projects, {})} ` })}`;
}, "/Volumes/Media HD/Web Development/ecomisto/src/pages/projects/index.astro", void 0);

const $$file = "/Volumes/Media HD/Web Development/ecomisto/src/pages/projects/index.astro";
const $$url = "/projects";

export { $$Index as default, $$file as file, $$url as url };
