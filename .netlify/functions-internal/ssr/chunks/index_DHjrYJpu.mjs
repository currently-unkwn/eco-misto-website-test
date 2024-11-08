import { f as createAstro, a as createComponent, b as renderTemplate, m as maybeRenderHead, g as addAttribute, d as renderComponent, e as renderSlot, F as Fragment } from './astro/server_CFD6V1YY.mjs';
import { h as $$Shape, b as $$Heading, c as $$Text, $ as $$Center, a as $$Stack, f as $$Cluster, g as $$Icon, i as $$Button, e as $$BaseLayout } from './BaseLayout_D9RWBCNB.mjs';
import { f as $$MyPicture, $ as $$Section, e as $$Row, b as $$Frame, g as getCollection, a as $$ButtonArrow } from './TimePeriod__a2BxqUl.mjs';
/* empty css                         */
import { a as achievmentsData } from './siteData_Ctw1-7FX.mjs';
import { a as $$SwiperPaginationProgress, $ as $$SwiperButton, d as $$AutoGrid, c as $$Marquee, b as $$EmptyShape } from './AutoGrid_B39E_Y4S.mjs';
import { p as parseTitle, a as getSortedProjects } from './helpers_78RTG-S2.mjs';
import { $ as $$ArchiveProjectCard, a as $$ActiveProjects } from './ArchiveProjectCard_C3VZchq0.mjs';

const $$Astro$5 = createAstro("https://ecomisto-test.netlify.app");
const $$Achievment = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Achievment;
  const { achievment } = Astro2.props;
  const {
    title,
    description,
    id,
    "left-translateX": leftTranslateX,
    "right-translateX": rightTranslateX,
    "left-rotate": leftRotate,
    "right-rotate": rightRotate
  } = achievment;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["achievment", id], "class:list")} data-astro-cid-yanjpqo6> ${renderComponent($$result, "Shape", $$Shape, { "color": "secondary", "class": "left", "translateX": leftTranslateX, "rotate": leftRotate, "data-astro-cid-yanjpqo6": true })} ${renderComponent($$result, "Shape", $$Shape, { "color": "secondary", "class": "right", "translateX": rightTranslateX, "rotate": rightRotate, "data-astro-cid-yanjpqo6": true })} <div class="content" data-astro-cid-yanjpqo6> ${renderComponent($$result, "Heading", $$Heading, { "tagName": "h4", "size": "h3", "class": "numner font-heading", "data-astro-cid-yanjpqo6": true }, { "default": ($$result2) => renderTemplate`${title}` })} ${renderComponent($$result, "Text", $$Text, { "tagName": "p", "size": "medium", "class": "description", "data-astro-cid-yanjpqo6": true }, { "default": ($$result2) => renderTemplate`${description}` })} </div> </div> `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/Achievment.astro", void 0);

const achievmentsBg = new Proxy({"src":"/_astro/achievments-bg-final.CgPE6Tpw.jpg","width":2800,"height":1200,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/assets/images/achievments-bg-final.jpg";
							}
							
							return target[name];
						}
					});

const $$Achievments = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "achievments", "data-astro-cid-hjhrmcmx": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Center", $$Center, { "maxWidth": "87.5rem", "space": { default: "space-6", tablet: "space-7", laptop: "space-9" }, "data-astro-cid-hjhrmcmx": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="achievments-container" data-astro-cid-hjhrmcmx> <div class="bg-image" data-astro-cid-hjhrmcmx> ${renderComponent($$result3, "MyPicture", $$MyPicture, { "src": achievmentsBg, "width": 1400, "alt": "", "data-astro-cid-hjhrmcmx": true })} </div> ${achievmentsData.map((achievment) => renderTemplate`${renderComponent($$result3, "Achievment", $$Achievment, { "achievment": achievment, "data-astro-cid-hjhrmcmx": true })}`)} </div> ` })} ` })} `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/Achievments.astro", void 0);

