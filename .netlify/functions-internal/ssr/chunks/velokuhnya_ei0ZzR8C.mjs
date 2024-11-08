import { a as createComponent, b as renderTemplate, m as maybeRenderHead, d as renderComponent, F as Fragment, _ as __astro_tag_component__, c as createVNode } from './astro/server_CFD6V1YY.mjs';
import { $ as $$Image } from './_astro_assets_DiISuSVx.mjs';
import { a as $$Stack, g as $$Icon, b as $$Heading, c as $$Text } from './BaseLayout_D9RWBCNB.mjs';
import { e as $$Row, f as $$MyPicture } from './TimePeriod__a2BxqUl.mjs';
import { $ as $$Centered } from './Centered_DKGuXv5n.mjs';
/* empty css                                                                    */
import './working-hours_Bz807rNH.mjs';

const workingHoursBg = new Proxy({"src":"/_astro/working-hours_bg.BmrBWQ-z.png","width":2200,"height":322,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/projects/images/velokuhnya/working-hours_bg.png";
							}
							
							return target[name];
						}
					});

const workingHoursBgMobile = new Proxy({"src":"/_astro/working-hours_bg-mobile.IVKKUzJL.png","width":980,"height":198,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/projects/images/velokuhnya/working-hours_bg-mobile.png";
							}
							
							return target[name];
						}
					});

const $$WorkingHours = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="working-hours" data-astro-cid-372dsktf> ${renderComponent($$result, "Centered", $$Centered, { "data-astro-cid-372dsktf": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Stack", $$Stack, { "space": { default: "space-4", tablet: "space-0" }, "data-astro-cid-372dsktf": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Row", $$Row, { "rowGap": { default: "space-10", tablet: "space-0" }, "data-astro-cid-372dsktf": true }, { "default": ($$result4) => renderTemplate` <div class="logo col-12 tablet:col-6" data-astro-cid-372dsktf> ${renderComponent($$result4, "Icon", $$Icon, { "name": "velokuhnya-logo", "data-astro-cid-372dsktf": true })} </div> <div class="info col-12 tablet:col-6" data-astro-cid-372dsktf> ${renderComponent($$result4, "Stack", $$Stack, { "space": "space-8", "data-astro-cid-372dsktf": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Stack", $$Stack, { "space": "space-4", "data-astro-cid-372dsktf": true }, { "default": ($$result6) => renderTemplate` ${renderComponent($$result6, "Heading", $$Heading, { "tagName": "h4", "size": "h6", "data-astro-cid-372dsktf": true }, { "default": ($$result7) => renderTemplate`Працюємо<br data-astro-cid-372dsktf> з понеділка по пʼятницю` })} ${renderComponent($$result6, "Heading", $$Heading, { "tagName": "h4", "size": "h6", "data-astro-cid-372dsktf": true }, { "default": ($$result7) => renderTemplate`11:00 - 17:00` })} ` })} ${renderComponent($$result5, "Stack", $$Stack, { "space": "space-1", "data-astro-cid-372dsktf": true }, { "default": ($$result6) => renderTemplate` ${renderComponent($$result6, "Text", $$Text, { "tagName": "p", "size": "medium", "data-astro-cid-372dsktf": true }, { "default": ($$result7) => renderTemplate`
Проспект Левка Лук’яненка, 2А
` })} ${renderComponent($$result6, "Text", $$Text, { "tagName": "p", "size": "medium", "data-astro-cid-372dsktf": true }, { "default": ($$result7) => renderTemplate` Центр «Перемога» ` })} ` })} ` })} </div> ` })} ${renderComponent($$result3, "Row", $$Row, { "data-astro-cid-372dsktf": true }, { "default": ($$result4) => renderTemplate` <div class="collage col-12" data-astro-cid-372dsktf> ${renderComponent($$result4, "MyPicture", $$MyPicture, { "src": workingHoursBgMobile, "width": 490, "alt": "Peremoha Center Collage", "class": "mobile", "data-astro-cid-372dsktf": true })} ${renderComponent($$result4, "MyPicture", $$MyPicture, { "src": workingHoursBg, "width": 1100, "alt": "Peremoha Center Collage", "class": "desktop", "data-astro-cid-372dsktf": true })} </div> ` })} ` })} ` })} </div> `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/project/WorkingHours.astro", void 0);

const bikesForUkraine = new Proxy({"src":"/_astro/bikes-for-ukraine.De7IBfbR.png","width":2400,"height":3200,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/projects/images/velokuhnya/bikes-for-ukraine.png";
							}
							
							return target[name];
						}
					});

