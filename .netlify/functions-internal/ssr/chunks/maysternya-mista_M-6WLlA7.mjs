import { F as Fragment, _ as __astro_tag_component__, c as createVNode } from './astro/server_CFD6V1YY.mjs';
import { $ as $$Image } from './_astro_assets_DiISuSVx.mjs';

const frontmatter = {
  "id": "maysternya-mista",
  "title": "Майстерня міста",
  "description": "Краудфандингова платформа Чернігова для реалізації ваших ідей з покращення якості та комфорту міських публічних просторів.",
  "pubDate": "2999-01-01T00:00:00.000Z",
  "cover": {
    "image": "./images/maysternya-mista/cover_maysternya-mista.png",
    "alt": "Опис"
  },
  "isActive": true,
  "isCollage": true
};
function getHeadings() {
  return [];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const {TextContent} = props.components || ({});
  if (!TextContent) _missingMdxReference("TextContent");
  return createVNode(TextContent, {
    children: "Текст оновлюється."
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
function _missingMdxReference(id, component) {
  throw new Error("Expected " + ("component" ) + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}
const url = "src/content/projects/maysternya-mista.mdx";
const file = "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/projects/maysternya-mista.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/projects/maysternya-mista.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