const $$Mission = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "color": "secondary", "isRound": true, "class": "mission", "data-astro-cid-mum6lvxz": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Stack", $$Stack, { "space": "space-12", "data-astro-cid-mum6lvxz": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Center", $$Center, { "maxWidth": "87.5rem", "space": { default: "space-6", tablet: "space-7", laptop: "space-9" }, "data-astro-cid-mum6lvxz": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Row", $$Row, { "data-astro-cid-mum6lvxz": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Stack", $$Stack, { "space": "space-4", "class": "col-12 tablet:col-9 laptop:col-8", "data-astro-cid-mum6lvxz": true }, { "default": ($$result6) => renderTemplate` ${renderComponent($$result6, "Text", $$Text, { "tagName": "div", "size": "large", "class": "font-medium", "variant": "accent", "isBadge": true, "data-astro-cid-mum6lvxz": true }, { "default": ($$result7) => renderTemplate`Місія` })} ${renderComponent($$result6, "Heading", $$Heading, { "tagName": "h3", "size": "h4", "class": "mission-text color-primary font-heading", "data-astro-cid-mum6lvxz": true }, { "default": ($$result7) => renderTemplate`
Сприяти сталому розвитку Чернігова шляхом впровадження інноваційних
            та креативних рішень, залучаючи спільноту на всіх рівнях.
` })} ` })} ` })} ` })} ${renderComponent($$result3, "Achievments", $$Achievments, { "data-astro-cid-mum6lvxz": true })} ` })} ` })} `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/Mission.astro", void 0);

const $$Astro$4 = createAstro("https://ecomisto-test.netlify.app");
const $$TeamMember = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$TeamMember;
  const { member } = Astro2.props;
  const { name, position, picture } = member.data;
  return renderTemplate`${maybeRenderHead()}<figure class="team-member" data-astro-cid-siaceyfv> ${renderComponent($$result, "Frame", $$Frame, { "ratio": "3:4", "class": "member-photo", "data-astro-cid-siaceyfv": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MyPicture", $$MyPicture, { "src": picture, "alt": "", "width": 450, "data-astro-cid-siaceyfv": true })} ` })} <figcaption class="member-info" data-astro-cid-siaceyfv> <div class="wrapper" data-astro-cid-siaceyfv> ${renderComponent($$result, "Shape", $$Shape, { "color": "white", "class": "top", "translateY": "-100%", "rotate": "180deg", "data-astro-cid-siaceyfv": true })} ${renderComponent($$result, "Shape", $$Shape, { "color": "white", "class": "right", "translateX": "100%", "rotate": "180deg", "data-astro-cid-siaceyfv": true })} <div class="info" data-astro-cid-siaceyfv> ${renderComponent($$result, "Text", $$Text, { "tagName": "span", "size": "medium", "isBolded": true, "data-astro-cid-siaceyfv": true }, { "default": ($$result2) => renderTemplate`${name}` })} ${renderComponent($$result, "Text", $$Text, { "tagName": "span", "size": "small", "class": "position", "data-astro-cid-siaceyfv": true }, { "default": ($$result2) => renderTemplate`${position}` })} </div> </div> </figcaption> </figure> `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/TeamMember.astro", void 0);

const $$TeamMembers = createComponent(async ($$result, $$props, $$slots) => {
  const members = await getCollection("members");
  const sortedMembers = members.sort((a, b) => a.data.indexId - b.data.indexId);
  return renderTemplate`${maybeRenderHead()}<div class="team-members-gallery" data-astro-cid-ecfzeslq> <div class="team-members-swiper swiper" data-astro-cid-ecfzeslq> <div class="swiper-wrapper" data-astro-cid-ecfzeslq> ${sortedMembers.map((member) => {
    return renderTemplate`<div class="swiper-slide" data-astro-cid-ecfzeslq> <div role="listitem" data-astro-cid-ecfzeslq> ${renderComponent($$result, "TeamMember", $$TeamMember, { "member": member, "data-astro-cid-ecfzeslq": true })} </div> </div>`;
  })} </div> </div> <div class="swiper-navigation" data-astro-cid-ecfzeslq> ${renderComponent($$result, "Cluster", $$Cluster, { "space": { default: "space-8", tablet: "space-10" }, "alignItems": "center", "noWrap": true, "data-astro-cid-ecfzeslq": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SwiperPaginationProgress", $$SwiperPaginationProgress, { "data-astro-cid-ecfzeslq": true })} ${renderComponent($$result2, "Cluster", $$Cluster, { "space": "space-2", "noWrap": true, "class": "swiper-buttons", "data-astro-cid-ecfzeslq": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "SwiperButton", $$SwiperButton, { "direction": "left", "class": "team-swiper-button-prev", "data-astro-cid-ecfzeslq": true })} ${renderComponent($$result3, "SwiperButton", $$SwiperButton, { "direction": "right", "class": "team-swiper-button-next", "data-astro-cid-ecfzeslq": true })} ` })} ` })} </div> </div> `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/TeamMembers.astro", void 0);

const $$Team = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "team", "isRoundTop": true, "color": "white", "data-astro-cid-2qaj5cqa": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Center", $$Center, { "maxWidth": "87.5rem", "space": { default: "space-6", tablet: "space-7", laptop: "space-9" }, "data-astro-cid-2qaj5cqa": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Stack", $$Stack, { "space": "space-10", "data-astro-cid-2qaj5cqa": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Heading", $$Heading, { "tagName": "h3", "size": "h6", "class": "color-secondary", "data-astro-cid-2qaj5cqa": true }, { "default": ($$result5) => renderTemplate`Команда` })} ${renderComponent($$result4, "TeamMembers", $$TeamMembers, { "data-astro-cid-2qaj5cqa": true })} ` })} ` })} ` })} `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/Team.astro", void 0);

const heroImg = new Proxy({"src":"/_astro/hero2.BBVvcogS.jpg","width":1700,"height":1135,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/assets/images/hero2.jpg";
							}
							
							return target[name];
						}
					});