/*Should start with 'images'*/
/*prettier-ignore*/
/*prettier-ignore*/
/*prettier-ignore*/
/*prettier-ignore*/
/*<TextContent>

<ImageGrid>
<Full src={workingHours} orientation="portrait"/>
</ImageGrid>
</TextContent>*/
const frontmatter = {
  "title": "Велокухня",
  "description": "Соціальна веломайстерня для покращення сталої мобільності у постраждалих від бойових дій та деокупованих громадах.",
  "pubDate": "2999-01-03T00:00:00.000Z",
  "cover": {
    "image": "./images/velokuhnya/cover_velokuhnya.png",
    "alt": "Опис"
  },
  "isActive": true,
  "isCollage": true
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "bikesforukraine",
    "text": "#BikesForUkraine"
  }];
}
const velokuhnyaImages = ["images/velokuhnya/velokuhnya_001.jpg", "images/velokuhnya/velokuhnya_002.jpg", "images/velokuhnya/velokuhnya_003.jpg", "images/velokuhnya/velokuhnya_004.jpg", "images/velokuhnya/velokuhnya_005.jpg", "images/velokuhnya/velokuhnya_006.jpg", "images/velokuhnya/velokuhnya_007.jpg", "images/velokuhnya/velokuhnya_008.jpg", "images/velokuhnya/velokuhnya_009.jpg", "images/velokuhnya/velokuhnya_010.jpg", "images/velokuhnya/velokuhnya_011.jpg", "images/velokuhnya/velokuhnya_012.jpg"];
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h3: "h3",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  }, {Badge, Blockquote, BlockquoteFooter, Full, Icon, ImageGrid, Logos, MultiSlideGallery, ResultList, TextContent} = _components;
  if (!Badge) _missingMdxReference("Badge");
  if (!Blockquote) _missingMdxReference("Blockquote");
  if (!BlockquoteFooter) _missingMdxReference("BlockquoteFooter");
  if (!Full) _missingMdxReference("Full");
  if (!Icon) _missingMdxReference("Icon");
  if (!ImageGrid) _missingMdxReference("ImageGrid");
  if (!Logos) _missingMdxReference("Logos");
  if (!MultiSlideGallery) _missingMdxReference("MultiSlideGallery");
  if (!ResultList) _missingMdxReference("ResultList");
  if (!TextContent) _missingMdxReference("TextContent");
  return createVNode(Fragment, {
    children: ["\n", "\n", createVNode(TextContent, {
      children: createVNode(_components.p, {
        children: [createVNode(_components.strong, {
          children: "Велокухня"
        }), " — це соціальна веломайстерня, створена для покращення сталої\nмобільності у постраждалих від бойових дій районах Чернігова та деокупованих\nгромадах Чернігівщини."]
      })
    }), "\n", createVNode(TextContent, {
      children: [createVNode(_components.p, {
        children: [createVNode(Badge, {
          children: "Проблема"
        }), "\nУ 2022 році громадський транспорт у Чернігові зупинився на 40 днів через інтенсивні обстріли на початку повномасштабного вторгнення і блокади міста. З паливною кризою стикнулася і вся Чернігівщина."]
      }), createVNode(_components.p, {
        children: "Відсутність громадського транспорту обмежувала мобільність в межах міста для задоволення базових потреб, таких як отримання медичної допомоги та евакуація з небезпечних зон​. Зупинка транспорту ускладнила логістику і доставку гуманітарної допомоги для маломобільних категорій містян."
      })]
    }), "\n", "\n", createVNode(Blockquote, {
      children: [createVNode(_components.p, {
        children: [createVNode("span", {
          children: "“"
        }), "Велосипед має стати основним транспортом для міської мобільності,\nзаклавши фундамент для велосипедизації і демократизації українських міст в\nдовгостроковій перспективі.\n", createVNode("span", {
          children: "”"
        })]
      }), createVNode(BlockquoteFooter, {
        children: createVNode(_components.p, {
          children: "Громадська організація «Еко Місто Чернігів»"
        })
      })]
    }), "\n", createVNode(TextContent, {
      children: [createVNode(_components.h3, {
        id: "bikesforukraine",
        children: "#BikesForUkraine"
      }), createVNode(_components.p, {
        children: "Громадська організація «Еко Місто Чернігів» – співзасновники кампанії #BikesForUkraine – міжнародної ініціативи, спрямованої на підтримку українських громад, що постраждали від війни."
      }), createVNode(_components.p, {
        children: "Кампанія була започаткована шістьма українськими неурядовими організаціями і займається збором велосипедів від донорів з усього світу. Ми прагнемо підвищити мобільність українських волонтерів і волонтерок, персоналу критично важливих комунальних служб, щоб забезпечити доступ до гуманітарної та іншої допомоги тим, хто найбільше цього потребує."
      }), createVNode(_components.p, {
        children: "А також велосипеди можуть отримати внутрішньо переміщені особи та мешканці модульних містечок і постраждалих районів, заповнивши форму на сайті."
      }), createVNode(_components.p, {
        children: "Більше 700 велосипедів в рамках кампанії #BikesForUkraine було надано партнерами з Європи та відремонтовано на Велотолоках разом з волонтерами у соціальній веломайстерні."
      }), createVNode(_components.p, {
        children: "Веломайстерня отримувала вживані велосипеди та інші ресурси від міжнародних партнерів, зокрема з Німеччини, Данії, Нідерландів, Італії та Латвії."
      }), createVNode(_components.p, {
        children: ["Ініціатори кампанії: ", createVNode(_components.a, {
          href: "https://u-cycle.org.ua",
          children: "U-Cycle"
        }), " (Київ), ГО ", createVNode(_components.a, {
          href: "https://www.facebook.com/eco.cn.ua/",
          children: "«Еко Місто»"
        }), " (Чернігів), ГО ", createVNode(_components.a, {
          href: "https://www.facebook.com/sumyextremestyle",
          children: "«Молодіжне об’єднання Екстрим стайл»"
        }), " (Суми), ", createVNode(_components.a, {
          href: "https://www.facebook.com/urbanreform.ua",
          children: "ГО «Міські реформи»"
        }), " (Харків), ГО ", createVNode(_components.a, {
          href: "https://www.facebook.com/ngoforza",
          children: "«ФОРЗА»"
        }), " (Ужгород), ГО ", createVNode(_components.a, {
          href: "https://www.facebook.com/velovector.org",
          children: "«ВелоВектор»"
        }), " (Одеса)"]
      })]
    }), "\n", "\n", createVNode(TextContent, {
      children: createVNode(ImageGrid, {
        children: createVNode(Full, {
          src: bikesForUkraine,
          orientation: "portrait"
        })
      })
    }), "\n", createVNode(TextContent, {
      children: [createVNode(Badge, {
        children: "Підхід"
      }), createVNode(_components.p, {
        children: "Для розвитку та популяризації велосипедного руху в Чернігові ми заснували першу соціальну веломайстерню, організовуємо заходи для розвитку велоспільноти та адвокатуємо міські інфраструктурні проєкти і стратегії."
      }), createVNode(_components.p, {
        children: createVNode(_components.strong, {
          children: "Чому веломайстерня соціальна?"
        })
      }), createVNode(_components.p, {
        children: "Майстерня надає можливість безкоштовного користуватися професійним інструментом та отримати консультації з ремонту та обслуговування велосипедів від досвідчених механіків."
      }), createVNode(_components.p, {
        children: "Майстерня проводить освітні заходи, де охочі можуть навчитися доглядати за своїми велосипедами. Це включає як теоретичні знання, так і практичні навички, що дозволяють учасникам самостійно виконувати дрібні ремонти та обслуговування власних велосипедів​."
      })]
    }), "\n", "\n", createVNode(TextContent, {
      children: [createVNode(Badge, {
        children: "Наші пропозиції"
      }), createVNode(ResultList, {
        children: createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Безкоштовні велосипеди для волонтерів, соціальних працівників."
          }), "\n", createVNode(_components.li, {
            children: "Професійний інструмент у вільному доступі для велосипедистів."
          }), "\n", createVNode(_components.li, {
            children: "Послуги з ремонту та догляду за приватними велосипедами."
          }), "\n", createVNode(_components.li, {
            children: "Заходи та активності для розвитку велосипедної спільноти."
          }), "\n", createVNode(_components.li, {
            children: "Воркшопи з ремонту та догляду за велосипедом."
          }), "\n", createVNode(_components.li, {
            children: "Прокат велосипедів."
          }), "\n"]
        })
      })]
    }), "\n", "\n", "\n", createVNode($$WorkingHours, {}), "\n", createVNode(Logos, {
      children: [createVNode(Icon, {
        name: "donors-eed"
      }), createVNode(Icon, {
        name: "donors-usaid"
      }), createVNode(Icon, {
        name: "partners-ecovisio-original"
      }), createVNode(Icon, {
        name: "partners-u-cycle-original"
      }), createVNode(Icon, {
        name: "partners-agenciya-original"
      }), createVNode(Icon, {
        name: "partners-chernigiv-city-council"
      }), createVNode(Icon, {
        name: "partners-chernigiv-ova"
      })]
    }), "\n", createVNode(MultiSlideGallery, {
      imagePaths: velokuhnyaImages
    })]
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

const url = "src/content/projects/velokuhnya.mdx";
const file = "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/projects/velokuhnya.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/projects/velokuhnya.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url, velokuhnyaImages };