const $$Astro$3 = createAstro("https://ecomisto-test.netlify.app");
const $$VideoDialog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$VideoDialog;
  const { class: classList, name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<dialog${addAttribute([classList], "class:list")}${addAttribute(name, "data-dialog")} data-astro-cid-q2xwx3hn> ${renderComponent($$result, "Button", $$Button, { "variant": "icon", "style": "ghost", "aria-label": `Close ${name}`, "isDefault": false, "data-close-dialog": true, "data-astro-cid-q2xwx3hn": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "icon-close", "size": 32, "data-astro-cid-q2xwx3hn": true })} <span class="sr-only" data-astro-cid-q2xwx3hn>${`Close ${name}`}</span> ` })} <div class="video-container" data-astro-cid-q2xwx3hn> ${renderSlot($$result, $$slots["default"])} </div> </dialog> `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/ui/VideoDialog.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "hero", "isRoundBottom": true, "color": "secondary", "data-astro-cid-ewxirvlt": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Center", $$Center, { "maxWidth": "87.5rem", "space": { default: "space-6", tablet: "space-7", laptop: "space-9" }, "data-astro-cid-ewxirvlt": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Row", $$Row, { "class": "hero-grid", "rowGap": { default: "space-7", tablet: "space-14", laptop: "space-0" }, "alignItems": "center", "data-astro-cid-ewxirvlt": true }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="hero-text col-12" data-astro-cid-ewxirvlt> ${renderComponent($$result4, "Heading", $$Heading, { "tagName": "h1", "size": "h1", "class": "font-heading", "data-astro-cid-ewxirvlt": true }, { "default": ($$result5) => renderTemplate`Події. Простори.<br data-astro-cid-ewxirvlt>Спільнота.` })} </div> <div class="about-text col-12" data-astro-cid-ewxirvlt> ${renderComponent($$result4, "Stack", $$Stack, { "space": { default: "space-4", laptop: "space-7" }, "data-astro-cid-ewxirvlt": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Text", $$Text, { "tagName": "p", "size": "large", "class": "color-accent", "data-astro-cid-ewxirvlt": true }, { "default": ($$result6) => renderTemplate`
Громадська організація «Еко Місто Чернігів» — це урбаністична
            ініціатива, спрямована на покращення якості життя через проєкти
            активації публічних просторів і формування спільнот.
` })} ${renderComponent($$result5, "Button", $$Button, { "style": "primary", "isInverted": true, "data-open-partnership": true, "aria-label": "Open cooperation form modal", "data-astro-cid-ewxirvlt": true }, { "default": ($$result6) => renderTemplate`Написати
` })} ` })} </div> <div class="hero-image col-12 tablet:col-10 laptop:col-8" data-astro-cid-ewxirvlt> <div class="img-wrapper" data-astro-cid-ewxirvlt> ${renderComponent($$result4, "MyPicture", $$MyPicture, { "src": heroImg, "width": 850, "alt": "", "data-astro-cid-ewxirvlt": true })} </div> <div class="play-video" data-astro-cid-ewxirvlt> ${renderComponent($$result4, "Button", $$Button, { "variant": "icon", "style": "ghost", "isDefault": false, "data-open-promo": true, "aria-label": "Open ecomisto showreel modal", "data-astro-cid-ewxirvlt": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Icon", $$Icon, { "name": "play-video", "class": "icon-play-video", "size": 120, "data-astro-cid-ewxirvlt": true })} ` })} ${renderComponent($$result4, "Icon", $$Icon, { "name": "icon-play", "class": "icon-play", "size": 32, "data-astro-cid-ewxirvlt": true })} ${renderComponent($$result4, "VideoDialog", $$VideoDialog, { "name": "promo-video", "data-astro-cid-ewxirvlt": true }, { "default": ($$result5) => renderTemplate` <video src="/ecomisto-showreel.mp4" controls autoplay playsinline muted data-astro-cid-ewxirvlt></video> ` })} <!-- <VideoModal>
            <div class="video-container">
              <video
                src="/ecomisto-showreel.mp4"
                controls
                autoplay
                playsinline
                muted></video>
            </div>
          </VideoModal> --> </div> <div class="about-text tablet" data-astro-cid-ewxirvlt> ${renderComponent($$result4, "Shape", $$Shape, { "color": "secondary", "class": "left", "translateX": "-100%", "data-astro-cid-ewxirvlt": true })} ${renderComponent($$result4, "Shape", $$Shape, { "color": "secondary", "class": "bottom", "translateY": "100%", "data-astro-cid-ewxirvlt": true })} ${renderComponent($$result4, "Stack", $$Stack, { "space": "space-5", "data-astro-cid-ewxirvlt": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Text", $$Text, { "tagName": "p", "size": "medium", "class": "color-accent", "data-astro-cid-ewxirvlt": true }, { "default": ($$result6) => renderTemplate`
Громадська організація «Еко Місто Чернігів» — це урбаністична
              ініціатива, спрямована на покращення якості життя через проєкти
              тактичного урбанізму та формування спільнот.
` })} ${renderComponent($$result5, "Button", $$Button, { "style": "primary", "isInverted": true, "data-open-partnership": true, "aria-label": "Open cooperation form modal", "data-astro-cid-ewxirvlt": true }, { "default": ($$result6) => renderTemplate`Написати
` })} ` })} </div> <div class="hero-text laptop" data-astro-cid-ewxirvlt> ${renderComponent($$result4, "Shape", $$Shape, { "color": "secondary", "class": "left", "translateX": "-100%", "data-astro-cid-ewxirvlt": true })} ${renderComponent($$result4, "Shape", $$Shape, { "color": "secondary", "class": "bottom", "translateY": "100%", "data-astro-cid-ewxirvlt": true })} ${renderComponent($$result4, "Heading", $$Heading, { "tagName": "h1", "size": "h1", "class": "font-heading", "data-astro-cid-ewxirvlt": true }, { "default": ($$result5) => renderTemplate`Події. Простори.<br data-astro-cid-ewxirvlt>Спільнота.` })} </div> </div> ` })} ` })} ` })} `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/Hero.astro", void 0);

const $$Astro$2 = createAstro("https://ecomisto-test.netlify.app");
const $$YoutubeVideo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$YoutubeVideo;
  const { video } = Astro2.props;
  const { thumbnail, title, videoId } = video;
  return renderTemplate`${maybeRenderHead()}<div class="youtube-video" data-astro-cid-psp4n7jq> <button data-open-youtube aria-label="Open youtube video modal" class="open-btn" data-astro-cid-psp4n7jq> ${renderComponent($$result, "Stack", $$Stack, { "space": "space-7", "class": "content-container", "data-astro-cid-psp4n7jq": true }, { "default": ($$result2) => renderTemplate` <div class="img-container" data-astro-cid-psp4n7jq> <!-- <Image src={thumbnail} alt="" width={480} height={360} /> --> <img${addAttribute(thumbnail, "src")} alt="" width="480" height="360" data-astro-cid-psp4n7jq> </div> ${renderComponent($$result2, "Heading", $$Heading, { "tagName": "h4", "size": "h6", "class": "title color-secondary text-left", "data-astro-cid-psp4n7jq": true }, { "default": ($$result3) => renderTemplate`${title}` })} ` })} <div class="arrow-right-container" data-astro-cid-psp4n7jq> ${renderComponent($$result, "Text", $$Text, { "tagName": "span", "size": "small", "class": "arrow-right-text", "data-astro-cid-psp4n7jq": true }, { "default": ($$result2) => renderTemplate`Дивитись` })} ${renderComponent($$result, "Icon", $$Icon, { "name": "icon-arrow-right", "aria-hidden": "true", "focusable": "false", "class": "color-primary arrow-right", "data-astro-cid-psp4n7jq": true })} </div> </button> ${renderComponent($$result, "VideoDialog", $$VideoDialog, { "name": "youtube-video", "data-astro-cid-psp4n7jq": true }, { "default": ($$result2) => renderTemplate` <iframe width="480" height="360"${addAttribute(`https://www.youtube.com/embed/${videoId}`, "src")} loading="lazy" data-astro-cid-psp4n7jq></iframe> ` })} <!-- <VideoModal>
    <div class="video-container">
      <iframe
        width="480"
        height="360"
        src={\`https://www.youtube.com/embed/\${videoId}\`}
        loading="lazy"></iframe>
    </div>
  </VideoModal> --> </div>  `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/YoutubeVideo.astro", void 0);

const $$Youtube = createComponent(async ($$result, $$props, $$slots) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = "UCCh0j7kJcOeSmOi2vJDc6Tw";
  let youtubeVideos = [];
  try {
    const request = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=3`
    );
    if (!request.ok) {
      console.error("Youtube API request failed", {
        status: request.status,
        message: request.statusText
      });
      throw new Error("There was a problem with the server youtube api.");
    }
    const data = await request.json();
    youtubeVideos = data.items.map((item) => {
      return {
        thumbnail: item.snippet.thumbnails.high.url,
        title: parseTitle(item.snippet.title),
        videoId: item.id.videoId
      };
    });
  } catch (error) {
    console.error(error);
    console.error("Error fetching youtube videos");
  }
  return renderTemplate`${maybeRenderHead()}<section class="youtube" data-astro-cid-e3qqsibb> ${renderComponent($$result, "Center", $$Center, { "maxWidth": "87.5rem", "space": "space-6", "data-astro-cid-e3qqsibb": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Heading", $$Heading, { "tagName": "h3", "size": "h6", "class": "color-secondary", "data-astro-cid-e3qqsibb": true }, { "default": ($$result3) => renderTemplate`Відеоархів` })} ${renderComponent($$result2, "AutoGrid", $$AutoGrid, { "class": "youtube-list", "role": "list", "minItemWidth": "265px", "data-astro-cid-e3qqsibb": true }, { "default": ($$result3) => renderTemplate`${youtubeVideos.length === 0 ? renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "data-astro-cid-e3qqsibb": true })}` : youtubeVideos.map((video) => {
    return renderTemplate`<div role="listitem" data-astro-cid-e3qqsibb> ${renderComponent($$result3, "YoutubeVideo", $$YoutubeVideo, { "video": video, "data-astro-cid-e3qqsibb": true })} </div>`;
  })}` })} ` })} </section> `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/Youtube.astro", void 0);

const $$Astro$1 = createAstro("https://ecomisto-test.netlify.app");
const $$MyIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MyIcon;
  const { name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg> <use${addAttribute(`./sprite.svg#${name}`, "href")}></use> </svg>`;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/ui/MyIcon.astro", void 0);

const gizLogo = new Proxy({"src":"/_astro/giz.nGzGdn_O.png","width":1200,"height":256,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/assets/images/giz.png";
							}
							
							return target[name];
						}
					});

const $$Donors = createComponent(($$result, $$props, $$slots) => {
  const donors = [
    {
      name: "donors-usaid-figma"
    },
    {
      name: "donors-ednannya"
    },
    {
      name: "donors-czech"
    },
    {
      name: "donors-eed"
    },
    {
      name: "donors-ua-cult-fond"
    },
    {
      name: "donors-evz"
    },
    {
      name: "donors-undp"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="donors" data-astro-cid-ocsizvzk> ${renderComponent($$result, "Center", $$Center, { "maxWidth": "125rem", "space": "space-4", "data-astro-cid-ocsizvzk": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Stack", $$Stack, { "space": "space-9", "data-astro-cid-ocsizvzk": true }, { "default": ($$result3) => renderTemplate` <div class="title" data-astro-cid-ocsizvzk> ${renderComponent($$result3, "Text", $$Text, { "tagName": "div", "size": "medium", "class": "font-medium", "isBadge": true, "variant": "neutral", "data-astro-cid-ocsizvzk": true }, { "default": ($$result4) => renderTemplate`Донори` })} </div> ${renderComponent($$result3, "Marquee", $$Marquee, { "direction": "left", "space": "space-4", "duration": "slow", "data-astro-cid-ocsizvzk": true }, { "default": ($$result4) => renderTemplate` <div class="donor-logos marquee-inner" data-astro-cid-ocsizvzk> ${donors.map((donor) => {
    return renderTemplate`<div class="donor-logo" data-astro-cid-ocsizvzk> ${renderComponent($$result4, "MyIcon", $$MyIcon, { "name": donor.name, "data-astro-cid-ocsizvzk": true })}  </div>`;
  })} <div class="donor-logo" data-astro-cid-ocsizvzk> ${renderComponent($$result4, "MyPicture", $$MyPicture, { "src": gizLogo, "width": 300, "alt": "Chernigiv Monumentalism logo", "data-astro-cid-ocsizvzk": true })} </div> </div> ` })} ` })} ` })}  </section>`;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/Donors.astro", void 0);

const chernigivMonumentalism = new Proxy({"src":"/_astro/chernigiv-monumentalism.DwttDTud.png","width":1200,"height":256,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/assets/images/chernigiv-monumentalism.png";
							}
							
							return target[name];
						}
					});

const chernigivPatrolPolice = new Proxy({"src":"/_astro/chernigiv-patrol-police.ChpMLxg7.png","width":1200,"height":256,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/assets/images/chernigiv-patrol-police.png";
							}
							
							return target[name];
						}
					});

const $$Partners = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "partners", "data-astro-cid-pqooy3ar": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Center", $$Center, { "maxWidth": "87.5rem", "space": { default: "space-6", tablet: "space-7", laptop: "space-9" }, "data-astro-cid-pqooy3ar": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="inner" data-astro-cid-pqooy3ar> ${renderComponent($$result3, "EmptyShape", $$EmptyShape, { "class": "partners-shape", "top": "-1px", "left": "-1px", "data-astro-cid-pqooy3ar": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Shape", $$Shape, { "color": "white", "class": "top", "translateX": "100%", "rotate": "270deg", "data-astro-cid-pqooy3ar": true })} ${renderComponent($$result4, "Shape", $$Shape, { "color": "white", "class": "bottom", "translateY": "100%", "rotate": "270deg", "data-astro-cid-pqooy3ar": true })} ` })} ${renderComponent($$result3, "Stack", $$Stack, { "space": "space-10", "data-astro-cid-pqooy3ar": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Row", $$Row, { "data-astro-cid-pqooy3ar": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Stack", $$Stack, { "space": "space-6", "class": "col-12 col-start-1 tablet:col-7 tablet:col-start-5 laptop:col-6 laptop:col-start-6", "data-astro-cid-pqooy3ar": true }, { "default": ($$result6) => renderTemplate` ${renderComponent($$result6, "Text", $$Text, { "tagName": "div", "size": "large", "class": "font-medium", "isBadge": true, "variant": "accent", "data-astro-cid-pqooy3ar": true }, { "default": ($$result7) => renderTemplate`Партнери` })} ${renderComponent($$result6, "Stack", $$Stack, { "space": "space-5", "data-astro-cid-pqooy3ar": true }, { "default": ($$result7) => renderTemplate` ${renderComponent($$result7, "Stack", $$Stack, { "space": "space-4", "data-astro-cid-pqooy3ar": true }, { "default": ($$result8) => renderTemplate` ${renderComponent($$result8, "Heading", $$Heading, { "tagName": "h3", "size": "h5", "class": "color-primary font-heading", "data-astro-cid-pqooy3ar": true }, { "default": ($$result9) => renderTemplate`
Запрошуємо до співпраці
` })} ${renderComponent($$result8, "Text", $$Text, { "tagName": "p", "size": "large", "class": "color-accent", "data-astro-cid-pqooy3ar": true }, { "default": ($$result9) => renderTemplate`Ми пропонуємо спільно брати участь у соціальних змінах для
                  впровадження сталих підходів у розвитку міст. Свою місію
                  реалізуємо через урбаністичні інтервенції, освітні програми та
                  соціальне підприємництво. Долучайтесь до нас як волонтер або
                  партнер. Разом ми можемо творити зміни!
` })} ` })} ${renderComponent($$result7, "Button", $$Button, { "style": "primary", "data-open-partnership": true, "aria-label": "Open cooperation form modal", "data-astro-cid-pqooy3ar": true }, { "default": ($$result8) => renderTemplate`Написати
` })} ` })} ` })} ` })} ${renderComponent($$result4, "Stack", $$Stack, { "space": "space-8", "data-astro-cid-pqooy3ar": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Marquee", $$Marquee, { "direction": "left", "space": "space-4", "duration": "slow", "data-astro-cid-pqooy3ar": true }, { "default": ($$result6) => renderTemplate` <div class="partner-logos marquee-inner" data-astro-cid-pqooy3ar> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-sendpulse", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-ahalar", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-dmch", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-tolocar", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-u-cycle", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-agenciya", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-chernigiv-it", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyPicture", $$MyPicture, { "src": chernigivMonumentalism, "width": 300, "alt": "Chernigiv Monumentalism logo", "data-astro-cid-pqooy3ar": true })} </div> </div> ` })} ${renderComponent($$result5, "Marquee", $$Marquee, { "direction": "right", "space": "space-4", "duration": "slow", "data-astro-cid-pqooy3ar": true }, { "default": ($$result6) => renderTemplate` <div class="partner-logos marquee-inner" data-astro-cid-pqooy3ar> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-mart", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-ostriv", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-politehnika", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-uma", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-zelenew", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-ecovisio", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyIcon", $$MyIcon, { "name": "partners-plato", "data-astro-cid-pqooy3ar": true })} </div> <div class="partner-logo" data-astro-cid-pqooy3ar> ${renderComponent($$result6, "MyPicture", $$MyPicture, { "src": chernigivPatrolPolice, "width": 300, "alt": "Chernigiv Patrol Police logo", "data-astro-cid-pqooy3ar": true })} </div> </div> ` })} ` })} ` })} </div> ` })} ` })} `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/Partners.astro", void 0);

const $$ArchiveProjects = createComponent(async ($$result, $$props, $$slots) => {
  const projects = (await getCollection("projects", ({ data }) => !data.isDraft)).filter(({ data }) => !data.isActive);
  const sortedProjects = getSortedProjects(projects);
  return renderTemplate`${renderComponent($$result, "Stack", $$Stack, { "space": "space-10" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Heading", $$Heading, { "tagName": "h3", "size": "h6", "class": "color-secondary" }, { "default": ($$result3) => renderTemplate`Реалізовані проєкти` })} ${renderComponent($$result2, "Stack", $$Stack, { "space": "space-7" }, { "default": ($$result3) => renderTemplate`${sortedProjects.slice(0, 3).map((project) => {
    return renderTemplate`${renderComponent($$result3, "ArchiveProjectCard", $$ArchiveProjectCard, { "project": project })}`;
  })}` })} ` })}`;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/ArchiveProjects.astro", void 0);

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "projects", "data-astro-cid-qz6brpfc": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Center", $$Center, { "maxWidth": "87.5rem", "space": { default: "space-6", tablet: "space-7", laptop: "space-9" }, "data-astro-cid-qz6brpfc": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Stack", $$Stack, { "space": "space-10", "data-astro-cid-qz6brpfc": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Stack", $$Stack, { "space": { default: "space-12", tablet: "space-14", laptop: "space-16" }, "data-astro-cid-qz6brpfc": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "ActiveProjects", $$ActiveProjects, { "data-astro-cid-qz6brpfc": true })} ${renderComponent($$result5, "ArchiveProjects", $$ArchiveProjects, { "data-astro-cid-qz6brpfc": true })} ` })} ${renderComponent($$result4, "ButtonArrow", $$ButtonArrow, { "tagName": "a", "style": "secondary", "href": "/projects", "class": "all-projects", "data-astro-cid-qz6brpfc": true }, { "default": ($$result5) => renderTemplate`Усі проєкти
` })} ` })} ` })} ` })} `;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/components/home/Projects.astro", void 0);

const $$Astro = createAstro("https://ecomisto-test.netlify.app");
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  Astro2.response.headers.set(
    "Cache-Control",
    "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800"
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Donors", $$Donors, {})} ${renderComponent($$result2, "Mission", $$Mission, {})} ${renderComponent($$result2, "Projects", $$Projects, {})} ${renderComponent($$result2, "Partners", $$Partners, {})} ${renderComponent($$result2, "Team", $$Team, {})} ${renderComponent($$result2, "Youtube", $$Youtube, {})} ` })}`;
}, "/Volumes/Media HD/Web Development/eco-misto-website-test/src/pages/index.astro", void 0);

const $$file = "/Volumes/Media HD/Web Development/eco-misto-website-test/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, prerender, $$url as url };
